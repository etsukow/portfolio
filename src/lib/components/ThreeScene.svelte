<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		/** Lid open amount, 0 (closed) → 1 (fully open). Rotates the lid at its hinge. */
		open?: number;
		/** Reveal amount, 0 (hidden) → 1 (shown). Fades/lifts the canvas. */
		reveal?: number;
		/** Zoom-in amount, 0 (framed) → 1 (pushed in close, device overflows). */
		zoom?: number;
		modelUrl?: string;
		/** Emits the screens' + whole device's projected rects (fractions of canvas) each frame. */
		onScreens?: (r: { top: Rect; bottom: Rect; device: Rect }) => void;
	}

	interface Rect {
		x: number;
		y: number;
		w: number;
		h: number;
	}

	let { open = 0, reveal = 1, zoom = 0, modelUrl = '/models/3ds.glb', onScreens }: Props =
		$props();

	let host: HTMLDivElement;
	let loaded = $state(false);
	let failed = $state(false);

	// Targets read by the render loop (lerped for smoothness).
	let openTarget = 0;
	let zoomTarget = 0;

	$effect(() => {
		openTarget = Math.max(0, Math.min(1, open));
		zoomTarget = Math.max(0, Math.min(1, zoom));
	});

	$effect(() => {
		if (!host) return;
		const r = Math.max(0, Math.min(1, reveal));
		host.style.opacity = String(r);
		host.style.transform = `translateY(${(1 - r) * 32}px) scale(${0.92 + r * 0.08})`;
	});

	onMount(() => {
		let disposed = false;
		let cleanup: (() => void) | undefined;

		(async () => {
			try {
				const THREE = await import('three');
				const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
				const { RoomEnvironment } = await import(
					'three/examples/jsm/environments/RoomEnvironment.js'
				);
				if (disposed) return;

				const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

				const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
				renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
				renderer.toneMapping = THREE.ACESFilmicToneMapping;
				renderer.toneMappingExposure = 1.05;
				host.appendChild(renderer.domElement);
				renderer.domElement.style.width = '100%';
				renderer.domElement.style.height = '100%';

				const scene = new THREE.Scene();
				const pmrem = new THREE.PMREMGenerator(renderer);
				scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.035).texture;

				const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
				camera.position.set(0, 0.15, 5);

				// Theme-aware lighting.
				const key = new THREE.DirectionalLight(0xffffff, 2.4);
				key.position.set(2.5, 3.5, 4);
				const rim = new THREE.DirectionalLight(0xcba6f7, 1.6);
				rim.position.set(-3, 1.5, -2.5);
				const fill = new THREE.HemisphereLight(0x89b4fa, 0x1e1e2e, 0.7);
				scene.add(key, rim, fill);

				const model = new THREE.Group();
				scene.add(model);
				let baseY = 0;

				const loader = new GLTFLoader();
				const gltf = await loader.loadAsync(modelUrl);
				if (disposed) return;

				const root = gltf.scene;

				// Center + scale to a consistent on-screen size.
				const box = new THREE.Box3().setFromObject(root);
				const size = box.getSize(new THREE.Vector3());
				const center = box.getCenter(new THREE.Vector3());
				root.position.sub(center);
				const maxDim = Math.max(size.x, size.y, size.z) || 1;
				const scale = 2.6 / maxDim;
				root.scale.setScalar(scale);
				model.add(root);

				// The lid (top half) — its rest pose is open (rotated 90° at the hinge).
				// We drive it manually because the GLB's clip doesn't move it.
				const lid = root.getObjectByName('Top004');

				const topScreen = root.getObjectByName('Top_Screen002');
				const bottomScreen = root.getObjectByName('Bottom_Screen002');

				// Frame for the open, face-on pose (lid flat + tilted up to the camera) —
				// the largest on-screen silhouette — so nothing clips in any state.
				if (lid) lid.rotation.x = 0;
				model.rotation.x = Math.PI / 2;
				model.updateMatrixWorld(true);
				const fitRadius = new THREE.Box3()
					.setFromObject(model)
					.getBoundingSphere(new THREE.Sphere())
					.radius;
				model.rotation.x = 0;

				const LID_CLOSED = Math.PI; // 180° = clamshell shut
				const LID_OPEN = 0; // 0° = laid fully flat (horizontal, both screens coplanar)
				const OPEN_PITCH = Math.PI / 2; // tilt the flat device up to face the camera (screens toward viewer)
				const BASE_YAW = -0.4;
				let baseDist = 5;

				function fit() {
					const w = host.clientWidth || 1;
					const h = host.clientHeight || 1;
					renderer.setSize(w, h, false);
					camera.aspect = w / h;
					// Distance that fits the bounding sphere within the *tighter* of the
					// vertical / horizontal FOV, plus a small margin.
					const vFov = (camera.fov * Math.PI) / 180;
					const hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect);
					baseDist = (fitRadius * 1.06) / Math.sin(Math.min(vFov, hFov) / 2);
					camera.position.set(0, 0, baseDist);
					camera.lookAt(0, 0, 0);
					camera.updateProjectionMatrix();
				}
				fit();
				const ro = new ResizeObserver(fit);
				ro.observe(host);

				loaded = true;

				// Only render while visible / tab focused.
				let inView = true;
				const io = new IntersectionObserver(
					([e]) => {
						inView = e.isIntersecting;
						if (inView) start();
					},
					{ threshold: 0.01 }
				);
				io.observe(host);

				const _box = new THREE.Box3();
				const _v = new THREE.Vector3();
				function projectRect(obj: import('three').Object3D): Rect {
					_box.setFromObject(obj);
					let minX = Infinity,
						minY = Infinity,
						maxX = -Infinity,
						maxY = -Infinity;
					for (let i = 0; i < 8; i++) {
						_v.set(
							i & 1 ? _box.max.x : _box.min.x,
							i & 2 ? _box.max.y : _box.min.y,
							i & 4 ? _box.max.z : _box.min.z
						).project(camera);
						const sx = _v.x * 0.5 + 0.5;
						const sy = 1 - (_v.y * 0.5 + 0.5);
						minX = Math.min(minX, sx);
						maxX = Math.max(maxX, sx);
						minY = Math.min(minY, sy);
						maxY = Math.max(maxY, sy);
					}
					return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
				}

				const clock = new THREE.Clock();
				let curOpen = 0;
				let curZoom = 0;
				let swayT = 0;
				let raf = 0;

				function frame() {
					raf = requestAnimationFrame(frame);
					if (!inView || document.hidden) {
						cancelAnimationFrame(raf);
						raf = 0;
						return;
					}
					const dt = Math.min(clock.getDelta(), 0.05);
					const k = Math.min(1, dt * 7);
					curOpen += (openTarget - curOpen) * k;
					curZoom += (zoomTarget - curZoom) * k;
					swayT += dt;

					// lid: closed (180°, clamshell) → open (0°, flat/horizontal)
					if (lid) lid.rotation.x = LID_CLOSED + curOpen * (LID_OPEN - LID_CLOSED);

					// gentle sway when closed; settles to dead-front + tilts flat-on as it opens
					const sway = reduce ? 0 : Math.sin(swayT * 0.5) * 0.16;
					model.rotation.y = (BASE_YAW + sway) * (1 - curOpen);
					model.rotation.x = curOpen * OPEN_PITCH;

					// Re-center the *current* silhouette each frame so the device stays framed
					// in any pose (the lid/pitch animation otherwise shifts it off-centre).
					const bob = reduce ? 0 : Math.sin(swayT * 0.9) * 0.04 * (1 - curOpen);
					model.position.set(0, 0, 0);
					model.updateMatrixWorld(true);
					_box.setFromObject(model).getCenter(_v);
					model.position.set(-_v.x, baseY - _v.y + bob, -_v.z);

					// keep the push-in within the fit margin so it never clips the edges
					camera.position.z = baseDist * (1 - 0.05 * curZoom);

					renderer.render(scene, camera);

					if (onScreens && topScreen && bottomScreen)
						onScreens({
							top: projectRect(topScreen),
							bottom: projectRect(bottomScreen),
							device: projectRect(root)
						});
				}
				function start() {
					if (!raf) {
						clock.getDelta();
						frame();
					}
				}
				start();

				cleanup = () => {
					if (raf) cancelAnimationFrame(raf);
					ro.disconnect();
					io.disconnect();
					pmrem.dispose();
					renderer.dispose();
					scene.traverse((o) => {
						const m = o as import('three').Mesh;
						if (m.geometry) m.geometry.dispose();
						const mat = m.material as import('three').Material | import('three').Material[];
						if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
						else if (mat) mat.dispose();
					});
					renderer.domElement.remove();
				};
			} catch (err) {
				console.error('[ThreeScene] failed to load model', err);
				failed = true;
			}
		})();

		return () => {
			disposed = true;
			cleanup?.();
		};
	});
</script>

<div class="scene" bind:this={host} aria-hidden="true">
	{#if !loaded && !failed}
		<div class="placeholder"><span class="ring"></span></div>
	{/if}
	{#if failed}
		<div class="placeholder fail">3D model unavailable</div>
	{/if}
</div>

<style>
	.scene {
		position: relative;
		width: 100%;
		height: 100%;
		will-change: opacity, transform;
	}

	.placeholder {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		color: var(--faint);
		font-family: var(--font-mono);
		font-size: 0.85rem;
	}

	.ring {
		width: 38px;
		height: 38px;
		border-radius: 50%;
		border: 3px solid var(--surface-2);
		border-top-color: var(--accent);
		animation: spin 0.9s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.ring {
			animation: none;
		}
	}
</style>
