'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const mono = "'JetBrains Mono',monospace";

/**
 * "Live demo" for a project that is a deployed website: a button that opens a
 * modal embedding the site in an iframe (browser-chrome styled), with an
 * open-in-new-tab fallback. The target site must allow framing from this origin
 * (see farah/nginx.conf → Content-Security-Policy frame-ancestors).
 */
export default function LiveSiteDemo({ url, github, accent = '#f38ba8' }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const host = url.replace(/^https?:\/\//, '').replace(/\/$/, '');

  useEffect(() => setMounted(true), []);

  // lock body scroll + close on Escape while the modal is open
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [open]);

  return (
    <>
      <div style={{ display: 'flex', gap: 12 }}>
        <button
          onClick={() => setOpen(true)}
          className="hov-bg-cyan"
          style={{ flex: 1, textAlign: 'center', padding: 11, borderRadius: 10, background: '#89b4fa', color: '#11111b', fontWeight: 600, fontSize: 14, border: 'none', cursor: 'pointer' }}
        >
          ▶ Live demo
        </button>
        <a href={github} target="_blank" rel="noopener" className="hov-bd-red" style={{ flex: 1, textAlign: 'center', padding: 11, borderRadius: 10, border: '1px solid #45475a', color: '#cdd6f4', fontSize: 14 }}>
          GitHub ↗
        </a>
      </div>

      {mounted && open && createPortal(
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(11,11,19,.82)',
            backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(12px,3vw,40px)',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 'min(1200px,96vw)', height: 'min(800px,90vh)', display: 'flex', flexDirection: 'column',
              borderRadius: 14, overflow: 'hidden', border: '1px solid #313244',
              boxShadow: '0 40px 120px rgba(0,0,0,.6)', background: '#1e1e2e',
            }}
          >
            {/* browser chrome */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: '#181825', borderBottom: '1px solid #313244' }}>
              <span style={{ display: 'flex', gap: 6 }}>
                <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#f38ba8' }} />
                <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#f9e2af' }} />
                <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#a6e3a1' }} />
              </span>
              <span style={{ flex: 1, textAlign: 'center', fontFamily: mono, fontSize: 12, color: '#a6adc8', background: '#11111b', borderRadius: 999, padding: '5px 14px', border: '1px solid #313244', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                🔒 {host}
              </span>
              <a href={url} target="_blank" rel="noopener" className="hov-col-cyan" style={{ fontFamily: mono, fontSize: 12, color: '#89b4fa', whiteSpace: 'nowrap' }}>Open ↗</a>
              <button onClick={() => setOpen(false)} aria-label="Close" style={{ background: 'none', border: 'none', color: '#cdd6f4', fontSize: 18, lineHeight: 1, cursor: 'pointer', padding: '0 4px' }}>×</button>
            </div>
            {/* the live site */}
            <iframe
              src={url}
              title={`Live demo — ${host}`}
              loading="lazy"
              style={{ flex: 1, width: '100%', border: 'none', background: '#fff' }}
            />
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
