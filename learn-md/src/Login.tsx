import { type FormEvent, useState } from 'react'
import { GithubAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth } from './lib/firebase'

const captions = {
  student: {
    badge: 'Student mode',
    title: 'Every quest you clear<br>levels up your path.',
    body: 'Track streaks, earn XP, and watch your skill tree grow with every session.',
    cta: 'Sign in as Student →',
  },
  teacher: {
    badge: 'Teacher mode',
    title: 'Watch your whole<br>class level up.',
    body: 'Assign quests, track completion in real time, and cheer every student across the finish line.',
    cta: 'Sign in as Teacher →',
  },
}

const studentScene = (
  <svg viewBox="0 0 460 460" fill="none" aria-hidden="true">
    <path
      id="studentPath"
      d="M70,380 C90,300 40,260 90,200 C140,140 220,160 250,100 C275,50 330,60 360,40"
      stroke="rgba(245,241,230,0.35)"
      strokeWidth="2"
      strokeDasharray="1 10"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="70" cy="380" r="14" fill="#3D4CE0" />
    <circle cx="90" cy="200" r="12" fill="rgba(245,241,230,0.15)" stroke="rgba(245,241,230,0.4)" strokeWidth="1.5" />
    <circle cx="250" cy="100" r="12" fill="rgba(245,241,230,0.15)" stroke="rgba(245,241,230,0.4)" strokeWidth="1.5" />

    <g transform="translate(320,10)">
      <circle cx="40" cy="40" r="34" fill="#EFB13B" opacity="0.18">
        <animate attributeName="r" values="34;42;34" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.18;0.05;0.18" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="40" cy="40" r="26" fill="#EFB13B" />
      <path d="M28 40h24M40 28v24" stroke="#241F1A" strokeWidth="0" />
      <path d="M30 42 L37 49 L52 32" stroke="#241F1A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </g>

    <g fontFamily="IBM Plex Mono" fontSize="11" fontWeight="600" fill="#EFB13B">
      <text x="130" y="330" opacity="0">
        +10 XP
        <animate attributeName="opacity" values="0;1;0" dur="3s" begin="0s" repeatCount="indefinite" />
        <animateTransform attributeName="transform" type="translate" values="0,0; 0,-40" dur="3s" begin="0s" repeatCount="indefinite" />
      </text>
      <text x="180" y="170" opacity="0">
        +25 XP
        <animate attributeName="opacity" values="0;1;0" dur="3s" begin="1s" repeatCount="indefinite" />
        <animateTransform attributeName="transform" type="translate" values="0,0; 0,-40" dur="3s" begin="1s" repeatCount="indefinite" />
      </text>
      <text x="290" y="90" opacity="0">
        +15 XP
        <animate attributeName="opacity" values="0;1;0" dur="3s" begin="2s" repeatCount="indefinite" />
        <animateTransform attributeName="transform" type="translate" values="0,0; 0,-40" dur="3s" begin="2s" repeatCount="indefinite" />
      </text>
    </g>

    <g>
      <circle r="9" fill="#F5F1E6" />
      <circle r="9" fill="none" stroke="#3D4CE0" strokeWidth="2.5">
        <animateMotion dur="6s" repeatCount="indefinite" rotate="auto">
          <mpath href="#studentPath" />
        </animateMotion>
      </circle>
      <animateMotion dur="6s" repeatCount="indefinite" rotate="auto">
        <mpath href="#studentPath" />
      </animateMotion>
    </g>

    <g transform="translate(-6,-6)">
      <rect width="12" height="12" rx="2" fill="#79C245">
        <animateMotion dur="6s" repeatCount="indefinite" rotate="auto" keyPoints="0.02;1" keyTimes="0;1" calcMode="linear">
          <mpath href="#studentPath" />
        </animateMotion>
      </rect>
    </g>
  </svg>
)

const teacherScene = (
  <svg viewBox="0 0 460 460" fill="none" aria-hidden="true">
    <rect x="70" y="70" width="320" height="190" rx="14" fill="rgba(245,241,230,0.06)" stroke="rgba(245,241,230,0.25)" strokeWidth="1.5" />
    <text x="94" y="100" fontFamily="IBM Plex Mono" fontSize="11" fill="rgba(245,241,230,0.5)">CLASS PROGRESS</text>
    <g>
      <rect x="100" y="220" width="26" height="0" fill="#3D4CE0" rx="3">
        <animate attributeName="height" values="0;70;70" dur="1.6s" fill="freeze" />
        <animate attributeName="y" values="220;150;150" dur="1.6s" fill="freeze" />
      </rect>
      <rect x="146" y="220" width="26" height="0" fill="#EFB13B" rx="3">
        <animate attributeName="height" values="0;100;100" dur="1.6s" begin="0.15s" fill="freeze" />
        <animate attributeName="y" values="220;120;120" dur="1.6s" begin="0.15s" fill="freeze" />
      </rect>
      <rect x="192" y="220" width="26" height="0" fill="#79C245" rx="3">
        <animate attributeName="height" values="0;50;50" dur="1.6s" begin="0.3s" fill="freeze" />
        <animate attributeName="y" values="220;170;170" dur="1.6s" begin="0.3s" fill="freeze" />
      </rect>
      <rect x="238" y="220" width="26" height="0" fill="#3D4CE0" rx="3">
        <animate attributeName="height" values="0;85;85" dur="1.6s" begin="0.45s" fill="freeze" />
        <animate attributeName="y" values="220;135;135" dur="1.6s" begin="0.45s" fill="freeze" />
      </rect>
      <rect x="284" y="220" width="26" height="0" fill="#EFB13B" rx="3">
        <animate attributeName="height" values="0;60;60" dur="1.6s" begin="0.6s" fill="freeze" />
        <animate attributeName="y" values="220;160;160" dur="1.6s" begin="0.6s" fill="freeze" />
      </rect>
      <rect x="330" y="220" width="26" height="0" fill="#79C245" rx="3">
        <animate attributeName="height" values="0;40;40" dur="1.6s" begin="0.75s" fill="freeze" />
        <animate attributeName="y" values="220;180;180" dur="1.6s" begin="0.75s" fill="freeze" />
      </rect>
    </g>
    <g>
      <rect x="70" y="290" width="320" height="46" rx="10" fill="rgba(245,241,230,0.06)" stroke="rgba(245,241,230,0.2)" />
      <circle cx="92" cy="313" r="10" fill="#3D4CE0" />
      <text x="112" y="317" fontFamily="Inter" fontSize="12" fontWeight="600" fill="#F5F1E6">Maya — Algebra II</text>
      <text x="330" y="317" fontFamily="IBM Plex Mono" fontSize="10" fill="#79C245">DONE</text>
      <rect x="70" y="344" width="320" height="46" rx="10" fill="rgba(245,241,230,0.06)" stroke="rgba(245,241,230,0.2)" />
      <circle cx="92" cy="367" r="10" fill="#EFB13B" />
      <text x="112" y="371" fontFamily="Inter" fontSize="12" fontWeight="600" fill="#F5F1E6">Diego — Chemistry</text>
      <text x="330" y="371" fontFamily="IBM Plex Mono" fontSize="10" fill="rgba(245,241,230,0.5)">DOING</text>
    </g>
    <path id="teacherPath" d="M400,313 L400,313 L20,313 L20,367 L400,367" fill="none" stroke="none" />
    <g>
      <circle r="7" fill="#F5F1E6" stroke="#241F1A" strokeWidth="1">
        <animateMotion dur="4s" repeatCount="indefinite" keyPoints="0;0.02;0.5;0.52;1" keyTimes="0;0.05;0.5;0.55;1" calcMode="linear">
          <mpath href="#teacherPath" />
        </animateMotion>
      </circle>
    </g>
    <g transform="translate(355,306)">
      <circle r="10" fill="#79C245" opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0" dur="4s" begin="0s" repeatCount="indefinite" />
      </circle>
      <path
        d="M-4,0 L-1,4 L5,-5"
        stroke="#0E1A10"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0"
      >
        <animate attributeName="opacity" values="0;0;1;1;0" dur="4s" begin="0s" repeatCount="indefinite" />
      </path>
    </g>
  </svg>
)

export default function Login({ onBack, onLoginSuccess }: { onBack: () => void; onLoginSuccess: () => void }) {
  const [role, setRole] = useState<'student' | 'teacher'>('student')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const caption = captions[role]
  const scene = role === 'student' ? studentScene : teacherScene

  const submitText = caption.cta

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      await signInWithEmailAndPassword(auth, email, password)
      if (role === 'teacher') {
        window.location.href = '/teacher-dashboard/index.html'
        return
      }
      onLoginSuccess()
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const handleGithubSignIn = async () => {
    setLoading(true)
    setError('')

    try {
      const provider = new GithubAuthProvider()
      await signInWithPopup(auth, provider)
      if (role === 'teacher') {
        window.location.href = '/teacher-dashboard/index.html'
        return
      }
      onLoginSuccess()
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const isSubmitDisabled = loading || !email || !password

  return (
    <div className="login-screen">
      <div className="left">
        <div className="logo login-logo">
          <svg viewBox="0 0 26 26" fill="none" aria-hidden="true">
            <circle cx="13" cy="13" r="12" stroke="#241F1A" strokeWidth="1.5" />
            <path
              d="M7 14.5L11 18.5L19 8.5"
              stroke="#3D4CE0"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>
            learn<span className="ext">.md</span>
          </span>
        </div>

        <div className="form-wrap">
          <div className="form-inner">
            <div className="form-head">
              <h1>Welcome back</h1>
              <p>Sign in to keep your path moving.</p>
            </div>

            <div className="role-toggle">
              <button
                type="button"
                className={role === 'student' ? 'active' : ''}
                onClick={() => setRole('student')}
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 3L2 8l10 5 8-4v6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 10.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-5.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                </svg>
                I'm a Student
              </button>
              <button
                type="button"
                className={role === 'teacher' ? 'active' : ''}
                onClick={() => setRole('teacher')}
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M8 20h8M12 16v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M7 9h6M7 12h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                I'm a Teacher
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="login-email">Email</label>
                <input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <div className="field">
                <div className="field-row">
                  <label htmlFor="login-password">Password</label>
                  <a href="#" className="fp">
                    Forgot your password?
                  </a>
                </div>
                <input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>

              {error && <div className="login-error">{error}</div>}

              <button type="submit" className="btn-primary" disabled={isSubmitDisabled}>
                {loading ? 'Signing in...' : submitText}
              </button>
            </form>

            <div className="divider">Or continue with</div>

            <button type="button" className="btn-ghost" onClick={handleGithubSignIn} disabled={loading}>
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.42 7.86 10.95.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.78 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.08.78 2.17 0 1.57-.01 2.83-.01 3.22 0 .31.2.67.8.56A10.52 10.52 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" />
              </svg>
              Login with GitHub
            </button>

            <p className="signup-hint">
              Don't have an account? <a href="#">Sign up</a>
            </p>
          </div>
        </div>

        <div className="left-foot">© 2026 LEARN.MD — GAMIFY YOUR GROWTH</div>
      </div>

      <div className="right">
        <button type="button" className="login-back" onClick={onBack}>
          ← Back to home
        </button>
        <div className="role-badge">
          <span className="dot" />
          <span>{caption.badge}</span>
        </div>
        <div className="scene-stage">{scene}</div>
        <div className="scene-caption fade-swap">
          <h2 dangerouslySetInnerHTML={{ __html: caption.title }} />
          <p>{caption.body}</p>
        </div>
      </div>
    </div>
  )
}
