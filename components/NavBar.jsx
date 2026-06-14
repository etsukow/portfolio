'use client';

import { useState } from 'react';

const mono = "'JetBrains Mono',monospace";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px clamp(20px,5vw,56px)', backdropFilter: 'blur(8px)',
          background: 'linear-gradient(180deg,rgba(17,17,27,.72),rgba(17,17,27,0))',
        }}
      >
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{
            width: 34, height: 34, borderRadius: 9, border: '1.5px solid #89b4fa',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: mono, fontWeight: 700, fontSize: 13, color: '#89b4fa',
            boxShadow: '0 0 16px rgba(137,180,250,.35)',
          }}>JE</span>
          <span style={{ fontFamily: mono, fontSize: 12, letterSpacing: '.18em', color: '#a6adc8', textTransform: 'uppercase' }}>
            Julien&nbsp;Evrard
          </span>
        </a>

        <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
          <a href="#about" className="hov-blue" style={{ fontFamily: mono, fontSize: 12.5, letterSpacing: '.1em', color: '#bac2de', textTransform: 'uppercase' }}>About</a>
          <a href="#work" className="hov-blue" style={{ fontFamily: mono, fontSize: 12.5, letterSpacing: '.1em', color: '#bac2de', textTransform: 'uppercase' }}>Work</a>
          <a href="#music" className="hov-blue" style={{ fontFamily: mono, fontSize: 12.5, letterSpacing: '.1em', color: '#bac2de', textTransform: 'uppercase' }}>Off the clock</a>
          <a href="#contact" className="hov-pill-blue" style={{ fontFamily: mono, fontSize: 12.5, letterSpacing: '.1em', padding: '9px 16px', border: '1px solid #45475a', borderRadius: 999, color: '#cdd6f4', textTransform: 'uppercase' }}>Signal</a>
        </div>

        <button
          className="nav-burger"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          style={{ display: 'none', flexDirection: 'column', gap: 5, background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}
        >
          <span style={{ width: 24, height: 2, background: '#cdd6f4', display: 'block' }} />
          <span style={{ width: 24, height: 2, background: '#cdd6f4', display: 'block' }} />
          <span style={{ width: 16, height: 2, background: '#89b4fa', display: 'block' }} />
        </button>
      </nav>

      {open && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 49, background: 'rgba(11,11,19,.96)',
          backdropFilter: 'blur(6px)', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 30,
        }}>
          <a href="#about" onClick={() => setOpen(false)} style={{ fontFamily: "'Instrument Serif',serif", fontSize: 34, color: '#cdd6f4' }}>About</a>
          <a href="#work" onClick={() => setOpen(false)} style={{ fontFamily: "'Instrument Serif',serif", fontSize: 34, color: '#cdd6f4' }}>Work</a>
          <a href="#music" onClick={() => setOpen(false)} style={{ fontFamily: "'Instrument Serif',serif", fontSize: 34, color: '#cdd6f4' }}>Off the clock</a>
          <a href="#contact" onClick={() => setOpen(false)} style={{ fontFamily: "'Instrument Serif',serif", fontSize: 34, color: '#89b4fa' }}>Send a signal</a>
          <span onClick={() => setOpen(false)} style={{ position: 'absolute', top: 24, right: 28, fontFamily: mono, fontSize: 13, color: '#6c7086', cursor: 'pointer' }}>[ close ]</span>
        </div>
      )}
    </>
  );
}
