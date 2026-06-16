'use client';

import { useEffect, useRef, useState } from 'react';

const mono = 'var(--font-mono), monospace';

const gamesData = [
  { id: 'mk7', title: 'Mario Kart 7', detail: 'Rainbow Road · 1st place', c1: '#f38ba8', c2: '#eba0ac' },
  { id: 'acnl', title: 'Animal Crossing: NL', detail: 'Mayor duties · 15:00', c1: '#a6e3a1', c2: '#94e2d5' },
  { id: 'oot', title: 'Ocarina of Time 3D', detail: 'Water Temple (again)', c1: '#94e2d5', c2: '#74c7ec' },
  { id: 'pkmn', title: 'Pokémon X', detail: 'Lumiose City', c1: '#89b4fa', c2: '#b4befe' },
  { id: 'ssb', title: 'Smash Bros. for 3DS', detail: 'For Glory · 1v1', c1: '#fab387', c2: '#f9e2af' },
  { id: 'fe', title: 'Fire Emblem Awakening', detail: 'Chapter 12 · classic mode', c1: '#cba6f7', c2: '#f5c2e7' },
];
const nodeDefs = [
  { label: '3DS plugin', sub: 'sends UDP packet · title ID', tag: 'C' },
  { label: 'Bridge server', sub: 'routes by user token', tag: 'Python' },
  { label: 'Desktop app', sub: 'WebSocket · daemon', tag: 'Rust' },
  { label: 'Discord', sub: 'Rich Presence updated', tag: 'RPC' },
];
const accents = ['#89b4fa', '#a6e3a1', '#fab387', '#5865F2'];

const art = (g) => `linear-gradient(135deg,${g.c1},${g.c2})`;

export default function Demo() {
  const [current, setCurrent] = useState(gamesData[0]);
  const [activeNode, setActiveNode] = useState(4);
  const timers = useRef([]);
  const pending = useRef(null);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function selectGame(g) {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    pending.current = g;
    setActiveNode(0);
    [1, 2, 3, 4].forEach((step, i) => {
      timers.current.push(
        setTimeout(() => {
          setActiveNode(step);
          if (step === 4) setCurrent(pending.current);
        }, 230 * (i + 1))
      );
    });
  }

  const status = activeNode < 4 ? 'syncing…' : 'just now';

  return (
    <section id="demo" data-screen-label="Live demo" style={{ padding: 'clamp(40px,7vh,90px) clamp(20px,6vw,90px)', maxWidth: 1180, margin: '0 auto' }}>
      <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: '.24em', color: '#74c7ec', textTransform: 'uppercase', marginBottom: 18 }}>03 — live demo</div>
      <h2 style={{ fontFamily: 'var(--font-serif), serif', fontWeight: 400, fontSize: 'clamp(32px,5vw,58px)', margin: '0 0 14px', color: '#cdd6f4', lineHeight: 1.05 }}>
        Pick a game. Watch Discord <span style={{ fontStyle: 'italic', color: '#89b4fa' }}>light up.</span>
      </h2>
      <p style={{ fontSize: 16, lineHeight: 1.65, color: '#a6adc8', maxWidth: 600, margin: '0 0 44px' }}>
        A live mock of the real pipeline. Tap a cartridge on the 3DS — the packet travels through the bridge server and surfaces as a Discord Rich Presence on the other side. No actual 3DS required.
      </p>

      <div className="demo-grid" style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 'clamp(28px,4vw,56px)', alignItems: 'center' }}>
        {/* 3DS — real device render from the original portfolio, screens are live */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <div style={{ position: 'relative', width: 'min(400px,88vw)' }}>
            <picture>
              <source srcSet="/3ds-open.webp" type="image/webp" />
              <img
                src="/3ds-open.png"
                alt="New Nintendo 3DS"
                width={1100}
                height={1160}
                loading="lazy"
                decoding="async"
                draggable={false}
                style={{ display: 'block', width: '100%', height: 'auto', filter: 'drop-shadow(0 26px 46px rgba(0,0,0,.55))' }}
              />
            </picture>

            {/* TOP screen — now playing */}
            <div style={{ position: 'absolute', left: '20.1%', top: '11.8%', width: '59.7%', height: '34.7%', overflow: 'hidden', borderRadius: 5, background: '#0e1018', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'absolute', inset: 0, opacity: 0.55, background: art(current) }} />
              <div style={{ position: 'relative', textAlign: 'center', padding: '0 10%' }}>
                <div style={{ fontFamily: mono, fontSize: 8.5, letterSpacing: '.2em', color: '#cfe0ff', marginBottom: 6, opacity: 0.85 }}>NOW PLAYING</div>
                <div style={{ fontFamily: 'var(--font-serif), serif', fontSize: 19, color: '#fff', lineHeight: 1.1, textShadow: '0 2px 10px rgba(0,0,0,.75)' }}>{current.title}</div>
              </div>
            </div>

            {/* BOTTOM touch screen — cartridge menu */}
            <div style={{ position: 'absolute', left: '27.8%', top: '57.1%', width: '44.3%', height: '31.6%', overflow: 'hidden', borderRadius: 4, background: '#0e1018', padding: 5, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridAutoRows: '1fr', gap: 4 }}>
              {gamesData.map((g) => {
                const active = g.id === current.id;
                return (
                  <button
                    key={g.id}
                    onClick={() => selectGame(g)}
                    title={g.title}
                    style={{
                      cursor: 'pointer', padding: 3, borderRadius: 4,
                      background: active ? 'rgba(137,180,250,.22)' : '#181a26',
                      border: '1px solid ' + (active ? '#89b4fa' : '#2a2c3a'),
                      boxShadow: active ? '0 0 8px rgba(137,180,250,.55)' : 'none',
                      transition: 'all .18s ease', outline: 'none',
                      display: 'flex', flexDirection: 'column', overflow: 'hidden',
                    }}
                  >
                    <span style={{ flex: 1, minHeight: 14, borderRadius: 2, background: art(g), display: 'block' }} />
                    <span style={{ fontSize: 6.5, lineHeight: 1.05, color: '#cdd6f4', marginTop: 2, fontWeight: 500, textAlign: 'left', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{g.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <span style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: '.16em', color: '#6c7086', textTransform: 'uppercase' }}>↑ tap a cartridge on the touch screen</span>
        </div>

        {/* pipeline + discord */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {nodeDefs.map((n, i) => {
              const lit = i < activeNode;
              const col = accents[i];
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 16px', borderRadius: 12, background: lit ? 'rgba(137,180,250,.07)' : 'rgba(30,30,46,.5)', border: '1px solid ' + (lit ? col : '#313244'), transition: 'all .25s ease' }}>
                  <span style={{ width: 12, height: 12, borderRadius: '50%', flex: '0 0 auto', background: lit ? col : '#45475a', boxShadow: lit ? '0 0 12px ' + col : 'none', transition: 'all .25s ease' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#cdd6f4' }}>{n.label}</div>
                    <div style={{ fontFamily: mono, fontSize: 11, color: '#6c7086' }}>{n.sub}</div>
                  </div>
                  <span style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: '.08em', color: lit ? col : '#6c7086', padding: '4px 9px', borderRadius: 999, border: '1px solid ' + (lit ? col : '#313244'), transition: 'all .25s ease' }}>{n.tag}</span>
                </div>
              );
            })}
          </div>

          {/* discord card */}
          <div style={{ background: '#1e1f22', borderRadius: 14, padding: 18, boxShadow: '0 20px 40px rgba(0,0,0,.4)', border: '1px solid #313244' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#5865F2', boxShadow: '0 0 8px #5865F2' }} />
              <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.18em', color: '#949ba4', textTransform: 'uppercase' }}>Discord · Rich Presence</span>
            </div>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <div style={{ width: 62, height: 62, borderRadius: 10, flex: '0 0 auto', background: art(current), boxShadow: '0 4px 14px rgba(0,0,0,.4)', position: 'relative' }}>
                <span style={{ position: 'absolute', right: -5, bottom: -5, width: 22, height: 22, borderRadius: '50%', background: '#1e1f22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>🎮</span>
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', color: '#949ba4', textTransform: 'uppercase', marginBottom: 3 }}>Playing a game</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: '#fff', lineHeight: 1.2 }}>{current.title}</div>
                <div style={{ fontSize: 13, color: '#b5bac1' }}>{current.detail}</div>
                <div style={{ fontSize: 12, color: '#949ba4', marginTop: 2 }}>via Nintendo 3DS · {status}</div>
              </div>
            </div>
          </div>
          <a href="https://github.com/etsukow/Luma3DS-Plugin-DiscordRPC" target="_blank" rel="noopener" className="hov-col-cyan" style={{ alignSelf: 'flex-start', fontFamily: mono, fontSize: 12, color: '#89b4fa', letterSpacing: '.08em' }}>read the protocol &amp; source ↗</a>
        </div>
      </div>
    </section>
  );
}
