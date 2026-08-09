import { useState } from 'react'
import './App.css'
import Login from './Login'
//import Dashboard from './Dashboard'

const marqueeItems = [
  'NEW QUEST UNLOCKED',
  'STREAK +1 DAY',
  'LEVEL UP',
  'ACHIEVEMENT EARNED',
  'PATH RESHAPED FOR YOU',
  '+120 XP EARNED',
]

function App() {
  const initialPage = ((): 'home' | 'login' | 'dashboard' => {
    try {
      if (window.location.hash === '#dashboard') return 'dashboard'
    } catch (e) {
      // ignore in non-browser environments
    }
    return 'home'
  })()

  const [page, setPage] = useState<'home' | 'login' | 'dashboard'>(initialPage)

if (page === 'login') {
  return (
    <Login
      onBack={() => setPage('home')}
      onLoginSuccess={() => {
        window.location.href = '/Dashboard.html'
      }}
    />
  )
}

if (page === 'dashboard') {
  window.location.href = '/Dashboard.html'
  return null
}

  return (
    <>
      <header>
        <nav className="wrap nav-inner">
          <div className="logo">
           
            <span className="brand">
              learn<span className="ext">.md</span>
            </span>
          </div>

          <div className="nav-links">
            <a href="#how">How it works</a>
            <a href="#features">Game Mechanics</a>
       
          </div>

          <div className="nav-right">
            <a
              href="#"
              className="link-signin"
              onClick={(event) => {
                event.preventDefault()
                setPage('login')
              }}
            >
              Log in
            </a>
          
          </div>
        </nav>
      </header>

      <section className="hero wrap">
        <div>
          <div className="eyebrow">
            <span className="dot-live" /> LEARN.MD — YOUR PATH, LEVELED UP
          </div>
          <h1 className="display">
            Turn learning into
            <br />a path you <em>actually</em>
            <br />finish.
          </h1>
          <p className="sub">
            learn.md writes a custom curriculum from your goal, breaks it into quests,
            and pays you in XP, streaks, and levels for every step you clear.
          </p>

          <div className="hero-cta">
            <a
              href="#"
              className="btn-primary"
              onClick={(event) => {
                event.preventDefault()
                setPage('login')
              }}
            >
              Start your path <span aria-hidden="true">→</span>
            </a>
            <a href="#how" className="btn-ghost">
              See how it works
            </a>
          </div>

          <div className="avatars">
            <div className="stack">
              <span style={{ background: '#3D4CE0' }} />
              <span style={{ background: '#E5A13B' }} />
              <span style={{ background: '#1C1A2B' }} />
              <span style={{ background: '#8A5A10' }} />
            </div>
            <div className="caption">
              <strong>10+</strong> learners leveling up right now
            </div>
          </div>
        </div>

        <div className="path-card">
          <div className="card-label">
            <span>YOUR PATH · WEB DEVELOPMENT</span>
            <span className="badge">Lvl 4 · 1,280 XP</span>
          </div>
          <svg className="path-svg" viewBox="0 0 460 440" aria-hidden="true">
            <path
              id="skillPath"
              d="M60,40 C160,60 140,140 60,150 C-20,160 20,240 100,250 C180,260 220,180 300,190 C380,200 400,280 340,320 C280,360 350,400 400,400"
              fill="none"
              stroke="#1C1A2B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="1 10"
              opacity="0.4"
            />

            <circle cx="60" cy="40" r="16" fill="#3D4CE0" />
            <path
              d="M53,40 L58,45 L68,34"
              stroke="#F7F2E7"
              strokeWidth="2.3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text x="86" y="36" className="node-label">
              HTML Basics
            </text>
            <text x="86" y="50" className="node-sub">
              COMPLETE
            </text>

            <circle cx="60" cy="150" r="16" fill="#3D4CE0" />
            <path
              d="M53,150 L58,155 L68,144"
              stroke="#F7F2E7"
              strokeWidth="2.3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text x="86" y="146" className="node-label">
              CSS Layouts
            </text>
            <text x="86" y="160" className="node-sub">
              COMPLETE
            </text>

            <circle cx="100" cy="250" r="19" fill="#E5A13B" opacity="0.35">
              <animate attributeName="r" values="19;25;19" dur="1.8s" repeatCount="indefinite" />
              <animate
                attributeName="opacity"
                values="0.35;0.05;0.35"
                dur="1.8s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="100" cy="250" r="17" fill="#E5A13B" />
            <text
              x="100"
              y="255"
              textAnchor="middle"
              fontFamily="IBM Plex Mono"
              fontSize="12"
              fontWeight="600"
              fill="#1C1A2B"
            >
              JS
            </text>
            <text x="128" y="246" className="node-label">
              JavaScript
            </text>
            <text x="128" y="260" className="node-sub">
              IN PROGRESS
            </text>

            <circle cx="300" cy="190" r="16" fill="#EFE7D4" stroke="#1C1A2B" strokeWidth="1.5" />
            <text x="279" y="176" className="node-label" textAnchor="end">
              React
            </text>
            <text x="279" y="200" className="node-sub" textAnchor="end">
              LOCKED
            </text>

            <circle cx="340" cy="320" r="16" fill="#EFE7D4" stroke="#1C1A2B" strokeWidth="1.5" />
            <text x="362" y="316" className="node-label">
              APIs
            </text>
            <text x="362" y="330" className="node-sub">
              LOCKED
            </text>

            <circle cx="400" cy="400" r="16" fill="#EFE7D4" stroke="#1C1A2B" strokeWidth="1.5" />
            <text x="378" y="424" className="node-label" textAnchor="end">
              Ship a Project
            </text>
            <text x="378" y="410" className="node-sub" textAnchor="end">
              GOAL
            </text>

            <circle r="7" fill="#1C1A2B">
              <animateMotion dur="9s" repeatCount="indefinite" rotate="auto">
                <mpath href="#skillPath" />
              </animateMotion>
            </circle>
          </svg>
        </div>
      </section>

      <section className="section" id="features">
        <div className="section-head">
          <div className="eyebrow inline">GAME MECHANICS</div>
          <h2 className="display">Learning that plays back.</h2>
          <p>
            Every lesson feeds a system built to make progress visible — and worth coming back for.
          </p>
        </div>

        <div className="features">
          <article className="feature-card">
            <div className="icon icon-indigo">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3>XP that adds up</h3>
            <p>Every quest, quiz, and project pays real experience points toward your next level.</p>
            <div className="stat">+50–500 XP per quest</div>
          </article>

          <article className="feature-card">
            <div className="icon icon-amber">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C10 6 6 8 6 13a6 6 0 0012 0c0-2-1-3-2-4 0 2-1 3-2 2 1-3-1-6-2-9z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3>Low Bandwidth Support</h3>
            <p>Learn on the go with our optimized content that works even when you're offline or on a slow connection.</p>
            <div className="stat">Works offline</div>
          </article>

          <article className="feature-card">
            <div className="icon icon-indigo">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.8" />
                <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>
            <h3>Quests, not chores</h3>
            <p>Every topic is broken into bite-size quests with a clear win condition — no vague "watch and hope."</p>
            <div className="stat">Avg. quest: 8 min</div>
          </article>

          <article className="feature-card">
            <div className="icon icon-amber">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M4 20V10M12 20V4M20 20v-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>
            <h3>Keep a track with teachers</h3>
            <p>Monitor your progress and get feedback from instructors throughout your learning journey.</p>
            <div className="stat">Weekly resets</div>
          </article>
        </div>
      </section>

      <section className="section" id="how">
        <div className="section-head">
          <div className="eyebrow inline">HOW IT WORKS</div>
          <h2 className="display">From goal to path in seconds.</h2>
          <p>Four steps stand between "I want to learn this" and a plan that actually moves.</p>
        </div>

        <div className="steps">
          <article className="step active">
            <div className="num">01</div>
            <div>
              <h4>Tell learn.md your goal</h4>
              <p>
                "Learn enough Python for data analysis" or "Get conversational in Spanish by
                December" — plain language works.
              </p>
            </div>
          </article>
          <article className="step">
            <div className="num">02</div>
            <div>
              <h4>Get a path built for you</h4>
              <p>We map your goal into ordered milestones and quests, sized to the time you actually have each week.</p>
            </div>
          </article>
          <article className="step">
            <div className="num">03</div>
            <div>
              <h4>Clear quests, earn XP</h4>
              <p>Work through bite-size lessons and checks. Each one you clear levels up your path and your streak.</p>
            </div>
          </article>
          <article className="step">
            <div className="num">04</div>
            <div>
              <h4>Level up, unlock what's next</h4>
              <p>Your path reshapes itself as you go — reinforcing what's shaky, skipping what you've already proven.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="section cta-section">
        <div className="cta-band">
          <h2 className="display">
            Stop bookmarking courses
            <br />you'll never <em>finish</em>.
          </h2>
          <p>Your first path is free — and takes less than a minute to build.</p>
          <a href="#" className="btn-primary">Build my course <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <footer>
        <div className="marquee">
          <div className="marquee-track">
            {marqueeItems.concat(marqueeItems).map((item, index) => (
              <span key={`${item}-${index}`}>
                {item}
                <span className="sep">✦</span>
              </span>
            ))}
          </div>
        </div>

        <div className="footer-main wrap">
          <div className="footer-brand">
            <div className="logo footer-logo">
              <svg viewBox="0 0 26 26" fill="none" aria-hidden="true">
                <circle cx="13" cy="13" r="12" stroke="#F7F2E7" strokeWidth="1.5" />
                <path
                  d="M7 14.5L11 18.5L19 8.5"
                  stroke="#E5A13B"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="brand footer-brand-text">
                learn<span className="ext footer-ext">.md</span>
              </span>
            </div>
            <p>A learning engine that reshapes itself around you. Gamify your path, one quest at a time.</p>
          </div>
          <div className="footer-col">
            <h5>Product</h5>
            <a href="#">Paths</a>
            <a href="#">Quests</a>
            <a href="#">Leaderboards</a>
            <a href="#">Pricing</a>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <a href="#">About</a>
            <a href="#">Blog</a>
            <a href="#">Careers</a>
          </div>
          <div className="footer-col">
            <h5>Support</h5>
            <a href="#">Help center</a>
            <a href="#">Contact</a>
            <a href="#">Status</a>
          </div>
        </div>
        <div className="footer-bottom wrap">
          <span>© 2026 learn.md — all rights reserved.</span>
          <span>Made for people who like finishing things.</span>
        </div>
      </footer>
    </>
  )
}

export default App
