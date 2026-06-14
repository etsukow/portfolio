'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

/**
 * The travelling TARDIS — the real `tardis_exterior_2005.glb` model, driven
 * along the same six scroll-based waypoints as the design prototype
 * (hero → about → work → demo → music → contact) with idle bob, yaw wobble
 * and a pulsing roof lamp.
 */
export default function Tardis() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;

    // scroll is driven by the inner #scrollRoot container (falls back to window)
    const scrollEl = document.getElementById('scrollRoot');
    const getY = () => (scrollEl ? scrollEl.scrollTop : (window.scrollY || window.pageYOffset || 0));

    let renderer, scene, camera, group, model, lampLight, lampSprite, raf;
    let idleT = 0;
    let base = { x: 2.6, y: 0, z: 0, ry: 0.5, s: 1 };
    let tFactor = { x: 1, s: 1 };
    let modelTopY = 1.5;
    let disposed = false;

    // Fixed-duration glide between section waypoints (instead of scroll-linked):
    // scrolling to a section retargets the TARDIS, which then eases there over
    // TWEEN_DUR seconds. The idle bob/rotation/lamp keep running on top.
    const SECTION_IDS = ['top', 'about', 'work', 'demo', 'music', 'contact'];
    const TWEEN_DUR = 0.8;
    let targetIdx = 0, tweenFrom = { ...base }, tweenStart = 0, tweening = false;

    // "materialise" intro (TARDIS fades/flickers in on load) + a11y
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let introT = 0, introActive = false, introMats = [];

    // readability scrim: a soft dark+blur halo that tracks the TARDIS's
    // on-screen position so text passing over it stays legible
    const projC = new THREE.Vector3();
    const projT = new THREE.Vector3();
    const rootStyle = document.documentElement.style;
    function updateScrim() {
      if (!camera || !group) return;
      group.getWorldPosition(projC);
      projT.copy(projC);
      projT.y += modelTopY * (base.s * tFactor.s);
      projT.project(camera);
      projC.project(camera);
      const W = window.innerWidth, H = window.innerHeight;
      const cx = (projC.x * 0.5 + 0.5) * W;
      const cy = (-projC.y * 0.5 + 0.5) * H;
      const halfPx = Math.abs(projT.y - projC.y) * 0.5 * H;
      const r = halfPx * 1.9 + 90;
      // circle is sized 2r and translated so its centre lands on (cx, cy)
      rootStyle.setProperty('--td', (r * 2).toFixed(1) + 'px');
      rootStyle.setProperty('--sx', (cx - r).toFixed(1) + 'px');
      rootStyle.setProperty('--sy', (cy - r).toFixed(1) + 'px');
    }

    const waypoints = [
      { x: 2.7, y: -0.1, z: 0.0, ry: 0.5, s: 1.0 },   // hero
      { x: -3.6, y: 0.3, z: -1.2, ry: -0.7, s: 0.86 }, // about
      { x: 3.4, y: 0.5, z: -2.6, ry: 1.5, s: 0.7 },    // work
      { x: -3.4, y: -0.2, z: -0.4, ry: -0.4, s: 0.94 },// demo
      { x: 3.1, y: 0.4, z: -1.2, ry: 1.0, s: 0.86 },   // music
      { x: 0.0, y: 0.15, z: 1.4, ry: 0.0, s: 1.2 },    // contact
    ];

    function radialTexture(size, stops) {
      const c = document.createElement('canvas');
      c.width = c.height = size;
      const x = c.getContext('2d');
      const rg = x.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      stops.forEach(([o, col]) => rg.addColorStop(o, col));
      x.fillStyle = rg;
      x.fillRect(0, 0, size, size);
      return new THREE.CanvasTexture(c);
    }

    function buildLights() {
      scene.add(new THREE.AmbientLight(0x6b7bc0, 1.05));
      const dir = new THREE.DirectionalLight(0xe6eeff, 1.7); dir.position.set(3, 5, 7); scene.add(dir);
      const rim = new THREE.DirectionalLight(0x8aa0ff, 0.7); rim.position.set(-5, 1, -3); scene.add(rim);
      const fill = new THREE.DirectionalLight(0xbcd0ff, 0.6); fill.position.set(0, -3, 5); scene.add(fill);
    }

    function placeModel(gltf) {
      model = gltf.scene;
      const box = new THREE.Box3().setFromObject(model);
      const size = new THREE.Vector3(); box.getSize(size);
      const centre = new THREE.Vector3(); box.getCenter(centre);
      const scale = size.y > 0 ? 3.0 / size.y : 1;
      model.scale.setScalar(scale);
      model.position.set(-centre.x * scale, -centre.y * scale, -centre.z * scale);
      modelTopY = (size.y * scale) / 2;
      group.add(model);

      // collect materials and start the materialise flicker (skipped if the
      // visitor prefers reduced motion)
      if (!reduceMotion) {
        model.traverse((o) => {
          if (o.isMesh && o.material) {
            const mats = Array.isArray(o.material) ? o.material : [o.material];
            mats.forEach((m) => { m.transparent = true; m.opacity = 0; introMats.push(m); });
          }
        });
        introT = 0;
        introActive = introMats.length > 0;
      }

      lampSprite = new THREE.Sprite(new THREE.SpriteMaterial({
        map: radialTexture(64, [
          [0, 'rgba(220,238,255,0.95)'],
          [0.4, 'rgba(160,193,255,0.6)'],
          [1, 'rgba(160,193,255,0)'],
        ]),
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      }));
      lampSprite.scale.set(0.9, 0.9, 1);
      lampSprite.position.set(0, modelTopY + 0.12, 0);
      group.add(lampSprite);

      lampLight = new THREE.PointLight(0x9fc1ff, 1.4, 9, 2);
      lampLight.position.set(0, modelTopY + 0.2, 0);
      group.add(lampLight);
    }

    function applyPose() {
      if (!group) return;
      const t = idleT, f = tFactor;
      const amp = reduceMotion ? 0 : 1; // pause idle drift for reduced-motion
      group.position.set(base.x * f.x, base.y + Math.sin(t * 0.9) * 0.08 * amp, base.z);
      group.rotation.set(
        Math.sin(t * 0.45) * 0.05 * amp,
        base.ry + Math.sin(t * 0.3) * 0.18 * amp,
        Math.sin(t * 0.6) * 0.03 * amp
      );
      const s = base.s * f.s;
      group.scale.set(s, s, s);
    }

    // which section is currently in view → which waypoint to glide to
    function update(y) {
      if (!group) return;
      let idx = 0;
      for (let i = 0; i < SECTION_IDS.length; i++) {
        const el = document.getElementById(SECTION_IDS[i]);
        if (el && el.offsetTop <= y + 4) idx = i;
      }
      if (idx !== targetIdx) {
        tweenFrom = { ...base };
        targetIdx = idx;
        tweenStart = idleT;
        tweening = true;
      }
    }

    function resize() {
      if (!renderer) return;
      const w = window.innerWidth, h = window.innerHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      tFactor = w < 820 ? { x: 0.42, s: 0.62 } : { x: 1, s: 1 };
    }

    // ---- init ----
    const w = window.innerWidth, h = window.innerHeight;
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100);
    camera.position.set(0, 0, 9);
    renderer = new THREE.WebGLRenderer({ canvas: cv, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h, false);
    if ('outputEncoding' in renderer) renderer.outputEncoding = THREE.sRGBEncoding;

    buildLights();
    group = new THREE.Group();
    scene.add(group);

    const halo = new THREE.Sprite(new THREE.SpriteMaterial({
      map: radialTexture(128, [
        [0, 'rgba(150,185,255,0.55)'],
        [0.5, 'rgba(110,150,255,0.18)'],
        [1, 'rgba(110,150,255,0)'],
      ]),
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    }));
    halo.scale.set(6, 6, 1);
    halo.position.set(0, 0.2, -1.2);
    group.add(halo);

    const loader = new GLTFLoader();
    loader.load(
      '/tardis_exterior_2005.glb',
      (gltf) => { if (!disposed) { placeModel(gltf); update(getY()); } },
      undefined,
      (err) => console.warn('[tardis] GLB failed to load:', err)
    );

    resize();
    applyPose();

    const loop = () => {
      if (disposed || !renderer) return;
      idleT += 0.016;

      // ease `base` toward the active section's waypoint over a fixed duration
      const tgt = waypoints[targetIdx];
      if (tweening) {
        let p = (idleT - tweenStart) / TWEEN_DUR;
        if (p >= 1) { p = 1; tweening = false; }
        const e = p * p * (3 - 2 * p); // smoothstep
        base = {
          x: tweenFrom.x + (tgt.x - tweenFrom.x) * e,
          y: tweenFrom.y + (tgt.y - tweenFrom.y) * e,
          z: tweenFrom.z + (tgt.z - tweenFrom.z) * e,
          ry: tweenFrom.ry + (tgt.ry - tweenFrom.ry) * e,
          s: tweenFrom.s + (tgt.s - tweenFrom.s) * e,
        };
      } else {
        base = tgt;
      }
      applyPose();

      // materialise: opacity ramps 0→1 with a Doctor-Who-ish flicker
      if (introActive) {
        introT = Math.min(1, introT + 0.016 / 0.9);
        const flick = introT < 1 ? introT * (0.55 + 0.45 * Math.abs(Math.sin(introT * 22))) : 1;
        introMats.forEach((m) => { m.opacity = flick; });
        if (introT >= 1) {
          introActive = false;
          introMats.forEach((m) => { m.opacity = 1; m.transparent = false; m.needsUpdate = true; });
        }
      }

      const p = 0.6 + Math.abs(Math.sin(idleT * 1.6)) * 0.7;
      if (lampLight) lampLight.intensity = 0.7 + p * 1.1;
      if (lampSprite) lampSprite.material.opacity = 0.45 + p * 0.45;
      updateScrim();
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    loop();

    const onScroll = () => update(getY());
    const onResize = () => { resize(); update(getY()); };
    (scrollEl || window).addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    update(getY());

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      (scrollEl || window).removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (renderer) { renderer.dispose(); renderer = null; }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="tardisCanvas"
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
