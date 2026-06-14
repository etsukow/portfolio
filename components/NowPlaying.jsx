'use client';

import { useEffect, useState } from 'react';

/* ─────────────────────────────────────────────────────────────────────────
 *  "Now playing" for the spinning disc.
 *
 *  Primary source: ListenBrainz (open, no API key for reads — just a username).
 *  Fallback: Last.fm (kept so the display never goes blank during the switch).
 *
 *  Setup:
 *   • ListenBrainz: create an account, scrobble Apple Music to it (Marvis Pro on
 *     iOS, or Cider / web-scrobbler on desktop), then add a GitHub Actions
 *     *Variable* LISTENBRAINZ_USER. No key/secret needed.
 *
 *  Values are baked at build time (deploy.yml → Dockerfile → NEXT_PUBLIC_*).
 *  When nothing is configured this renders nothing and the disc looks default.
 * ──────────────────────────────────────────────────────────────────────── */
const LB_USER = process.env.NEXT_PUBLIC_LISTENBRAINZ_USER || '';
const LFM_USER = process.env.NEXT_PUBLIC_LASTFM_USER || '';
const LFM_KEY = process.env.NEXT_PUBLIC_LASTFM_API_KEY || '';
const POLL_MS = 20000;

const mono = "'JetBrains Mono',monospace";

async function fromListenBrainz() {
  if (!LB_USER) return null;
  const base = `https://api.listenbrainz.org/1/user/${encodeURIComponent(LB_USER)}`;
  try {
    let live = true;
    let res = await fetch(`${base}/playing-now`);
    let listen = (await res.json())?.payload?.listens?.[0];
    if (!listen) {
      live = false;
      res = await fetch(`${base}/listens?count=1`);
      listen = (await res.json())?.payload?.listens?.[0];
    }
    if (!listen) return null;
    const m = listen.track_metadata || {};
    const map = m.mbid_mapping || {};
    const img = map.caa_release_mbid
      ? `https://coverartarchive.org/release/${map.caa_release_mbid}/front-250`
      : '';
    return { name: m.track_name || '', artist: m.artist_name || '', live, img };
  } catch {
    return null;
  }
}

async function fromLastfm() {
  if (!LFM_USER || !LFM_KEY) return null;
  try {
    const url =
      'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks' +
      `&user=${encodeURIComponent(LFM_USER)}&api_key=${LFM_KEY}&format=json&limit=1`;
    const t = (await (await fetch(url)).json())?.recenttracks?.track?.[0];
    if (!t) return null;
    const img = (t.image || []).slice().reverse().find((i) => i['#text'])?.['#text'] || '';
    return {
      name: t.name || '',
      artist: t.artist?.['#text'] || '',
      live: t['@attr']?.nowplaying === 'true',
      img,
    };
  } catch {
    return null;
  }
}

export default function NowPlaying() {
  const [track, setTrack] = useState(null);

  useEffect(() => {
    if (!LB_USER && !(LFM_USER && LFM_KEY)) return;
    let alive = true;

    const load = async () => {
      const t = (await fromListenBrainz()) || (await fromLastfm());
      if (!t || !alive) return;
      setTrack(t);
      const label = document.getElementById('discLabel');
      if (label && t.img) label.style.backgroundImage = `url('${t.img}')`;
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
