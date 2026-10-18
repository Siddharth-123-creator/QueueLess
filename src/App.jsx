
import { useState } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import './App.css'
import FindDoctors from './FindDoctors.jsx'
import EmergencyRegistration from './EmergencyRegistration.jsx'
import DoctorRegistration from './DoctorRegistration.jsx'
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
          <Link to="/doctors">Find Doctors & Clinics</Link>
        </div>

        <Link to="/patient" className="nav-button">
          Patient Portal ↗
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

            
<div className="hero-actions">
  <Link to="/patient" className="primary-button">
    Patient Portal <span>→</span>
  </Link>

  <Link to="/staff" className="secondary-button">
    Hospital Staff Portal <span>→</span>
  </Link>

  <Link to="/doctors" className="secondary-button">
    Find Doctors & Clinics <span>→</span>
  </Link>
</div>


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
  const [activeSection, setActiveSection] = useState('Overview')

  const menuItems = [
    'Overview',
    'Patient Queue',
    'Register Patient',
    'Access Codes & Slots',
    'Missed Token Policy',
    'Payments',
    'Hospital Settings',
  ]

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        background: '#f4f7fb',
        color: '#172b4d',
      }}
    >
      <aside
        style={{
          width: '250px',
          minWidth: '220px',
          background: '#102a43',
          color: 'white',
          padding: '24px 16px',
          boxSizing: 'border-box',
        }}
      >
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '23px',
            fontWeight: 'bold',
          }}
        >
          QueueLess
        </Link>

        <p style={{ color: '#b8c7d9', fontSize: '13px' }}>
          HOSPITAL STAFF PORTAL
        </p>

        <div style={{ marginTop: '32px' }}>
          {menuItems.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setActiveSection(item)
                setMessage(
                  item === 'Overview'
                    ? ''
                    : `${item} section will be connected next.`
                )
              }}
              style={{
                display: 'block',
                width: '100%',
                padding: '13px 12px',
                marginBottom: '7px',
                textAlign: 'left',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                color: 'white',
                background:
                  activeSection === item ? '#245b83' : 'transparent',
              }}
            >
              {item}
            </button>
          ))}

          <Link
            to="/staff/emergency"
            style={{
              display: 'block',
              padding: '13px 12px',
              marginTop: '14px',
              borderRadius: '8px',
              background: '#9f3038',
              color: 'white',
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
          >
            🚨 Emergency Registration
          </Link>
        </div>

        <Link
          to="/"
          style={{
            display: 'block',
            color: '#b8c7d9',
            marginTop: '32px',
            textDecoration: 'none',
          }}
        >
          ← Back to homepage
        </Link>
      </aside>

      <section
        style={{
          flex: 1,
          minWidth: 0,
          padding: '32px',
        }}
      >
        <p style={{ color: '#52677e' }}>QueueLess / Staff Portal</p>
        <h1 style={{ marginBottom: '8px' }}>{activeSection}</h1>

        <p style={{ color: '#52677e' }}>
          Manage your clinic queue and staff operations.
        </p>

        {message && (
          <p className="demo-note">{message}</p>
        )}

        {activeSection === 'Overview' && (
          <section
            style={{
              maxWidth: '600px',
              background: 'white',
              padding: '24px',
              marginTop: '24px',
              borderRadius: '14px',
              border: '1px solid #e2e8f0',
            }}
          >
            <h2>Find your clinic</h2>

            <p>
              Search for your hospital or clinic to begin the
              staff access process.
            </p>

            <form
              onSubmit={(event) => {
                event.preventDefault()

                if (hospital.trim().length < 3) {
                  setMessage('Please enter at least 3 characters.')
                  return
                }

                setMessage(
                  `Search entered for "${hospital.trim()}". Actual clinic search and staff verification will be connected later.`
                )
              }}
            >
              <label
                htmlFor="hospital-search"
                style={{ display: 'block', marginBottom: '8px' }}
              >
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
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '12px',
                  marginBottom: '14px',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                }}
              />

              <button type="submit">Search clinics →</button>
            </form>

            <p className="demo-note">
              Searching does not grant staff access. Clinic
              authorization will be required in the real system.
            </p>
          </section>
        )}

        {activeSection !== 'Overview' && (
          <section
            style={{
              marginTop: '24px',
              padding: '20px',
              background: 'white',
              borderRadius: '12px',
            }}
          >
            <p>
              This dashboard section is a placeholder for now.
              We will implement its functionality step by step.
            </p>
          </section>
        )}
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
      <Route path="/doctors" element={<FindDoctors />} />
      <Route
  path="/staff/emergency"
  element={<EmergencyRegistration />}
/>
<Route
  path="/doctor-register"
  element={<DoctorRegistration />}
/>
    </Routes>
  )
}

export default App

