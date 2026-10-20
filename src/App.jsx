
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link, Routes, Route } from 'react-router-dom'
import './App.css'
import FindDoctors from './FindDoctors.jsx'
import EmergencyRegistration from './EmergencyRegistration.jsx'
import DoctorRegistration from './DoctorRegistration.jsx'
import RegisterHospital from './RegisterHospital'
import QueueAssistant from "./QueueAssistant";
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
  <Link to="/doctors" className="nav-doctors-button">
    Find Doctors & Clinics <span>→</span>
  </Link>
  <Link to="/register-hospital" className="nav-button">
  Register Hospital →
</Link>
</div>


        
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
  const navigate = useNavigate()
  const [clinicCode, setClinicCode] = useState('')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
const [showQueue, setShowQueue] = useState(false)
const [mobileNumber, setMobileNumber] = useState('')
 function handleSubmit(event) {
  event.preventDefault()

  const code = clinicCode.trim()
  const mobile = mobileNumber.trim()

  if (code.length < 4) {
    setIsError(true)
    setMessage('Please enter a valid doctor code.')
    setShowQueue(false)
    return
  }

  if (!/^[0-9]{10}$/.test(mobile)) {
    setIsError(true)
    setMessage('Please enter a valid 10-digit mobile number.')
    setShowQueue(false)
    return
  }

setIsError(false)
setMessage('')
navigate('/patient/dashboard')
}

  return (
    <main className="patient-page">
      <header className="patient-header">
        <Link to="/" className="brand">
          <span className="brand-icon">Q</span>
          QueueLess
        </Link>

        <span className="patient-header-label">
          PATIENT PORTAL
        </span>
      </header>

      <section className="patient-main">
        <div className="patient-intro">
          <span className="eyebrow">YOUR CARE, WITHOUT THE GUESSWORK</span>

          <h1>
            Your queue.
            <br />
            <span>Your time.</span>
          </h1>

          <p>
            Check your clinic queue and estimated waiting time
            using the access code provided by your clinic.
          </p>

          <div className="patient-benefits">
            <div>
              <span className="patient-benefit-icon">✓</span>
              See your queue position
            </div>
            <div>
              <span className="patient-benefit-icon">◷</span>
              Check estimated waiting time
            </div>
            <div>
              <span className="patient-benefit-icon">✓</span>
              Tokens assigned by clinic staff
            </div>
          </div>
        </div>

        <section className="patient-access-card">
          <div className="patient-card-icon">↗</div>

          <span className="eyebrow">PATIENT ACCESS</span>
          <h2>Find your queue</h2>

          <p>
            Enter the unique access code shared by your hospital
            or clinic to continue.
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="clinic-code">
              Clinic access code
            </label>

            <input
              id="clinic-code"
              value={clinicCode}
              onChange={(event) => {
                setClinicCode(event.target.value)
                setMessage('')
                setIsError(false)
              }}
              placeholder="e.g. CITY-482"
              autoComplete="off"
              required
            />

           
            <label htmlFor="patient-mobile">
  Registered mobile number
</label>

<input
  id="patient-mobile"
  type="tel"
  value={mobileNumber}
  onChange={(event) => setMobileNumber(event.target.value)}
  placeholder="Enter your registered mobile number"
  autoComplete="tel"
  required
/>
 <button type="submit">
              Find my queue <span>→</span>
            </button>
          </form>
{showQueue && (
  <section className="patient-dashboard">
    <div className="dashboard-heading">
      <span className="eyebrow">YOUR QUEUE DASHBOARD</span>
      <h2>City Care Clinic</h2>
      <p>Demo queue data · Not a live clinic queue</p>
    </div>

    <div className="patient-token-card">
      <span>YOUR TOKEN</span>
      <strong>A-024</strong>
      <p>Token assigned by clinic staff</p>
    </div>

    <div className="patient-queue-stats">
      <div>
        <span>Current token</span>
        <strong>A-019</strong>
      </div>

      <div>
        <span>People ahead</span>
        <strong>5 patients</strong>
      </div>
    </div>

    <div className="patient-wait-card">
      <span>AI-ESTIMATED WAIT</span>
      <strong>~25 minutes</strong>
      <p>Illustrative estimate only; actual waiting time may vary.</p>
    </div>

    <div className="patient-payment-card">
      <span>Payment status</span>
      <strong>Pending confirmation</strong>
    </div>

    <button
      type="button"
      onClick={() => {
        setShowQueue(false)
        setMessage('')
      }}
    >
      ← Back to access code
    </button>
  </section>
)}

          {message && (
            <p
              className={`patient-message ${isError ? 'error' : ''}`}
              role="status"
            >
              {message}
            </p>
          )}

          <div className="patient-security-note">
            <span>🔒</span>
            Your token is assigned by clinic staff.
          </div>
        </section>
      </section>

      <footer className="patient-footer">
        <Link to="/">← Back to homepage</Link>
        <span>QueueLess · Smarter queues. Better care.</span>
      </footer>
    </main>
  )
}

function PatientDashboard() {
  return (
    <main className="qd-page">
      <header className="qd-topbar">
        <Link to="/" className="qd-brand">
          <span className="qd-brand-icon">Q</span>
          <span>QueueLess</span>
        </Link>

        <div className="qd-demo-indicator">
          <span className="qd-status-dot" />
          DEMO QUEUE
        </div>

        <Link to="/patient" className="qd-exit">
          Patient Portal <span>↗</span>
        </Link>
      </header>

      <section className="qd-main">
        <div className="qd-heading">
          <div>
            <span className="qd-eyebrow">
              PATIENT PORTAL / MY QUEUE
            </span>
            <h1>Your care, <span>in progress.</span></h1>
            <p>Know your position. Make your time count.</p>
          </div>

          <div className="qd-clinic">
            <div className="qd-clinic-avatar">CC</div>
            <div>
              <strong>City Care Clinic</strong>
              <span>General consultation</span>
            </div>
          </div>
        </div>

   
<div className="qd-primary-grid">
  <section className="qd-token-panel qd-combined-token-panel">
    <div className="qd-panel-top">
      <span className="qd-panel-label">YOUR QUEUE</span>
      <span className="qd-token-badge">DEMO</span>
    </div>

    <div className="qd-token-comparison">
      <div className="qd-token-side">
        <span className="qd-small-label">YOUR TOKEN</span>
        <div className="qd-token-number">A-024</div>
        <span className="qd-token-caption">Assigned by clinic staff</span>
      </div>

      <div className="qd-token-separator" />

      <div className="qd-token-side">
        <span className="qd-small-label">NOW SERVING</span>
        <div className="qd-current-number">A-019</div>
        <span className="qd-token-caption">Current queue token</span>
      </div>
    </div>

    <div className="qd-token-divider" />

    <div className="qd-progress-heading">
      <span>QUEUE PROGRESS</span>
      <strong>5 people ahead</strong>
    </div>

    <div className="qd-progress-track">
      <div className="qd-progress-fill" />
    </div>

    <div className="qd-progress-footer">
      <span>Queue moving</span>
      <span>Sample data</span>
    </div>
  </section>

  <section className="qd-info-card qd-wait-card qd-wait-side-panel">
    <div className="qd-info-icon">◷</div>
    <div className="qd-info-content">
      <span className="qd-info-label">AI WAIT ESTIMATE</span>
      <strong>~25 <small>min</small></strong>
      <p>Illustrative estimate. Actual waiting time may vary.</p>
    </div>
    <span className="qd-ai-mark">AI</span>
  </section>
</div>


        <div className="qd-info-grid">
          

          <section className="qd-info-card">
            <div className="qd-info-icon qd-payment-icon">₹</div>
            <div className="qd-info-content">
              <span className="qd-info-label">PAYMENT STATUS</span>
              <strong className="qd-payment-status">
                Pending confirmation
              </strong>
              <p>Check with clinic staff for payment updates.</p>
            </div>
          </section>

          <section className="qd-info-card">
            <div className="qd-info-icon qd-update-icon">↗</div>
            <div className="qd-info-content">
              <span className="qd-info-label">QUEUE UPDATES</span>
              <strong className="qd-update-title">Stay informed</strong>
              <p>Live notifications will be available when connected.</p>
            </div>
          </section>
        </div>

        <footer className="qd-footer">
          <span><span className="qd-footer-dot" /> QueueLess · Smarter queues. Better care.</span>
          <span>Demo preview — not live patient data</span>
        </footer>
      </section>
    </main>
  )
}


const staffInputStyle = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '12px',
  border: '1px solid #cbd5e1',
  borderRadius: '8px',
  fontSize: '14px',
  outlineColor: '#147d72',
}


function Staff() {
  const [staffName, setStaffName] = useState('')
  const [doctorCode, setDoctorCode] = useState('')
  const [secretPassword, setSecretPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [activeSection, setActiveSection] = useState('Overview')
  const [message, setMessage] = useState('')

  const [hospital, setHospital] = useState({
    name: 'QueueLess Clinic',
    doctor: 'Dr. Rahul Sharma',
    fee: '500',
    prefix: 'A',
    openingTime: '09:00',
    closingTime: '17:00',
  })

  
  const [patients, setPatients] = useState(() => {
    const patientDetails = [
      ['Aarav Sharma', 'General consultation'],
      ['Priya Verma', 'Fever'],
      ['Rohan Gupta', 'Regular checkup'],
      ['Ananya Singh', 'Headache'],
      ['Vivek Kumar', 'Blood pressure'],
      ['Neha Agarwal', 'General consultation'],
      ['Arjun Mehta', 'Stomach pain'],
      ['Ishita Jain', 'Follow-up'],
      ['Karan Malhotra', 'Fever'],
      ['Rahul Mishra', 'General consultation'],
      ['Sneha Yadav', 'Cough and cold'],
      ['Aditya Sinha', 'Regular checkup'],
      ['Pooja Chauhan', 'Headache'],
      ['Mohit Saxena', 'Follow-up'],
      ['Kavya Kapoor', 'General consultation'],
      ['Yash Tiwari', 'Fever'],
      ['Simran Kaur', 'Regular checkup'],
      ['Dev Patel', 'Stomach pain'],
      ['Meera Joshi', 'Follow-up'],
      ['Sahil Arora', 'Cough and cold'],
      ['Riya Das', 'General consultation'],
      ['Aman Bansal', 'Fever'],
      ['Nisha Roy', 'Regular checkup'],
      ['Varun Khanna', 'Headache'],
      ['Diya Pandey', 'Follow-up'],
      ['Harsh Jain', 'General consultation'],
      ['Tanya Sethi', 'Cough and cold'],
      ['Abhishek Rao', 'Regular checkup'],
      ['Muskan Ali', 'Fever'],
      ['Ritik Sharma', 'General consultation'],
    ]

    return patientDetails.map(([name, reason], index) => {
      const tokenNumber = index + 1
      let status = 'Waiting'

      if (tokenNumber <= 9 || (tokenNumber >= 11 && tokenNumber <= 14)) {
        status = 'Completed'
      } else if (tokenNumber === 10) {
        status = 'Missed'
      } else if (tokenNumber === 15) {
        status = 'Serving'
      }

      return {
        id: `seed-${tokenNumber}`,
        name,
        phone: String(9000000000 + tokenNumber),
        age: '',
        reason,
        token: `${hospital.prefix}-${String(tokenNumber).padStart(3, '0')}`,
        tokenNumber,
        accessCode: `QL${String(tokenNumber).padStart(4, '0')}`,
        status,
        paymentStatus: tokenNumber % 3 === 0 ? 'Unpaid' : 'Paid',
        paymentMethod: 'Cash',
        fee: Number(hospital.fee) || 500,
        missedAtCompleted: tokenNumber === 10 ? 13 : null,
        registeredAt: '09:00 AM',
      }
    })
  })

  const [nextTokenNumber, setNextTokenNumber] = useState(31)
  const [currentToken, setCurrentToken] = useState('seed-15')


  const [missedGap, setMissedGap] = useState(10)
  const [searchText, setSearchText] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const [form, setForm] = useState({
    name: '',
    phone: '',
    age: '',
    reason: '',
    paymentStatus: 'Unpaid',
    paymentMethod: 'Cash',
  })

  const menuItems = [
    'Overview',
    'Patient Queue',
    'Register Patient',
    'Missed Token Policy',
    'Payments',
    'Hospital Settings',
  ]

  const styles = {
    page: {
      minHeight: '100vh',
      display: 'flex',
      background: '#f4f7fb',
      color: '#172b4d',
      fontFamily: 'Arial, sans-serif',
    },
    sidebar: {
      width: '245px',
      minWidth: '220px',
      background: '#102a43',
      color: 'white',
      padding: '24px 16px',
      boxSizing: 'border-box',
    },
    content: {
      flex: 1,
      minWidth: 0,
      padding: '28px',
      boxSizing: 'border-box',
    },
    panel: {
      background: 'white',
      border: '1px solid #e2e8f0',
      borderRadius: '16px',
      padding: '22px',
      boxShadow: '0 5px 18px rgba(16,42,67,0.04)',
      boxSizing: 'border-box',
      minWidth: 0,
    },
    input: {
      width: '100%',
      padding: '12px',
      border: '1px solid #cbd5e1',
      borderRadius: '9px',
      fontSize: '14px',
      boxSizing: 'border-box',
      background: 'white',
      color: '#172b4d',
    },
    button: {
      padding: '11px 15px',
      background: '#147d72',
      color: 'white',
      border: 'none',
      borderRadius: '9px',
      cursor: 'pointer',
      fontWeight: 700,
    },
    secondaryButton: {
      padding: '9px 12px',
      background: '#edf5f4',
      color: '#12675f',
      border: '1px solid #cfe5e1',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: 600,
    },
    label: {
      display: 'block',
      fontSize: '13px',
      fontWeight: 700,
      marginBottom: '7px',
      color: '#40566d',
    },
    field: {
      marginBottom: '17px',
    },
    muted: {
      color: '#64748b',
      fontSize: '13px',
      lineHeight: 1.6,
    },
    tableWrap: {
      width: '100%',
      overflowX: 'auto',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      textAlign: 'left',
      fontSize: '13px',
      minWidth: '700px',
    },
    th: {
      padding: '13px 12px',
      background: '#f3f7fa',
      color: '#52677e',
      borderBottom: '1px solid #e2e8f0',
      whiteSpace: 'nowrap',
    },
    td: {
      padding: '13px 12px',
      borderBottom: '1px solid #edf1f5',
      verticalAlign: 'middle',
    },
  }

  const completedCount = patients.filter(
    (patient) => patient.status === 'Completed'
  ).length

  const waitingCount = patients.filter(
    (patient) => patient.status === 'Waiting'
  ).length

  const missedCount = patients.filter(
    (patient) => patient.status === 'Missed'
  ).length

  const paidCount = patients.filter(
    (patient) => patient.paymentStatus === 'Paid'
  ).length

  const currentPatient = patients.find(
    (patient) => patient.id === currentToken
  )

  function showMessage(text) {
    setMessage(text)
  }

  function handleLogin(event) {
    event.preventDefault()

    if (staffName.trim().length < 2) {
      showMessage('Please enter your full name.')
      return
    }

    if (
      doctorCode.trim() !== 'DOC101' ||
      secretPassword !== 'QL2026SAFE'
    ) {
      showMessage('Incorrect doctor code or password.')
      return
    }

    setMessage('')
    setIsLoggedIn(true)
  }

  function registerPatient(event) {
    event.preventDefault()

    if (!form.name.trim() || !form.phone.trim()) {
      showMessage('Patient name and phone number are required.')
      return
    }

    if (!/^[0-9]{10}$/.test(form.phone.trim())) {
      showMessage('Enter a valid 10-digit phone number.')
      return
    }

    if (patients.some((p) => p.phone === form.phone.trim())) {
      showMessage('This phone number is already registered.')
      return
    }

    const tokenNumber = nextTokenNumber
    const token =
      `${hospital.prefix}-${String(tokenNumber).padStart(3, '0')}`

    const accessCode = Math.random()
      .toString(36)
      .slice(2, 8)
      .toUpperCase()

    const newPatient = {
      id: `${Date.now()}-${tokenNumber}`,
      name: form.name.trim(),
      phone: form.phone.trim(),
      age: form.age,
      reason: form.reason.trim(),
      token,
      tokenNumber,
      accessCode,
      status: 'Waiting',
      paymentStatus: form.paymentStatus,
      paymentMethod: form.paymentMethod,
      fee: Number(hospital.fee) || 0,
      missedAtCompleted: null,
      registeredAt: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }

    setPatients((previous) => [...previous, newPatient])
    setNextTokenNumber((previous) => previous + 1)

    setForm({
      name: '',
      phone: '',
      age: '',
      reason: '',
      paymentStatus: 'Unpaid',
      paymentMethod: 'Cash',
    })

    setMessage(
      `Patient registered successfully. Token: ${token}. Access code: ${accessCode}.`
    )
    setActiveSection('Patient Queue')
  }

  function updatePatient(patientId, updates) {
    setPatients((previous) =>
      previous.map((patient) =>
        patient.id === patientId
          ? { ...patient, ...updates }
          : patient
      )
    )
  }

  function callNextPatient() {
    const nextPatient = patients.find(
      (patient) => patient.status === 'Waiting'
    )

    if (!nextPatient) {
      showMessage('There are no waiting patients in the queue.')
      return
    }

    setPatients((previous) =>
      previous.map((patient) => {
        if (patient.id === currentToken && patient.status === 'Serving') {
          return { ...patient, status: 'Completed' }
        }

        if (patient.id === nextPatient.id) {
          return { ...patient, status: 'Serving' }
        }

        return patient
      })
    )

    setCurrentToken(nextPatient.id)
    showMessage(`Now serving ${nextPatient.token}.`)
  }

  function markCompleted(patient) {
    updatePatient(patient.id, { status: 'Completed' })

    if (currentToken === patient.id) {
      setCurrentToken(null)
    }

    showMessage(`${patient.token} marked as completed.`)
  }

  function markMissed(patient) {
    updatePatient(patient.id, {
      status: 'Missed',
      missedAtCompleted: completedCount,
    })

    if (currentToken === patient.id) {
      setCurrentToken(null)
    }

    showMessage(`${patient.token} marked as missed.`)
  }

  function rejoinQueue(patient) {
    const completedSinceMissed =
      completedCount - (patient.missedAtCompleted ?? completedCount)

    if (completedSinceMissed < Number(missedGap)) {
      showMessage(
        `${patient.token} must wait until ${missedGap} more patients have been completed.`
      )
      return
    }

    updatePatient(patient.id, {
      status: 'Waiting',
      missedAtCompleted: null,
    })

    showMessage(`${patient.token} has rejoined the queue.`)
  }

  function changePayment(patient, paymentStatus) {
    updatePatient(patient.id, { paymentStatus })
    showMessage(
      `${patient.token} payment status updated to ${paymentStatus}.`
    )
  }

  function changeSection(section) {
    setActiveSection(section)
    setMessage('')
  }

  function statusColor(status) {
    if (status === 'Completed') return '#166534'
    if (status === 'Serving') return '#075985'
    if (status === 'Missed') return '#b42318'
    return '#92400e'
  }

  function statusBackground(status) {
    if (status === 'Completed') return '#dcfce7'
    if (status === 'Serving') return '#e0f2fe'
    if (status === 'Missed') return '#fee2e2'
    return '#fef3c7'
  }

  function badge(status) {
    return (
      <span
        style={{
          display: 'inline-block',
          padding: '5px 9px',
          borderRadius: '20px',
          background: statusBackground(status),
          color: statusColor(status),
          fontSize: '12px',
          fontWeight: 700,
          whiteSpace: 'nowrap',
        }}
      >
        {status}
      </span>
    )
  }

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchText.toLowerCase()) ||
      patient.phone.includes(searchText) ||
      patient.token.toLowerCase().includes(searchText.toLowerCase())

    const matchesStatus =
      statusFilter === 'All' || patient.status === statusFilter

    return matchesSearch && matchesStatus
  })

  function renderPatientTable(list, showQueueActions = true) {
    if (list.length === 0) {
      return (
        <div
          style={{
            padding: '32px 12px',
            textAlign: 'center',
            color: '#64748b',
          }}
        >
          <div style={{ fontSize: '30px', marginBottom: '8px' }}>☷</div>
          <strong>No patients found</strong>
          <p style={styles.muted}>
            Register a patient to see their details here.
          </p>
        </div>
      )
    }

    return (
      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Token</th>
              <th style={styles.th}>Patient</th>
              <th style={styles.th}>Visit reason</th>
              <th style={styles.th}>Queue status</th>
              <th style={styles.th}>Payment</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((patient) => (
              <tr key={patient.id}>
                <td style={styles.td}>
                  <strong>{patient.token}</strong>
                  <div style={{ ...styles.muted, fontSize: '11px' }}>
                    {patient.registeredAt}
                  </div>
                </td>
                <td style={styles.td}>
                  <strong>{patient.name}</strong>
                  <div style={{ ...styles.muted, fontSize: '11px' }}>
                    {patient.phone}
                  </div>
                </td>
                <td style={styles.td}>
                  {patient.reason || 'Not specified'}
                </td>
                <td style={styles.td}>{badge(patient.status)}</td>
                <td style={styles.td}>
                  {badge(patient.paymentStatus)}
                </td>
                <td style={styles.td}>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '6px',
                      minWidth: '130px',
                    }}
                  >
                    {showQueueActions && patient.status === 'Waiting' && (
                      <button
                        type="button"
                        style={styles.secondaryButton}
                        onClick={() => {
                          setPatients((previous) =>
                            previous.map((p) => {
                              if (
                                p.id === currentToken &&
                                p.status === 'Serving'
                              ) {
                                return { ...p, status: 'Waiting' }
                              }

                              if (p.id === patient.id) {
                                return { ...p, status: 'Serving' }
                              }

                              return p
                            })
                          )
                          setCurrentToken(patient.id)
                          showMessage(`Now serving ${patient.token}.`)
                        }}
                      >
                        Call
                      </button>
                    )}

                    {showQueueActions && patient.status === 'Serving' && (
                      <button
                        type="button"
                        style={styles.secondaryButton}
                        onClick={() => markCompleted(patient)}
                      >
                        Complete
                      </button>
                    )}

                    {showQueueActions &&
                      (patient.status === 'Waiting' ||
                        patient.status === 'Serving') && (
                        <button
                          type="button"
                          style={{
                            ...styles.secondaryButton,
                            color: '#b42318',
                            background: '#fff1f0',
                            borderColor: '#ffd5d2',
                          }}
                          onClick={() => markMissed(patient)}
                        >
                          Missed
                        </button>
                      )}

                    {patient.status === 'Missed' && (
                      <button
                        type="button"
                        style={styles.secondaryButton}
                        onClick={() => rejoinQueue(patient)}
                      >
                        Rejoin queue
                      </button>
                    )}

                    {!showQueueActions && (
                      <button
                        type="button"
                        style={styles.secondaryButton}
                        onClick={() =>
                          changePayment(
                            patient,
                            patient.paymentStatus === 'Paid'
                              ? 'Unpaid'
                              : 'Paid'
                          )
                        }
                      >
                        Mark {patient.paymentStatus === 'Paid' ? 'Unpaid' : 'Paid'}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <main
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          boxSizing: 'border-box',
          background: '#f4f7fb',
          color: '#172b4d',
        }}
      >
       <section
  style={{
    ...styles.panel,
    width: '100%',
    maxWidth: '470px',
    minHeight: '600px',
    padding: '42px 38px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: '22px',
    boxShadow: '0 18px 48px rgba(16,42,67,0.10)',
  }}
>
          <Link
            to="/"
            style={{
              color: '#147d72',
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
          >
            ← QueueLess
          </Link>

          <p
            style={{
              marginTop: '28px',
              color: '#147d72',
              fontSize: '12px',
              fontWeight: 'bold',
              letterSpacing: '1.5px',
            }}
          >
            HOSPITAL STAFF PORTAL
          </p>

          <h1 style={{ marginBottom: '8px' }}>Staff Login</h1>
          <p style={styles.muted}>
            Enter your staff details to access the clinic dashboard.
          </p>

          <form onSubmit={handleLogin}>
            <div style={styles.field}>
              <label style={styles.label} htmlFor="staff-name">
                Staff name
              </label>
              <input
                id="staff-name"
                style={styles.input}
                value={staffName}
                onChange={(e) => setStaffName(e.target.value)}
                placeholder="Enter your name"
                autoComplete="name"
                required
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label} htmlFor="doctor-code">
                Doctor code
              </label>
              <input
                id="doctor-code"
                style={styles.input}
                value={doctorCode}
                onChange={(e) => setDoctorCode(e.target.value)}
                placeholder="e.g. DOC101"
                autoComplete="off"
                required
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label} htmlFor="staff-password">
                Hospital password
              </label>
              <input
                id="staff-password"
                type="password"
                style={styles.input}
                value={secretPassword}
                onChange={(e) => setSecretPassword(e.target.value)}
                placeholder="e.g. QL2026SAFE"
                autoComplete="current-password"
                required
              />
            </div>

            {message && (
              <p role="alert" style={{ color: '#b42318', fontSize: '13px' }}>
                {message}
              </p>
            )}

            <button type="submit" style={{ ...styles.button, width: '100%', marginTop: '8px' }}>
              Access Staff Dashboard →
            </button>
          </form>
        </section>
      </main>
    )
  }

  return (
    <main style={styles.page}>
      <aside style={styles.sidebar}>
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

        <p style={{ color: '#b8c7d9', fontSize: '12px', marginTop: '8px' }}>
          HOSPITAL STAFF PORTAL
        </p>

        <p style={{ color: '#b8c7d9', fontSize: '13px' }}>
          Signed in as {staffName}
        </p>

        <nav style={{ marginTop: '24px' }}>
          {menuItems.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => changeSection(item)}
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
                fontWeight: activeSection === item ? 700 : 400,
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
        </nav>

        <button
          type="button"
          onClick={() => {
            setIsLoggedIn(false)
            setStaffName('')
            setDoctorCode('')
            setSecretPassword('')
            setMessage('')
            setActiveSection('Overview')
          }}
          style={{
            ...styles.secondaryButton,
            width: '100%',
            marginTop: '28px',
            background: 'transparent',
            borderColor: '#52677e',
            color: 'white',
          }}
        >
          Log out
        </button>

        <Link
          to="/"
          style={{
            display: 'block',
            color: '#b8c7d9',
            marginTop: '20px',
            textDecoration: 'none',
          }}
        >
          ← Back to homepage
        </Link>
      </aside>

      <section style={styles.content}>
        <p style={{ color: '#52677e', fontSize: '13px' }}>
          QueueLess / Staff Portal / {activeSection}
        </p>

        {message && (
          <div
            role="status"
            style={{
              margin: '14px 0',
              padding: '12px 15px',
              borderRadius: '10px',
              background: '#e7f6f1',
              color: '#12675f',
              border: '1px solid #c9e9df',
              fontSize: '14px',
              overflowWrap: 'anywhere',
            }}
          >
            {message}
          </div>
        )}

        {activeSection === 'Overview' && (
          <div style={{ marginTop: '22px' }}>
            <h1 style={{ fontSize: '30px', marginBottom: '6px' }}>
              Welcome, {staffName}
            </h1>
            <p style={styles.muted}>
              Here is the current status of your clinic.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))',
                gap: '16px',
                marginTop: '24px',
              }}
            >
              {[
                { label: 'Total Patients', value: patients.length, icon: '👥' },
                { label: 'Waiting Patients', value: waitingCount, icon: '⏳' },
                {
                  label: 'Now Serving',
                  value: currentPatient?.token || '—',
                  icon: '🎫',
                },
                { label: 'Completed', value: completedCount, icon: '✓' },
              ].map((card) => (
                <div key={card.label} style={styles.panel}>
                  <div style={{ fontSize: '25px' }}>{card.icon}</div>
                  <p style={styles.muted}>{card.label}</p>
                  <h2 style={{ fontSize: '28px', margin: '8px 0' }}>
                    {card.value}
                  </h2>
                </div>
              ))}
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '18px',
                marginTop: '22px',
              }}
            >
              <div style={styles.panel}>
                <h2 style={{ marginTop: 0 }}>Queue Snapshot</h2>
                <p style={styles.muted}>Patient queue progress</p>
                <div
                  style={{
                    height: '10px',
                    borderRadius: '20px',
                    background: '#e5edf2',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${
                        patients.length
                          ? (completedCount / patients.length) * 100
                          : 0
                      }%`,
                      background: '#147d72',
                    }}
                  />
                </div>
                <p style={styles.muted}>
                  {completedCount} completed out of {patients.length} registered
                </p>
                <p style={styles.muted}>
                  {missedCount} missed · {waitingCount} waiting
                </p>
              </div>

              <div style={styles.panel}>
                <h2 style={{ marginTop: 0 }}>Quick Actions</h2>
                {[
                  ['Register a Patient', 'Register Patient'],
                  ['View Patient Queue', 'Patient Queue'],
                  ['Review Missed Tokens', 'Missed Token Policy'],
                  ['Manage Payments', 'Payments'],
                ].map(([label, section]) => (
                  <button
                    key={section}
                    type="button"
                    onClick={() => changeSection(section)}
                    style={{
                      ...styles.secondaryButton,
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      marginTop: '10px',
                      padding: '13px',
                    }}
                  >
                    {label} →
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'Patient Queue' && (
          <div style={{ marginTop: '22px' }}>
            <h1>Patient Queue</h1>
            <p style={styles.muted}>
              Search patients and manage the live queue.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
                gap: '14px',
                margin: '20px 0',
              }}
            >
              <div style={styles.panel}>
                <p style={styles.muted}>Waiting</p>
                <h2>{waitingCount}</h2>
              </div>
              <div style={styles.panel}>
                <p style={styles.muted}>Serving</p>
                <h2>{patients.filter((p) => p.status === 'Serving').length}</h2>
              </div>
              <div style={styles.panel}>
                <p style={styles.muted}>Missed</p>
                <h2>{missedCount}</h2>
              </div>
            </div>

            <div style={{ ...styles.panel, marginBottom: '18px' }}>
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                }}
              >
                <input
                  style={{ ...styles.input, flex: '1 1 220px' }}
                  placeholder="Search name, phone or token"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />

                <select
                  style={{ ...styles.input, width: 'auto', minWidth: '150px' }}
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  {['All', 'Waiting', 'Serving', 'Completed', 'Missed'].map(
                    (status) => (
                      <option key={status} value={status}>
                        {status} status
                      </option>
                    )
                  )}
                </select>

                <button
                  type="button"
                  style={styles.button}
                  onClick={callNextPatient}
                >
                  Call Next Patient
                </button>

                <button
                  type="button"
                  style={styles.secondaryButton}
                  onClick={() => changeSection('Register Patient')}
                >
                  + Register Patient
                </button>
              </div>
            </div>

            <div style={styles.panel}>
              {renderPatientTable(filteredPatients, true)}
            </div>
          </div>
        )}

        {activeSection === 'Register Patient' && (
          <div style={{ marginTop: '22px', maxWidth: '850px' }}>
            <h1>Register Patient</h1>
            <p style={styles.muted}>
              Enter patient details to assign a queue token.
            </p>

            <form
              style={{ ...styles.panel, marginTop: '20px' }}
              onSubmit={registerPatient}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '16px',
                }}
              >
                <div style={styles.field}>
                  <label style={styles.label} htmlFor="patient-name">
                    Patient full name *
                  </label>
                  <input
                    id="patient-name"
                    style={styles.input}
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div style={styles.field}>
                  <label style={styles.label} htmlFor="patient-phone">
                    Mobile number *
                  </label>
                  <input
                    id="patient-phone"
                    style={styles.input}
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    placeholder="10-digit mobile number"
                    inputMode="numeric"
                    maxLength={10}
                    required
                  />
                </div>

                <div style={styles.field}>
                  <label style={styles.label} htmlFor="patient-age">
                    Age
                  </label>
                  <input
                    id="patient-age"
                    type="number"
                    min="0"
                    max="120"
                    style={styles.input}
                    value={form.age}
                    onChange={(e) =>
                      setForm({ ...form, age: e.target.value })
                    }
                    placeholder="Patient age"
                  />
                </div>

                <div style={styles.field}>
                  <label style={styles.label} htmlFor="visit-reason">
                    Reason for visit
                  </label>
                  <input
                    id="visit-reason"
                    style={styles.input}
                    value={form.reason}
                    onChange={(e) =>
                      setForm({ ...form, reason: e.target.value })
                    }
                    placeholder="e.g. General consultation"
                  />
                </div>

                <div style={styles.field}>
                  <label style={styles.label} htmlFor="payment-status">
                    Payment status
                  </label>
                  <select
                    id="payment-status"
                    style={styles.input}
                    value={form.paymentStatus}
                    onChange={(e) =>
                      setForm({ ...form, paymentStatus: e.target.value })
                    }
                  >
                    <option value="Unpaid">Unpaid</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>

                <div style={styles.field}>
                  <label style={styles.label} htmlFor="payment-method">
                    Payment method
                  </label>
                  <select
                    id="payment-method"
                    style={styles.input}
                    value={form.paymentMethod}
                    onChange={(e) =>
                      setForm({ ...form, paymentMethod: e.target.value })
                    }
                  >
                    <option>Cash</option>
                    <option>UPI</option>
                    <option>Card</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div
                style={{
                  padding: '14px',
                  background: '#f0f9f7',
                  borderRadius: '10px',
                  marginBottom: '18px',
                  color: '#12675f',
                  fontSize: '13px',
                }}
              >
                Token and access code will be generated automatically after
                registration. Consultation fee: ₹{hospital.fee || 0}.
              </div>

              <button type="submit" style={styles.button}>
                Register Patient & Assign Token
              </button>
            </form>
          </div>
        )}

        {activeSection === 'Missed Token Policy' && (
          <div style={{ marginTop: '22px' }}>
            <h1>Missed Token Policy</h1>
            <p style={styles.muted}>
              Set how many patients must be completed before a missed patient
              can rejoin the queue.
            </p>

            <div style={{ ...styles.panel, maxWidth: '650px', marginTop: '20px' }}>
              <label style={styles.label} htmlFor="missed-gap">
                Required completed patients before rejoining
              </label>
              <input
                id="missed-gap"
                type="number"
                min="1"
                max="100"
                style={styles.input}
                value={missedGap}
                onChange={(e) =>
                  setMissedGap(Math.max(1, Number(e.target.value) || 1))
                }
              />
              <p style={styles.muted}>
                Example: if the rule is 10, a missed patient becomes eligible
                to rejoin after 10 additional patients have been completed
                since they were marked missed.
              </p>
            </div>

            <div style={{ ...styles.panel, marginTop: '20px' }}>
              <h2>Missed Patients</h2>
              {renderPatientTable(
                patients.filter((p) => p.status === 'Missed'),
                false
              )}
              <p style={styles.muted}>
                Rejoin eligibility is checked when staff presses Rejoin queue.
              </p>
            </div>
          </div>
        )}

        {activeSection === 'Payments' && (
          <div style={{ marginTop: '22px' }}>
            <h1>Payments</h1>
            <p style={styles.muted}>
              Review consultation payments and update payment status.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '14px',
                margin: '20px 0',
              }}
            >
              <div style={styles.panel}>
                <p style={styles.muted}>Collected</p>
                <h2>
                  ₹
                  {patients
                    .filter((p) => p.paymentStatus === 'Paid')
                    .reduce((sum, p) => sum + p.fee, 0)}
                </h2>
              </div>
              <div style={styles.panel}>
                <p style={styles.muted}>Pending</p>
                <h2>
                  ₹
                  {patients
                    .filter((p) => p.paymentStatus !== 'Paid')
                    .reduce((sum, p) => sum + p.fee, 0)}
                </h2>
              </div>
              <div style={styles.panel}>
                <p style={styles.muted}>Paid patients</p>
                <h2>{paidCount}</h2>
              </div>
            </div>

            <div style={styles.panel}>
              {renderPatientTable(patients, false)}
            </div>
          </div>
        )}

        {activeSection === 'Hospital Settings' && (
          <div style={{ marginTop: '22px', maxWidth: '800px' }}>
            <h1>Hospital Settings</h1>
            <p style={styles.muted}>
              Update clinic information and token preferences.
            </p>

            <form
              style={{ ...styles.panel, marginTop: '20px' }}
              onSubmit={(event) => {
                event.preventDefault()
                showMessage('Hospital settings updated successfully.')
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '16px',
                }}
              >
                <div style={styles.field}>
                  <label style={styles.label} htmlFor="hospital-name">
                    Clinic name
                  </label>
                  <input
                    id="hospital-name"
                    style={styles.input}
                    value={hospital.name}
                    onChange={(e) =>
                      setHospital({ ...hospital, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div style={styles.field}>
                  <label style={styles.label} htmlFor="doctor-name">
                    Doctor name
                  </label>
                  <input
                    id="doctor-name"
                    style={styles.input}
                    value={hospital.doctor}
                    onChange={(e) =>
                      setHospital({ ...hospital, doctor: e.target.value })
                    }
                    required
                  />
                </div>

                <div style={styles.field}>
                  <label style={styles.label} htmlFor="consultation-fee">
                    Consultation fee (₹)
                  </label>
                  <input
                    id="consultation-fee"
                    type="number"
                    min="0"
                    style={styles.input}
                    value={hospital.fee}
                    onChange={(e) =>
                      setHospital({ ...hospital, fee: e.target.value })
                    }
                    required
                  />
                </div>

                <div style={styles.field}>
                  <label style={styles.label} htmlFor="token-prefix">
                    Token prefix
                  </label>
                  <input
                    id="token-prefix"
                    style={styles.input}
                    value={hospital.prefix}
                    maxLength={4}
                    onChange={(e) =>
                      setHospital({
                        ...hospital,
                        prefix: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''),
                      })
                    }
                    required
                  />
                </div>

                <div style={styles.field}>
                  <label style={styles.label} htmlFor="opening-time">
                    Opening time
                  </label>
                  <input
                    id="opening-time"
                    type="time"
                    style={styles.input}
                    value={hospital.openingTime}
                    onChange={(e) =>
                      setHospital({ ...hospital, openingTime: e.target.value })
                    }
                    required
                  />
                </div>

                <div style={styles.field}>
                  <label style={styles.label} htmlFor="closing-time">
                    Closing time
                  </label>
                  <input
                    id="closing-time"
                    type="time"
                    style={styles.input}
                    value={hospital.closingTime}
                    onChange={(e) =>
                      setHospital({ ...hospital, closingTime: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <button type="submit" style={styles.button}>
                Save Hospital Settings
              </button>
            </form>

            <div style={{ ...styles.panel, marginTop: '18px' }}>
              <h3>Current clinic details</h3>
              <p style={styles.muted}>Clinic: {hospital.name}</p>
              <p style={styles.muted}>Doctor: {hospital.doctor}</p>
              <p style={styles.muted}>Consultation fee: ₹{hospital.fee}</p>
              <p style={styles.muted}>
                Hours: {hospital.openingTime} – {hospital.closingTime}
              </p>
              <p style={styles.muted}>Token prefix: {hospital.prefix}</p>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/patient" element={<Patient />} />
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/doctors" element={<FindDoctors />} />
        <Route
          path="/staff/emergency"
          element={<EmergencyRegistration />}
        />
        <Route
          path="/register-hospital"
          element={<RegisterHospital />}
        />
        <Route
          path="/doctor-register"
          element={<DoctorRegistration />}
        />
      </Routes>

      <QueueAssistant />
    </>
  );
}

export default App;

