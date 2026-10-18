
import { useState } from 'react'
import { Link } from 'react-router-dom'

function EmergencyRegistration() {
  const [patients, setPatients] = useState([])
  const [form, setForm] = useState({
    name: '',
    age: '',
    mobile: '',
    emergencyType: 'Medical emergency',
    notes: '',
  })
  const [message, setMessage] = useState('')

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    const patient = {
      ...form,
      id: Date.now(),
      registeredAt: new Date().toLocaleTimeString(),
      status: 'Registered — staff action required',
    }

    setPatients((previous) => [patient, ...previous])
    setForm({
      name: '',
      age: '',
      mobile: '',
      emergencyType: 'Medical emergency',
      notes: '',
    })
    setMessage(
      'Demo registration saved on this page. Notify the emergency team immediately through your hospital process.'
    )
  }

  return (
    <main className="portal">
      <Link to="/" className="brand">
        <span className="brand-icon">Q</span>
        QueueLess
      </Link>

      <section className="portal-card">
        <span className="eyebrow">HOSPITAL STAFF · EMERGENCY</span>
        <h1>🚨 Emergency Registration</h1>
        <p>
          Record an emergency arrival for staff follow-up.
          This demo does not contact emergency services or alert a team.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="emergency-name">Patient name</label>
          <input
            id="emergency-name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter patient name"
            required
          />

          <label htmlFor="emergency-age">Age</label>
          <input
            id="emergency-age"
            name="age"
            type="number"
            min="0"
            max="120"
            value={form.age}
            onChange={handleChange}
            placeholder="Patient age"
            required
          />

          <label htmlFor="emergency-mobile">Mobile number</label>
          <input
            id="emergency-mobile"
            name="mobile"
            type="tel"
            value={form.mobile}
            onChange={handleChange}
            placeholder="Enter contact number"
            required
          />

          <label htmlFor="emergency-type">Emergency type</label>
          <select
            id="emergency-type"
            name="emergencyType"
            value={form.emergencyType}
            onChange={handleChange}
          >
            <option>Medical emergency</option>
            <option>Injury / accident</option>
            <option>Breathing difficulty</option>
            <option>Chest pain</option>
            <option>Other</option>
          </select>

          <label htmlFor="emergency-notes">Brief notes (optional)</label>
          <textarea
            id="emergency-notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Relevant information for the clinical team"
            rows={3}
          />

          <button type="submit">Register Emergency Arrival</button>
        </form>

        {message && <p className="demo-note">{message}</p>}

        <h2>Recently registered emergencies</h2>

        {patients.length === 0 ? (
          <p className="demo-note">No demo registrations yet.</p>
        ) : (
          patients.map((patient) => (
            <article
              key={patient.id}
              style={{
                padding: '14px',
                marginTop: '12px',
                border: '1px solid #e2ebef',
                borderRadius: '10px',
              }}
            >
              <strong>{patient.name}</strong>
              <p>Age: {patient.age} · {patient.emergencyType}</p>
              <p>Registered at: {patient.registeredAt}</p>
              <p>{patient.status}</p>
              {patient.notes && <p>Notes: {patient.notes}</p>}
            </article>
          ))
        )}

        <Link to="/staff">← Back to Staff Portal</Link>
      </section>
    </main>
  )
}

export default EmergencyRegistration
