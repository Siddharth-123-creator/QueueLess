
import { useState } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import './App.css'

function Home() {
  return (
    <div className="app">
      <nav className="navbar">
        <Link to="/" className="brand">
          <span className="brand-icon">Q</span>
          QueueLess
        </Link>

        <div className="nav-links">
          <a href="#how-it-works">How It Works</a>
          <a href="#about">About</a>
        </div>

        <Link to="/patient" className="nav-button">
          Get Started ↗
        </Link>
      </nav>

      <main>
        <section className="hero" id="about">
          <div className="hero-content">
            <span className="eyebrow">
              SMARTER QUEUES. BETTER CARE.
            </span>

            <h1>
              Less waiting.
              <br />
              <span>More healing.</span>
            </h1>

            <p>
              Follow your clinic queue, see your current
              position and get an estimated waiting time
              without spending hours wondering when your
              turn will come.
            </p>

            <Link to="/patient" className="primary-button">
              Check Your Queue <span>→</span>
            </Link>

            <div className="trust-note">
              <span className="status-dot"></span>
              Clinic-controlled tokens. Clear queue updates.
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-glow"></div>

            <div className="queue-card">
              <div className="queue-card-top">
                <div>
                  <span className="small-label">
                    SAMPLE QUEUE PREVIEW
                  </span>
                  <h3>City Care Clinic</h3>
                </div>
                <span className="live-badge">DEMO</span>
              </div>

              <div className="token-box">
                <span className="small-label">
                  EXAMPLE TOKEN
                </span>
                <div className="token-number">A-024</div>
                <span className="token-caption">
                  Illustrative patient view
                </span>
              </div>

              <div className="queue-stats">
                <div>
                  <span className="small-label">
                    EXAMPLE CURRENT TOKEN
                  </span>
                  <strong>A-019</strong>
                </div>
                <div>
                  <span className="small-label">
                    PEOPLE AHEAD
                  </span>
                  <strong>5 patients</strong>
                </div>
              </div>

              <div className="wait-box">
                <div className="wait-icon">◷</div>
                <div>
                  <span className="small-label">
                    EXAMPLE WAIT ESTIMATE
                  </span>
                  <strong>~25 minutes</strong>
                </div>
              </div>

              <p className="demo-note">
                Sample data only — not a live clinic queue.
              </p>
            </div>
          </div>
        </section>

        <section className="features" id="how-it-works">
          <div className="section-heading">
            <span className="eyebrow">BUILT AROUND YOU</span>
            <h2>Healthcare without the queue confusion.</h2>
            <p>
              Know your position and understand what happens next.
            </p>
          </div>

          <div className="feature-grid">
            <article className="feature-card">
              <div className="feature-icon">01</div>
              <h3>Queue Tracking</h3>
              <p>
                Follow the current token and your position
                in the clinic queue.
              </p>
            </article>

            <article className="feature-card">
              <div className="feature-icon">02</div>
              <h3>AI Wait Prediction</h3>
              <p>
                Planned estimates based on consultation
                durations and queue progress.
              </p>
            </article>

            <article className="feature-card">
              <div className="feature-icon">03</div>
              <h3>Staff-Controlled Tokens</h3>
              <p>
                Clinic staff register patients and issue
                tokens. Patients cannot self-book.
              </p>
            </article>
          </div>
        </section>

        <section className="get-started" id="get-started">
          <span className="eyebrow">GET STARTED</span>
          <h2>Choose your experience.</h2>
          <p>
            Patients and hospital staff have separate portals.
          </p>

          <div className="role-grid">
            <Link to="/patient" className="role-card">
              <span className="role-symbol">＋</span>
              <div>
                <h3>I'm a Patient</h3>
                <p>View queue information using your clinic code.</p>
              </div>
              <span className="role-arrow">→</span>
            </Link>

            <Link to="/staff" className="role-card">
              <span className="role-symbol">✚</span>
              <div>
                <h3>I'm Hospital Staff</h3>
                <p>Find your clinic and request staff access.</p>
              </div>
              <span className="role-arrow">→</span>
            </Link>
          </div>
        </section>
      </main>

      <footer className="footer">
        <Link to="/" className="brand">
          <span className="brand-icon">Q</span>
          QueueLess
        </Link>
        <span>Smarter queues. Better care.</span>
      </footer>
    </div>
  )
}


function Patient() {
  const [clinicCode, setClinicCode] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (clinicCode.trim().length < 4) {
      setMessage('Please enter a code with at least 4 characters.')
      return
    }

    setMessage(
      'Code entered! Actual clinic verification will be added later.'
    )
  }

  return (
    <main className="portal">
      <Link to="/" className="brand">
        <span className="brand-icon">Q</span>
        QueueLess
      </Link>

      <section className="portal-card">
        <span className="eyebrow">PATIENT PORTAL</span>
        <h1>Find your queue</h1>

        <p>
          Enter the access code provided by your clinic.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="clinic-code">Clinic access code</label>

          <input
            id="clinic-code"
            value={clinicCode}
            onChange={(event) => {
              setClinicCode(event.target.value)
              setMessage('')
            }}
            placeholder="Enter clinic code"
            required
          />

          <button type="submit">Continue →</button>
        </form>

        {message && <p className="demo-note">{message}</p>}

        <p className="demo-note">
          Only clinic staff can register patients and assign tokens.
        </p>

        <Link to="/">← Back to homepage</Link>
      </section>
    </main>
  )
}



function Staff() {
  const [hospital, setHospital] = useState('')
  const [message, setMessage] = useState('')

  function handleSearch(event) {
    event.preventDefault()

    if (hospital.trim().length < 3) {
      setMessage('Please enter at least 3 characters.')
      return
    }

    setMessage(
      `Search entered for "${hospital.trim()}". Actual clinic search and staff verification will be connected later.`
    )
  }

  return (
    <main className="portal">
      <Link to="/" className="brand">
        <span className="brand-icon">Q</span>
        QueueLess
      </Link>

      <section className="portal-card">
        <span className="eyebrow">HOSPITAL STAFF PORTAL</span>
        <h1>Find your clinic</h1>

        <p>
          Search for your hospital or clinic to begin the
          staff access process.
        </p>

        <form onSubmit={handleSearch}>
          <label htmlFor="hospital-search">
            Hospital or clinic name
          </label>

          <input
            id="hospital-search"
            value={hospital}
            onChange={(event) => {
              setHospital(event.target.value)
              setMessage('')
            }}
            placeholder="e.g. City Care Clinic"
            required
          />

          <button type="submit">Search clinics →</button>
        </form>

        {message && <p className="demo-note">{message}</p>}

        <p className="demo-note">
          Searching does not grant access. Staff must be
          verified and authorized by the clinic.
        </p>

        <Link to="/">← Back to homepage</Link>
      </section>
    </main>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/patient" element={<Patient />} />
      <Route path="/staff" element={<Staff />} />
    </Routes>
  )
}

export default App
