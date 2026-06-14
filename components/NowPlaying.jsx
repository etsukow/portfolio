'use client';

import { useEffect, useState } from 'react';

/* ─────────────────────────────────────────────────────────────────────────
 *  Last.fm "now playing" for the spinning disc.
 *
 *  Setup (one-time):
 *   1. Scrobble Apple Music → Last.fm (e.g. bijou.fm / Finale on iOS).
 *   2. Create a read API key: https://www.last.fm/api/account/create
 *   3. Add it as the GitHub Actions *Secret* LASTFM_API_KEY, and your username
 *      as the *Variable* LASTFM_USER — both baked into the build
 *      (deploy.yml → Dockerfile → NEXT_PUBLIC_*).
 *
 *  When unset, this renders nothing and the disc keeps its default look.
 * ──────────────────────────────────────────────────────────────────────── */
const LASTFM_USER = process.env.NEXT_PUBLIC_LASTFM_USER || '';
const LASTFM_KEY = process.env.NEXT_PUBLIC_LASTFM_API_KEY || '';
const POLL_MS = 20000;

const mono = "'JetBrains Mono',monospace";

export default function NowPlaying() {
  const [track, setTrack] = useState(null);

  useEffect(() => {
    if (!LASTFM_USER || !LASTFM_KEY) return;
    let alive = true;

    const load = async () => {
      try {
        const url =
          'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks' +
          `&user=${encodeURIComponent(LASTFM_USER)}&api_key=${LASTFM_KEY}&format=json&limit=1`;
        const res = await fetch(url);
        const data = await res.json();
        const t = data?.recenttracks?.track?.[0];
        if (!t || !alive) return;
        const img = (t.image || []).slice().reverse().find((i) => i['#text'])?.['#text'] || '';
        setTrack({
          name: t.name || '',
          artist: t.artist?.['#text'] || '',
          live: t['@attr']?.nowplaying === 'true',
        });
        // paint the cover onto the spinning vinyl label
        const label = document.getElementById('discLabel');
        if (label && img) label.style.backgroundImage = `url('${img}')`;
      } catch {
        /* network hiccup — keep the last state */
      }
    };

    load();
    const id = setInterval(load, POLL_MS);
    return () => { alive = false; clearInterval(id); };
  }, []);

  if (!track) return null;

  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 9, fontFamily: mono, fontSize: 11,
        color: '#a6adc8', maxWidth: 'min(280px,72vw)',
      }}
    >
      <span
        style={{
          width: 7, height: 7, borderRadius: '50%', flex: '0 0 auto',
          background: track.live ? '#a6e3a1' : '#6c7086',
          boxShadow: track.live ? '0 0 10px #a6e3a1' : 'none',
        }}
      />
      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>
        <span style={{ color: track.live ? '#94e2d5' : '#6c7086', letterSpacing: '.12em', textTransform: 'uppercase' }}>
          {track.live ? 'now playing' : 'last played'}
        </span>
        {'  '}
        <span style={{ color: '#cdd6f4' }}>{track.name}</span>
        {track.artist ? ` · ${track.artist}` : ''}
      </span>
    </div>
  );
}
