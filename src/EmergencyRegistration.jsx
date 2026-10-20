
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
      registeredAt: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
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
      'Emergency arrival recorded on this page. Notify the emergency team immediately through your hospital process.'
    )
  }

  const fieldStyle = {
    width: '100%',
    padding: '13px 14px',
    border: '1px solid #d5dee8',
    borderRadius: '10px',
    fontSize: '14px',
    color: '#172b4d',
    background: '#ffffff',
    outlineColor: '#147d72',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  }

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '13px',
    fontWeight: 700,
    color: '#334b62',
  }

  const fieldGroupStyle = {
    marginBottom: '18px',
    minWidth: 0,
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#f3f6fa',
        padding: '28px 20px 48px',
        boxSizing: 'border-box',
        color: '#172b4d',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap',
            marginBottom: '28px',
          }}
        >
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '11px',
              color: '#102a43',
              textDecoration: 'none',
              fontSize: '23px',
              fontWeight: 800,
              letterSpacing: '-0.6px',
            }}
          >
            <span
              style={{
                width: '42px',
                height: '42px',
                display: 'grid',
                placeItems: 'center',
                borderRadius: '13px',
                background: '#147d72',
                color: 'white',
                fontSize: '22px',
              }}
            >
              Q
            </span>
            QueueLess
          </Link>

          <Link
            to="/staff"
            style={{
              padding: '11px 15px',
              border: '1px solid #d8e1eb',
              borderRadius: '10px',
              color: '#334b62',
              background: '#ffffff',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 700,
            }}
          >
            ← Back to Staff Portal
          </Link>
        </header>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: '24px',
            alignItems: 'start',
          }}
        >
          <section
            style={{
              background: '#ffffff',
              border: '1px solid #e0e7ef',
              borderRadius: '18px',
              padding: 'clamp(20px, 4vw, 34px)',
              boxShadow: '0 10px 35px rgba(16,42,67,0.06)',
              minWidth: 0,
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 11px',
                borderRadius: '8px',
                background: '#fff1f0',
                color: '#b42318',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.7px',
              }}
            >
              <span>●</span>
              HOSPITAL STAFF · EMERGENCY
            </div>

            <h1
              style={{
                margin: '20px 0 10px',
                fontSize: 'clamp(27px, 4vw, 34px)',
                lineHeight: 1.2,
                letterSpacing: '-0.8px',
                color: '#102a43',
              }}
            >
              Emergency Registration
            </h1>

            <p
              style={{
                margin: '0 0 25px',
                color: '#64748b',
                fontSize: '14px',
                lineHeight: 1.7,
              }}
            >
              Record an emergency arrival and capture essential details for
              immediate staff follow-up.
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '11px',
                padding: '14px',
                marginBottom: '25px',
                borderRadius: '11px',
                background: '#fff7ed',
                border: '1px solid #fed7aa',
                color: '#9a3412',
                fontSize: '12px',
                lineHeight: 1.6,
              }}
            >
              <span style={{ fontSize: '18px' }}>!</span>
              <span>
                <strong>Urgent care notice</strong>
                <br />
                This form records information on this page only. It does not
                alert emergency services or replace immediate clinical care.
              </span>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={fieldGroupStyle}>
                <label style={labelStyle} htmlFor="emergency-name">
                  Patient full name *
                </label>
                <input
                  id="emergency-name"
                  name="name"
                  style={fieldStyle}
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  autoComplete="name"
                  required
                />
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
                  gap: '16px',
                }}
              >
                <div style={fieldGroupStyle}>
                  <label style={labelStyle} htmlFor="emergency-age">
                    Patient age *
                  </label>
                  <input
                    id="emergency-age"
                    name="age"
                    type="number"
                    min="0"
                    max="120"
                    style={fieldStyle}
                    value={form.age}
                    onChange={handleChange}
                    placeholder="Age in years"
                    required
                  />
                </div>

                <div style={fieldGroupStyle}>
                  <label style={labelStyle} htmlFor="emergency-mobile">
                    Mobile number *
                  </label>
                  <input
                    id="emergency-mobile"
                    name="mobile"
                    type="tel"
                    style={fieldStyle}
                    value={form.mobile}
                    onChange={handleChange}
                    placeholder="Contact number"
                    autoComplete="tel"
                    required
                  />
                </div>
              </div>

              <div style={fieldGroupStyle}>
                <label style={labelStyle} htmlFor="emergency-type">
                  Emergency category *
                </label>
                <select
                  id="emergency-type"
                  name="emergencyType"
                  style={fieldStyle}
                  value={form.emergencyType}
                  onChange={handleChange}
                >
                  <option>Medical emergency</option>
                  <option>Injury / accident</option>
                  <option>Breathing difficulty</option>
                  <option>Chest pain</option>
                  <option>Other</option>
                </select>
              </div>

              <div style={fieldGroupStyle}>
                <label style={labelStyle} htmlFor="emergency-notes">
                  Additional clinical notes
                  <span
                    style={{
                      color: '#94a3b8',
                      fontWeight: 400,
                      marginLeft: '5px',
                    }}
                  >
                    (optional)
                  </span>
                </label>
                <textarea
                  id="emergency-notes"
                  name="notes"
                  style={{
                    ...fieldStyle,
                    minHeight: '105px',
                    resize: 'vertical',
                    lineHeight: 1.6,
                  }}
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Enter relevant information for the clinical team"
                  rows={4}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '15px 18px',
                  border: 'none',
                  borderRadius: '11px',
                  background: '#b42318',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 5px 12px rgba(180,35,24,0.16)',
                }}
              >
                Register Emergency Arrival →
              </button>
            </form>

            {message && (
              <div
                role="status"
                style={{
                  marginTop: '18px',
                  padding: '14px',
                  border: '1px solid #c9e9df',
                  borderRadius: '10px',
                  background: '#e7f6f1',
                  color: '#12675f',
                  fontSize: '13px',
                  lineHeight: 1.6,
                }}
              >
                ✓ {message}
              </div>
            )}
          </section>

          <section style={{ minWidth: 0 }}>
            <div
              style={{
                padding: '24px',
                borderRadius: '18px',
                background: '#102a43',
                color: '#ffffff',
                boxShadow: '0 10px 30px rgba(16,42,67,0.12)',
              }}
            >
              <div style={{ fontSize: '25px', marginBottom: '13px' }}>
                ♡
              </div>
              <h2
                style={{
                  margin: '0 0 10px',
                  fontSize: '21px',
                  letterSpacing: '-0.3px',
                }}
              >
                Emergency arrivals
              </h2>
              <p
                style={{
                  margin: 0,
                  color: '#c7d5e5',
                  fontSize: '13px',
                  lineHeight: 1.7,
                }}
              >
                Review arrivals recorded during this session and follow up
                through your hospital's emergency process.
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  marginTop: '24px',
                  paddingTop: '20px',
                  borderTop: '1px solid #35516d',
                }}
              >
                <span style={{ color: '#c7d5e5', fontSize: '13px' }}>
                  Recorded arrivals
                </span>
                <strong style={{ fontSize: '28px' }}>
                  {patients.length}
                </strong>
              </div>
            </div>

            <div
              style={{
                marginTop: '20px',
                padding: '24px',
                border: '1px solid #e0e7ef',
                borderRadius: '18px',
                background: '#ffffff',
                boxShadow: '0 8px 24px rgba(16,42,67,0.04)',
                minWidth: 0,
              }}
            >
              <h2
                style={{
                  margin: '0 0 6px',
                  color: '#102a43',
                  fontSize: '19px',
                }}
              >
                Recent registrations
              </h2>
              <p
                style={{
                  margin: '0 0 18px',
                  color: '#64748b',
                  fontSize: '13px',
                  lineHeight: 1.6,
                }}
              >
                Latest emergency arrivals recorded on this page.
              </p>

              {patients.length === 0 ? (
                <div
                  style={{
                    padding: '28px 12px',
                    textAlign: 'center',
                    border: '1px dashed #d5dee8',
                    borderRadius: '12px',
                    background: '#f8fafc',
                  }}
                >
                  <div style={{ fontSize: '28px', marginBottom: '9px' }}>
                    ♡
                  </div>
                  <strong style={{ fontSize: '14px', color: '#334b62' }}>
                    No registrations yet
                  </strong>
                  <p
                    style={{
                      margin: '7px 0 0',
                      fontSize: '12px',
                      color: '#64748b',
                      lineHeight: 1.6,
                    }}
                  >
                    New emergency arrivals will appear here after registration.
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    display: 'grid',
                    gap: '12px',
                    maxHeight: '650px',
                    overflowY: 'auto',
                  }}
                >
                  {patients.map((patient) => (
                    <article
                      key={patient.id}
                      style={{
                        padding: '16px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        background: '#ffffff',
                        overflowWrap: 'anywhere',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          gap: '10px',
                          flexWrap: 'wrap',
                        }}
                      >
                        <strong style={{ color: '#102a43', fontSize: '15px' }}>
                          {patient.name}
                        </strong>
                        <span
                          style={{
                            padding: '5px 8px',
                            borderRadius: '20px',
                            background: '#fff1f0',
                            color: '#b42318',
                            fontSize: '10px',
                            fontWeight: 800,
                          }}
                        >
                          URGENT
                        </span>
                      </div>

                      <p
                        style={{
                          margin: '10px 0 5px',
                          color: '#334b62',
                          fontSize: '13px',
                        }}
                      >
                        {patient.emergencyType} · Age {patient.age}
                      </p>
                      <p
                        style={{
                          margin: '5px 0',
                          color: '#64748b',
                          fontSize: '12px',
                        }}
                      >
                        Contact: {patient.mobile}
                      </p>
                      <p
                        style={{
                          margin: '5px 0',
                          color: '#64748b',
                          fontSize: '12px',
                        }}
                      >
                        Registered at: {patient.registeredAt}
                      </p>
                      <p
                        style={{
                          margin: '10px 0 0',
                          color: '#9a3412',
                          fontSize: '12px',
                          fontWeight: 700,
                          lineHeight: 1.5,
                        }}
                      >
                        {patient.status}
                      </p>

                      {patient.notes && (
                        <p
                          style={{
                            margin: '10px 0 0',
                            paddingTop: '10px',
                            borderTop: '1px solid #edf1f5',
                            color: '#475569',
                            fontSize: '12px',
                            lineHeight: 1.6,
                          }}
                        >
                          Notes: {patient.notes}
                        </p>
                      )}
                    </article>
                  ))}
                </div>
              )}
            </div>

            <p
              style={{
                margin: '18px 4px 0',
                color: '#64748b',
                fontSize: '12px',
                lineHeight: 1.7,
              }}
            >
              This page does not send alerts or save registrations to a
              permanent database. Follow the hospital's established emergency
              response procedure.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}

export default EmergencyRegistration
