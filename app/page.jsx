import NavBar from '@/components/NavBar';
import SpaceBackground from '@/components/SpaceBackground';
import Tardis from '@/components/Tardis';
import Demo from '@/components/Demo';
import LiveSiteDemo from '@/components/LiveSiteDemo';

const mono = "'JetBrains Mono',monospace";
const serif = "'Instrument Serif',serif";

const projects = [
  {
    tag: '★ FLAGSHIP · /001', tagColor: '#89b4fa', stack: 'C · Python · Rust · Svelte',
    width: 'min(560px,86vw)', mediaH: 180,
    media: 'repeating-linear-gradient(45deg,#1b2447,#1b2447 12px,#161d3a 12px,#161d3a 24px)',
    border: '#2a3566', label: '// 3DS  ─UDP→  server  ─WS→  Discord',
    title: 'Luma3DS · Discord Rich Presence',
    discordDot: true,
  },
  {
    tag: '/002', tagColor: '#94e2d5', stack: 'Go',
    width: 'min(480px,86vw)', mediaH: 160,
    media: 'repeating-linear-gradient(45deg,#152e2b,#152e2b 12px,#10231f 12px,#10231f 24px)',
    border: '#1f4a44', label: '// go build ./...',
    title: 'sae_go',
    desc: 'A systems & tooling exercise in Go — leaning into concurrency, clean interfaces and the standard library to keep things small and fast.',
    href: 'https://github.com/etsukow/sae_go', hov: 'hov-bd-teal',
  },
  {
    tag: '/003', tagColor: '#f38ba8', stack: 'Next.js · Three.js · Docker',
    width: 'min(480px,86vw)', mediaH: 160,
    media: 'repeating-linear-gradient(45deg,#321722,#321722 12px,#28121b 12px,#28121b 24px)',
    border: '#5e2436', label: '// build → docker → ci/cd → ship',
    title: 'Portfolios in production',
    desc: 'Next.js + Three.js sites with scroll-driven 3D — dockerised and shipped through CI/CD. Including this very portfolio, and one built for a friend — live below.',
    href: 'https://github.com/etsukow?tab=repositories', hov: 'hov-bd-red', live: true,
  },
];

function cardShell(p, children) {
  return (
    <article key={p.title} style={{ flex: '0 0 auto', width: p.width, border: '1px solid #313244', borderRadius: 20, background: 'linear-gradient(165deg,rgba(30,30,46,.9),rgba(24,24,37,.9))', backdropFilter: 'blur(6px)', padding: 28, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <span style={{ fontFamily: mono, fontSize: 12, color: p.tagColor, letterSpacing: '.12em' }}>{p.tag}</span>
        <span style={{ fontFamily: mono, fontSize: 11, color: '#6c7086' }}>{p.stack}</span>
      </div>
      <div style={{ borderRadius: 14, height: p.mediaH, background: p.media, border: '1px solid ' + p.border, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        {p.discordDot && <span style={{ position: 'absolute', top: 12, left: 14, width: 9, height: 9, borderRadius: '50%', background: '#5865F2', boxShadow: '0 0 12px #5865F2' }} />}
        <span style={{ fontFamily: mono, fontSize: 11, color: '#7f849c' }}>{p.label}</span>
      </div>
      {children}
    </article>
  );
}

export default function Page() {
  return (
    <div style={{ position: 'relative', background: '#11111b', minHeight: '100vh', overflowX: 'clip' }}>
      <SpaceBackground />
      <Tardis />
      <div id="tardisScrim" aria-hidden="true" />
      <NavBar />

      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* HERO */}
        <section id="top" data-screen-label="Hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '120px clamp(20px,6vw,90px) 80px', position: 'relative' }}>
          <div style={{ maxWidth: 760 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 26 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#a6e3a1', boxShadow: '0 0 10px #a6e3a1' }} />
              <span style={{ fontFamily: mono, fontSize: 12, letterSpacing: '.22em', color: '#94e2d5', textTransform: 'uppercase' }}>Incoming transmission · 51.4920 / -0.1928</span>
            </div>
            <h1 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(56px,11vw,128px)', lineHeight: 0.95, margin: 0, color: '#cdd6f4', letterSpacing: '-.01em' }}>
              Bigger on<br />the <span style={{ fontStyle: 'italic', color: '#89b4fa' }}>inside.</span>
            </h1>
            <p style={{ fontSize: 'clamp(16px,2vw,20px)', lineHeight: 1.6, color: '#bac2de', maxWidth: 540, margin: '30px 0 0' }}>
              I&apos;m <strong style={{ color: '#cdd6f4', fontWeight: 600 }}>Julien Evrard</strong> — an apprentice data &amp; AI engineer. A small ship with a lot of room inside: data pipelines, neural nets, low-level handheld plugins, and the occasional trip through space and time. This portfolio <em style={{ color: '#cba6f7', fontStyle: 'italic' }}>is</em> the ship. Step in.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 38 }}>
              <a href="#work" className="hov-bg-cyan" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '13px 24px', borderRadius: 999, background: '#89b4fa', color: '#11111b', fontWeight: 600, fontSize: 15 }}>Begin the journey →</a>
              <a href="#demo" className="hov-pill-blue" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '13px 24px', borderRadius: 999, border: '1px solid #45475a', color: '#cdd6f4', fontSize: 15 }}>Play the 3DS demo</a>
            </div>
          </div>
          <div style={{ position: 'absolute', left: '50%', bottom: 30, transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: '.2em', color: '#6c7086', textTransform: 'uppercase' }}>initiate travel</span>
            <span style={{ fontSize: 18, color: '#89b4fa', animation: 'cue 1.8s ease-in-out infinite' }}>↓</span>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" data-screen-label="About" style={{ padding: 'clamp(40px,7vh,90px) clamp(20px,6vw,90px)', maxWidth: 1180, margin: '0 auto' }}>
          <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: '.24em', color: '#74c7ec', textTransform: 'uppercase', marginBottom: 30 }}>01 — the traveller</div>
          <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 'clamp(40px,6vw,90px)', alignItems: 'start' }}>
            <div>
              <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(34px,5vw,60px)', lineHeight: 1.08, margin: '0 0 28px', color: '#cdd6f4' }}>
                I like problems that span the <span style={{ fontStyle: 'italic', color: '#cba6f7' }}>whole stack</span> — from a packet leaving a 12-year-old handheld to a model learning on the other side.
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.75, color: '#bac2de', margin: '0 0 18px', maxWidth: 560 }}>
                Based in France, I&apos;m training as a data &amp; AI engineer through apprenticeship. I&apos;m happiest somewhere between the low-level and the abstract: writing C that runs on a Nintendo 3DS in the morning, reasoning about neural networks by hand in the afternoon, shipping it all behind Docker and CI/CD by night.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.75, color: '#bac2de', margin: 0, maxWidth: 560 }}>
                Off the clock you&apos;ll usually find me deep in a webtoon, replaying a 3DS classic, or letting a record run while something compiles. I&apos;m <strong style={{ color: '#cdd6f4' }}>not looking for work</strong> — this is simply the ship, and you&apos;re welcome aboard.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ border: '1px solid #313244', borderRadius: 14, padding: '20px 22px', background: 'rgba(30,30,46,.5)', backdropFilter: 'blur(4px)' }}>
                <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '.16em', color: '#6c7086', textTransform: 'uppercase', marginBottom: 14 }}>manifest</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                  {[['Role', 'Data / AI engineer (apprentice)', '#cdd6f4'], ['Range', 'C → Python → Rust → Web', '#cdd6f4'], ['Based', 'France 🇫🇷', '#cdd6f4'], ['Status', '● travelling', '#a6e3a1']].map(([k, v, c]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14.5 }}>
                      <span style={{ color: '#a6adc8' }}>{k}</span><span style={{ color: c }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ border: '1px solid #313244', borderRadius: 14, padding: '20px 22px', background: 'rgba(30,30,46,.5)', backdropFilter: 'blur(4px)' }}>
                <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '.16em', color: '#6c7086', textTransform: 'uppercase', marginBottom: 14 }}>companions</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {[['Doctor Who', '137,180,250', '#89b4fa'], ['Webtoons & manhwa', '203,166,247', '#cba6f7'], ['Music', '148,226,213', '#94e2d5'], ['Retro handhelds', '250,179,135', '#fab387']].map(([t, rgb, c]) => (
                    <span key={t} style={{ fontSize: 13, padding: '6px 12px', borderRadius: 999, background: `rgba(${rgb},.12)`, color: c, border: `1px solid rgba(${rgb},.25)` }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WORK */}
        <section id="work" data-screen-label="Projects" style={{ position: 'relative', height: '100vh' }}>
          <div id="workSticky" style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 clamp(20px,6vw,90px) 26px', gap: 20 }}>
              <div>
                <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: '.24em', color: '#74c7ec', textTransform: 'uppercase', marginBottom: 10 }}>02 — selected work</div>
                <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(28px,4vw,50px)', margin: 0, color: '#cdd6f4', lineHeight: 1, whiteSpace: 'nowrap' }}>Three coordinates.</h2>
              </div>
              <span className="work-hint" style={{ fontFamily: mono, fontSize: 11, letterSpacing: '.14em', color: '#6c7086', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>scroll to travel →</span>
            </div>
            <div id="workTrack" style={{ display: 'flex', gap: 'clamp(20px,2.4vw,34px)', padding: '0 clamp(20px,6vw,90px)', willChange: 'transform' }}>
              {cardShell(projects[0], (
                <>
                  <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: 30, margin: '18px 0 8px', color: '#cdd6f4' }}>{projects[0].title}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: '#a6adc8', margin: '0 0 18px', flex: 1 }}>
                    Your 3DS, broadcasting. The game you&apos;re playing shows up as a live Discord status — automatically, in real time. Per-user token provisioning builds a personalised <code style={{ fontFamily: mono, fontSize: 13, color: '#94e2d5' }}>.3gx</code> plugin so each player&apos;s presence stays isolated.
                  </p>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <a href="#demo" className="hov-bg-cyan" style={{ flex: 1, textAlign: 'center', padding: 11, borderRadius: 10, background: '#89b4fa', color: '#11111b', fontWeight: 600, fontSize: 14 }}>▶ Live demo</a>
                    <a href="https://github.com/etsukow/Luma3DS-Plugin-DiscordRPC" target="_blank" rel="noopener" className="hov-bd-blue" style={{ flex: 1, textAlign: 'center', padding: 11, borderRadius: 10, border: '1px solid #45475a', color: '#cdd6f4', fontSize: 14 }}>GitHub ↗</a>
                  </div>
                </>
              ))}
              {projects.slice(1).map((p) => cardShell(p, (
                <>
                  <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: 28, margin: '18px 0 8px', color: '#cdd6f4' }}>{p.title}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: '#a6adc8', margin: '0 0 18px', flex: 1 }}>{p.desc}</p>
                  {p.live ? (
                    <LiveSiteDemo url="https://farah.etsukow.com" github={p.href} />
                  ) : (
                    <a href={p.href} target="_blank" rel="noopener" className={p.hov} style={{ textAlign: 'center', padding: 11, borderRadius: 10, border: '1px solid #45475a', color: '#cdd6f4', fontSize: 14 }}>GitHub ↗</a>
                  )}
                </>
              )))}
              <div style={{ flex: '0 0 auto', width: 1 }} />
            </div>
          </div>
        </section>

        {/* DEMO */}
        <Demo />

        {/* MUSIC */}
        <section id="music" data-screen-label="Music" style={{ padding: 'clamp(90px,14vh,160px) clamp(20px,6vw,90px)', maxWidth: 1180, margin: '0 auto' }}>
          <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: '.24em', color: '#74c7ec', textTransform: 'uppercase', marginBottom: 18 }}>04 — off the clock</div>
          <div className="music-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 'clamp(36px,5vw,72px)', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26 }}>
              <div style={{ position: 'relative', width: 'min(280px,72vw)', aspectRatio: '1' }}>
                <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'repeating-radial-gradient(circle at center,#11111b 0 2px,#1a1a28 2px 4px)', boxShadow: '0 24px 50px rgba(0,0,0,.55), inset 0 0 60px rgba(0,0,0,.6)', animation: 'spin 8s linear infinite', border: '1px solid #313244' }}>
                  <div style={{ position: 'absolute', inset: '34%', borderRadius: '50%', background: 'radial-gradient(circle,#cba6f7,#89b4fa)', boxShadow: '0 0 24px rgba(137,180,250,.5)' }} />
                  <div style={{ position: 'absolute', left: '50%', top: '50%', width: 8, height: 8, borderRadius: '50%', background: '#11111b', transform: 'translate(-50%,-50%)' }} />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 46 }}>
                {[['#89b4fa', '.9s', '0s'], ['#74c7ec', '1.3s', '.2s'], ['#cba6f7', '.7s', '.1s'], ['#94e2d5', '1.1s', '.35s'], ['#f5c2e7', '.85s', '.05s'], ['#fab387', '1.4s', '.25s'], ['#89b4fa', '.95s', '.15s'], ['#a6e3a1', '1.2s', '.3s']].map(([c, d, delay], i) => (
                  <span key={i} style={{ width: 6, background: c, borderRadius: 3, height: '100%', transformOrigin: 'bottom', animation: `eq ${d} ease-in-out infinite ${delay}` }} />
                ))}
              </div>
            </div>
            <div>
              <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(32px,5vw,58px)', margin: '0 0 14px', color: '#cdd6f4', lineHeight: 1.05 }}>
                There&apos;s always something <span style={{ fontStyle: 'italic', color: '#cba6f7' }}>spinning.</span>
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.65, color: '#a6adc8', maxWidth: 520, margin: '0 0 30px' }}>
                Code goes better with a soundtrack. A rough idea of what&apos;s usually on rotation while I build — and what I&apos;m reading when the screen finally goes dark.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  ['linear-gradient(135deg,#89b4fa,#74c7ec)', 'Synthwave & retrowave', 'for the late-night refactors', '~ on loop', 'hov-bd-blue'],
                  ['linear-gradient(135deg,#cba6f7,#f5c2e7)', 'Anime & game OSTs', '3DS soundtracks, mostly', '~ comfort', 'hov-bd-mauve'],
                  ['linear-gradient(135deg,#94e2d5,#a6e3a1)', 'Reading: webtoons & manhwa', 'the screen-off ritual', '📖', 'hov-bd-teal'],
                ].map(([bg, t, s, meta, hov]) => (
                  <div key={t} className={hov} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 16px', border: '1px solid #313244', borderRadius: 12, background: 'rgba(30,30,46,.5)' }}>
                    <span style={{ width: 38, height: 38, borderRadius: 8, flex: '0 0 auto', background: bg }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, color: '#cdd6f4', fontWeight: 500 }}>{t}</div>
                      <div style={{ fontSize: 12.5, color: '#7f849c' }}>{s}</div>
                    </div>
                    <span style={{ fontFamily: mono, fontSize: 11, color: '#6c7086' }}>{meta}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontFamily: mono, fontSize: 11, color: '#585b70', margin: '16px 0 0' }}>// edit these to your real rotation anytime</p>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" data-screen-label="Contact" style={{ padding: 'clamp(90px,14vh,150px) clamp(20px,6vw,90px) 70px', maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: '.24em', color: '#74c7ec', textTransform: 'uppercase', marginBottom: 22 }}>05 — send a signal</div>
          <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(38px,7vw,84px)', margin: '0 0 18px', color: '#cdd6f4', lineHeight: 1 }}>
            Knock on the<br /><span style={{ fontStyle: 'italic', color: '#89b4fa' }}>blue box.</span>
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: '#a6adc8', maxWidth: 480, margin: '0 auto 40px' }}>
            Not on the market for opportunities — but always up for a chat about 3DS homebrew, models, or where the next season is going.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
            <a href="mailto:julien.evrard@icloud.com" className="hov-bg-cyan" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '15px 28px', borderRadius: 999, background: '#89b4fa', color: '#11111b', fontWeight: 600, fontSize: 15 }}>✉ julien.evrard@icloud.com</a>
            <a href="https://github.com/etsukow" target="_blank" rel="noopener" className="hov-pill-mauve" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '15px 28px', borderRadius: 999, border: '1px solid #45475a', color: '#cdd6f4', fontSize: 15 }}>GitHub ↗</a>
            <a href="https://www.linkedin.com/in/evrard-julien" target="_blank" rel="noopener" className="hov-pill-cyan" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '15px 28px', borderRadius: 999, border: '1px solid #45475a', color: '#cdd6f4', fontSize: 15 }}>LinkedIn ↗</a>
          </div>
          <div style={{ marginTop: 90, paddingTop: 28, borderTop: '1px solid #1e1e2e', display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: mono, fontSize: 11.5, color: '#585b70' }}>© 2026 Julien Evrard — bigger on the inside, as ever.</span>
            <span style={{ fontFamily: mono, fontSize: 11.5, color: '#585b70' }}>Allons-y. ✦</span>
          </div>
        </section>
      </div>
    </div>
  );
}
