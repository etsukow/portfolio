'use client';

import { useEffect, useRef, useState } from 'react';
import LiveSiteDemo from './LiveSiteDemo';

const mono = "'JetBrains Mono',monospace";
const serif = "'Instrument Serif',serif";
const CARD_W = 'min(520px, 84vw)';
const CARD_H = 'min(470px, 72vh)';
const EASE = 'transform .55s cubic-bezier(.4,0,.2,1)';

const projects = [
  {
    kind: 'flagship',
    tag: '★ FLAGSHIP · /001', tagColor: '#89b4fa', stack: 'C · Python · Rust · Svelte',
    media: 'repeating-linear-gradient(45deg,#1b2447,#1b2447 12px,#161d3a 12px,#161d3a 24px)',
    border: '#2a3566', label: '// 3DS  ─UDP→  server  ─WS→  Discord', discordDot: true,
    title: 'Luma3DS · Discord Rich Presence',
    repo: 'https://github.com/etsukow/Luma3DS-Plugin-DiscordRPC',
  },
  {
    kind: 'repo',
    tag: '/002', tagColor: '#94e2d5', stack: 'Go',
    media: 'repeating-linear-gradient(45deg,#152e2b,#152e2b 12px,#10231f 12px,#10231f 24px)',
    border: '#1f4a44', label: '// go build ./...',
    title: 'sae_go',
    desc: 'A systems & tooling exercise in Go — leaning into concurrency, clean interfaces and the standard library to keep things small and fast.',
    repo: 'https://github.com/etsukow/sae_go', hov: 'hov-bd-teal',
  },
  {
    kind: 'live',
    tag: '/003', tagColor: '#f38ba8', stack: 'Next.js · Three.js · Docker',
    media: 'repeating-linear-gradient(45deg,#321722,#321722 12px,#28121b 12px,#28121b 24px)',
    border: '#5e2436', label: '// build → docker → ci/cd → ship',
    title: 'Portfolios in production',
    desc: 'Next.js + Three.js sites with scroll-driven 3D — dockerised and shipped through CI/CD. Including this very portfolio, and one built for a friend — live below.',
    repo: 'https://github.com/etsukow?tab=repositories', liveUrl: 'https://farah.etsukow.com',
  },
];
const N = projects.length;

export default function WorkCarousel() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const centersRef = useRef([]);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current, track = trackRef.current;
    if (!section || !track) return;

    // scroll comes from the inner #scrollRoot (falls back to window)
    const scrollEl = document.getElementById('scrollRoot');
    const getY = () => (scrollEl ? scrollEl.scrollTop : (window.scrollY || window.pageYOffset || 0));

    function applyActive(idx) {
      const centers = centersRef.current;
      if (centers.length) {
        track.style.transform = `translate3d(${(window.innerWidth / 2 - centers[idx]).toFixed(1)}px,0,0)`;
      }
      cardRefs.current.forEach((c, i) => {
        if (!c) return;
        const d = Math.min(1, Math.abs(i - idx));
        c.style.transform = `scale(${(1 - d * 0.1).toFixed(3)})`;
        c.style.opacity = (1 - d * 0.5).toFixed(3);
      });
    }

    function layout() {
      centersRef.current = cardRefs.current.map((c) => (c ? c.offsetLeft + c.offsetWidth / 2 : 0));
      applyActive(activeRef.current);
    }

    function onScroll() {
      const vh = window.innerHeight;
      let idx = Math.round((getY() - section.offsetTop) / vh);
      idx = Math.max(0, Math.min(N - 1, idx));
      if (idx !== activeRef.current) {
        activeRef.current = idx;
        setActive(idx);
        applyActive(idx);
      }
    }

    (scrollEl || window).addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', layout);
    const t1 = setTimeout(layout, 60);
    const t2 = setTimeout(layout, 400);
    layout();
    onScroll();
    return () => {
      (scrollEl || window).removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', layout);
      clearTimeout(t1); clearTimeout(t2);
    };
  }, []);

  const goTo = (i) => {
    const section = sectionRef.current;
    if (!section) return;
    const idx = Math.max(0, Math.min(N - 1, i));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scrollEl = document.getElementById('scrollRoot');
    (scrollEl || window).scrollTo({ top: section.offsetTop + idx * window.innerHeight, behavior: reduce ? 'auto' : 'smooth' });
  };

  const arrowStyle = (disabled) => ({
    width: 40, height: 40, borderRadius: 999, cursor: disabled ? 'default' : 'pointer',
    background: 'rgba(30,30,46,.6)', border: '1px solid #45475a', color: '#cdd6f4',
    fontSize: 16, lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
    opacity: disabled ? 0.35 : 1, transition: 'all .2s ease',
  });

  return (
    <section id="work" data-screen-label="Projects" ref={sectionRef} style={{ position: 'relative' }}>
      {/* pinned carousel UI */}
      <div className="cv-unit" style={{ position: 'sticky', top: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 clamp(20px,6vw,90px) 26px', gap: 20 }}>
          <div>
            <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: '.24em', color: '#74c7ec', textTransform: 'uppercase', marginBottom: 10 }}>02 — selected work</div>
            <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(28px,4vw,50px)', margin: 0, color: '#cdd6f4', lineHeight: 1 }}>Three coordinates.</h2>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Previous project" className="hov-bd-blue" style={arrowStyle(active === 0)}>←</button>
            <button onClick={() => goTo(active + 1)} disabled={active === N - 1} aria-label="Next project" className="hov-bd-blue" style={arrowStyle(active === N - 1)}>→</button>
          </div>
        </div>

        <div ref={trackRef} style={{ display: 'flex', gap: 'clamp(20px,2.4vw,34px)', alignItems: 'center', willChange: 'transform', transition: EASE }}>
          {projects.map((p, i) => (
            <article
              key={p.title}
              ref={(el) => { cardRefs.current[i] = el; }}
              style={{
                flex: '0 0 ' + CARD_W, height: CARD_H, transformOrigin: 'center center',
                transition: EASE + ', opacity .55s ease',
                border: '1px solid #313244', borderRadius: 20,
                background: 'linear-gradient(165deg,rgba(30,30,46,.92),rgba(24,24,37,.92))',
                backdropFilter: 'blur(6px)', padding: 28, display: 'flex', flexDirection: 'column',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                <span style={{ fontFamily: mono, fontSize: 12, color: p.tagColor, letterSpacing: '.12em' }}>{p.tag}</span>
                <span style={{ fontFamily: mono, fontSize: 11, color: '#6c7086' }}>{p.stack}</span>
              </div>
              <div style={{ borderRadius: 14, height: 150, background: p.media, border: '1px solid ' + p.border, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                {p.discordDot && <span style={{ position: 'absolute', top: 12, left: 14, width: 9, height: 9, borderRadius: '50%', background: '#5865F2', boxShadow: '0 0 12px #5865F2' }} />}
                <span style={{ fontFamily: mono, fontSize: 11, color: '#7f849c' }}>{p.label}</span>
              </div>
              <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: 27, margin: '18px 0 8px', color: '#cdd6f4' }}>{p.title}</h3>

              {p.kind === 'flagship' ? (
                <>
                  <p style={{ fontSize: 14.5, lineHeight: 1.55, color: '#a6adc8', margin: '0 0 16px', flex: 1, overflow: 'hidden' }}>
                    Your 3DS, broadcasting. The game you&apos;re playing shows up as a live Discord status — automatically, in real time. Per-user token provisioning builds a personalised <code style={{ fontFamily: mono, fontSize: 13, color: '#94e2d5' }}>.3gx</code> plugin so each player&apos;s presence stays isolated.
                  </p>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <a href="#demo" className="hov-bg-cyan" style={{ flex: 1, textAlign: 'center', padding: 11, borderRadius: 10, background: '#89b4fa', color: '#11111b', fontWeight: 600, fontSize: 14 }}>▶ Live demo</a>
                    <a href={p.repo} target="_blank" rel="noopener" className="hov-bd-blue" style={{ flex: 1, textAlign: 'center', padding: 11, borderRadius: 10, border: '1px solid #45475a', color: '#cdd6f4', fontSize: 14 }}>GitHub ↗</a>
                  </div>
                </>
              ) : p.kind === 'live' ? (
                <>
                  <p style={{ fontSize: 14.5, lineHeight: 1.55, color: '#a6adc8', margin: '0 0 16px', flex: 1, overflow: 'hidden' }}>{p.desc}</p>
                  <LiveSiteDemo url={p.liveUrl} github={p.repo} />
                </>
              ) : (
                <>
                  <p style={{ fontSize: 14.5, lineHeight: 1.55, color: '#a6adc8', margin: '0 0 16px', flex: 1, overflow: 'hidden' }}>{p.desc}</p>
                  <a href={p.repo} target="_blank" rel="noopener" className={p.hov} style={{ textAlign: 'center', padding: 11, borderRadius: 10, border: '1px solid #45475a', color: '#cdd6f4', fontSize: 14 }}>GitHub ↗</a>
                </>
              )}
            </article>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', alignItems: 'center', marginTop: 26 }}>
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to project ${i + 1}`}
              style={{ width: i === active ? 24 : 8, height: 8, borderRadius: 999, border: 'none', padding: 0, cursor: 'pointer', background: i === active ? '#89b4fa' : '#45475a', transition: 'all .3s ease' }}
            />
          ))}
        </div>
      </div>

      {/* per-card snap points (one visible-viewport-height of scroll per card) */}
      {Array.from({ length: N - 1 }).map((_, k) => (
        <div key={k} aria-hidden="true" className="work-snap cv-unit" />
      ))}
    </section>
  );
}
