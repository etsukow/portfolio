'use client';

import { useEffect } from 'react';

/**
 * Fixed deep-space backdrop: nebula drift, three parallax star layers and a
 * distant planet. Also wires the section-scroll niceties:
 *  - responsive grids + nav (mobile)
 *  - scroll parallax for the star layers / planet
 *  - a wheel redirect so a vertical wheel pans the WORK card rail horizontally
 *    before the page snaps on to the next section.
 */
export default function SpaceBackground() {
  useEffect(() => {
    const q = (s) => document.querySelector(s);

    // ---- build star fields ----
    const fill = (id, count, size, color) => {
      const el = document.getElementById(id);
      if (!el) return;
      const pts = [];
      for (let i = 0; i < count; i++) {
        const x = (Math.random() * 100).toFixed(2);
        const y = (Math.random() * 140).toFixed(2);
        pts.push(`${x}vw ${y}vh ${color}`);
      }
      el.style.cssText +=
        `;width:${size}px;height:${size}px;border-radius:50%;background:${color};box-shadow:${pts.join(',')};top:0;left:0;`;
    };
    fill('stars1', 90, 2, 'rgba(205,214,244,.95)');
    fill('stars2', 70, 1.6, 'rgba(180,190,254,.8)');
    fill('stars3', 110, 1, 'rgba(166,173,200,.6)');
    const s1el = document.getElementById('stars1');
    if (s1el) s1el.style.animation = 'twinkle 4s ease-in-out infinite';

    console.log(
      '%c↳ Bigger on the inside. You found the console — Allons-y! 🔵',
      'color:#89b4fa;font-family:monospace;'
    );

    // ---- responsive grids + nav ----
    let mobile = false;
    function layout() {
      mobile = window.matchMedia('(max-width:820px)').matches;
      const nd = q('.nav-desktop'), nb = q('.nav-burger');
      if (nd) nd.style.display = mobile ? 'none' : 'flex';
      if (nb) nb.style.display = mobile ? 'flex' : 'none';
      const cols = { 'about-grid': '1.4fr 1fr', 'demo-grid': '0.9fr 1.1fr', 'music-grid': '1fr 1.15fr' };
      Object.keys(cols).forEach((cls) => {
        const g = q('.' + cls);
        if (g) g.style.gridTemplateColumns = mobile ? '1fr' : cols[cls];
      });
      const wh = q('.work-hint');
      if (wh) wh.style.display = mobile ? 'none' : 'block';
    }

    // ---- star / planet parallax ----
    let s1, s2, s3, pl;
    function onScroll() {
      const y = window.scrollY || window.pageYOffset;
      s1 = s1 || q('#stars1'); s2 = s2 || q('#stars2'); s3 = s3 || q('#stars3'); pl = pl || q('#planet');
      if (s1) s1.style.transform = `translate3d(0,${y * 0.12}px,0)`;
      if (s2) s2.style.transform = `translate3d(0,${y * 0.06}px,0)`;
      if (s3) s3.style.transform = `translate3d(0,${y * 0.18}px,0)`;
      if (pl) pl.style.transform = `translate3d(${y * -0.04}px,${y * -0.05}px,0)`;
    }

    // ---- WORK rail: redirect vertical wheel to horizontal pan while the work
    //      section is the active (snapped) screen ----
    let workEl, trackEl;
    function onWheel(e) {
      workEl = workEl || q('#work');
      trackEl = trackEl || q('#workTrack');
      if (!workEl || !trackEl || mobile) return;
      const r = workEl.getBoundingClientRect();
      const active = r.top <= 2 && r.bottom >= window.innerHeight - 2;
      if (!active) return;
      // normalise wheel delta to pixels (some mice report lines/pages)
      let dy = e.deltaY;
      if (e.deltaMode === 1) dy *= 16;
      else if (e.deltaMode === 2) dy *= window.innerHeight;
      if (Math.abs(e.deltaX) > Math.abs(dy)) return; // genuine horizontal gesture
      const maxLeft = trackEl.scrollWidth - trackEl.clientWidth;
      const atStart = trackEl.scrollLeft <= 0;
      const atEnd = trackEl.scrollLeft >= maxLeft - 1;
      if ((dy > 0 && !atEnd) || (dy < 0 && !atStart)) {
        trackEl.scrollLeft += dy; // free, 1:1 pan (no snap fighting it)
        e.preventDefault(); // hold the page on this screen until the rail ends
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', layout);
    window.addEventListener('wheel', onWheel, { passive: false });
    layout();
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', layout);
      window.removeEventListener('wheel', onWheel);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none',
        background:
          'radial-gradient(120% 90% at 78% 8%, #1b2348 0%, #161a33 28%, #11111b 62%, #0b0b13 100%)',
      }}
    >
      <div
        style={{
          position: 'absolute', inset: '-10%',
          background:
            'radial-gradient(40% 35% at 22% 78%, rgba(203,166,247,.16), transparent 70%),radial-gradient(46% 40% at 82% 30%, rgba(116,199,236,.14), transparent 72%)',
          animation: 'drift 38s ease-in-out infinite alternate',
        }}
      />
      <div id="stars1" style={{ position: 'absolute', inset: 0 }} />
      <div id="stars2" style={{ position: 'absolute', inset: 0 }} />
      <div id="stars3" style={{ position: 'absolute', inset: 0 }} />
      <div
        id="planet"
        style={{
          position: 'absolute', right: '-160px', top: '36%', width: '520px', height: '520px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 32% 30%, #2a3566 0%, #1a1f3d 45%, #0e1124 78%)',
          boxShadow: 'inset -40px -30px 90px rgba(0,0,0,.6), 0 0 120px rgba(116,199,236,.08)',
          opacity: 0.6,
        }}
      />
    </div>
  );
}
