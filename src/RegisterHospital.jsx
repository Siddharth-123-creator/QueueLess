
import { useState } from 'react'
import { Link } from 'react-router-dom'

function RegisterHospital() {
  const [form, setForm] = useState({
    hospitalName: '',
    registrationNumber: '',
    address: '',
    phone: '',
    email: '',
    adminName: '',
    secretKey: '',
  })

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
    setMessage('')
    setError('')
  }

  function handleSubmit(event) {
    event.preventDefault()

    const savedHospitals = JSON.parse(
      localStorage.getItem('queueless_registered_hospitals') || '[]'
    )

    const hospitalExists = savedHospitals.some(
      (hospital) =>
        hospital.registrationNumber.toLowerCase() ===
        form.registrationNumber.trim().toLowerCase()
    )

    if (hospitalExists) {
      setError('This hospital registration number is already registered.')
      return
    }

    const newHospital = {
      id: `HOS-${Date.now()}`,
      hospitalName: form.hospitalName.trim(),
      registrationNumber: form.registrationNumber.trim(),
      address: form.address.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      adminName: form.adminName.trim(),
      secretKey: form.secretKey,
      registeredAt: new Date().toISOString(),
    }

    savedHospitals.push(newHospital)

    localStorage.setItem(
      'queueless_registered_hospitals',
      JSON.stringify(savedHospitals)
    )

    setMessage(
      `Hospital registered successfully! Your Hospital ID is ${newHospital.id}`
    )

    setForm({
      hospitalName: '',
      registrationNumber: '',
      address: '',
      phone: '',
      email: '',
      adminName: '',
      secretKey: '',
    })
  }


return (
  <main
    style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0fdfa 0%, #f8fafc 50%, #eff6ff 100%)',
      padding: '28px 18px 48px',
      fontFamily: 'Inter, system-ui, sans-serif',
      color: '#0f172a',
    }}
  >
    <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
      <Link
        to="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          color: '#0f172a',
          textDecoration: 'none',
          fontSize: '22px',
          fontWeight: 800,
          marginBottom: '28px',
        }}
      >
        <span
          style={{
            width: '42px',
            height: '42px',
            display: 'grid',
            placeItems: 'center',
            background: '#0f766e',
            color: 'white',
            borderRadius: '13px',
            boxShadow: '0 6px 15px #0f766e30',
          }}
        >
          Q
        </span>
        QueueLess
      </Link>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 0.85fr) minmax(0, 1.15fr)',
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 24px 70px rgba(15, 23, 42, 0.09)',
        }}
        className="hospital-registration-layout"
      >
        <aside
          style={{
            background: 'linear-gradient(150deg, #0f172a, #123b50 65%, #115e59)',
            color: '#ffffff',
            padding: '42px 32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '36px',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                borderRadius: '100px',
                background: '#ffffff15',
                border: '1px solid #ffffff20',
                color: '#99f6e4',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '1.4px',
              }}
            >
              <span>✦</span> HOSPITAL PARTNERSHIP
            </div>

            <h1
  style={{
    fontSize: 'clamp(30px, 4vw, 43px)',
    lineHeight: 1.13,
    letterSpacing: '-1.5px',
    margin: '25px 0 16px',
    color: '#ffffff',
    fontWeight: 900,
    textShadow: '0 2px 12px rgba(0,0,0,0.25)',
  }}
>
  Bring your hospital into a smarter queue.
</h1>

            <p
              style={{
                color: '#cbd5e1',
                fontSize: '15px',
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              Create your hospital profile on QueueLess and keep your
              registration details organised in one place.
            </p>
          </div>

          <div style={{ display: 'grid', gap: '20px' }}>
            {[
              ['01', 'Hospital profile', 'Add your hospital identity and contact details.'],
              ['02', 'Administrator details', 'Provide the person responsible for registration.'],
              ['03', 'Access key', 'Create a key for your own records.'],
            ].map(([number, title, description]) => (
              <div
                key={number}
                style={{
                  display: 'flex',
                  gap: '14px',
                  alignItems: 'flex-start',
                }}
              >
                <span
                  style={{
                    minWidth: '36px',
                    height: '36px',
                    display: 'grid',
                    placeItems: 'center',
                    borderRadius: '11px',
                    background: '#ffffff15',
                    color: '#99f6e4',
                    fontWeight: 800,
                    fontSize: '12px',
                  }}
                >
                  {number}
                </span>
                <div>
                  <h3 style={{ margin: '2px 0 5px', fontSize: '15px' }}>
                    {title}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      color: '#cbd5e1',
                      fontSize: '12px',
                      lineHeight: 1.7,
                    }}
                  >
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p style={{ color: '#94a3b8', fontSize: '11px', lineHeight: 1.7 }}>
            QueueLess · Hospital registration
          </p>
        </aside>

        <section style={{ padding: 'clamp(22px, 4vw, 42px)' }}>
          <span
            style={{
              color: '#0f766e',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '1.5px',
            }}
          >
            GET STARTED
          </span>

          <h2
            style={{
              fontSize: '29px',
              letterSpacing: '-0.8px',
              margin: '9px 0 8px',
            }}
          >
            Register your hospital
          </h2>

          <p
            style={{
              color: '#64748b',
              fontSize: '13px',
              lineHeight: 1.7,
              margin: '0 0 28px',
            }}
          >
            Enter the details below to create your hospital record.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '17px' }}>
            <h3
              style={{
                fontSize: '13px',
                margin: '0',
                paddingBottom: '10px',
                borderBottom: '1px solid #e2e8f0',
              }}
            >
              Hospital information
            </h3>

            {[
              {
                label: 'Hospital name',
                name: 'hospitalName',
                placeholder: 'e.g. City Care Hospital',
              },
              {
                label: 'Hospital registration number',
                name: 'registrationNumber',
                placeholder: 'Enter registration number',
              },
              {
                label: 'Contact number',
                name: 'phone',
                placeholder: 'Enter hospital phone number',
                type: 'tel',
              },
              {
                label: 'Hospital email',
                name: 'email',
                placeholder: 'name@hospital.com',
                type: 'email',
              },
            ].map((field) => (
              <div key={field.name} style={{ display: 'grid', gap: '7px' }}>
                <label
                  htmlFor={field.name}
                  style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}
                >
                  {field.label}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type || 'text'}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required
                  style={hospitalInputStyle}
                />
              </div>
            ))}

            <div style={{ display: 'grid', gap: '7px' }}>
              <label
                htmlFor="address"
                style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}
              >
                Full hospital address
              </label>
              <textarea
                id="address"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Building, street, area and city"
                rows={3}
                required
                style={{ ...hospitalInputStyle, resize: 'vertical' }}
              />
            </div>

            <h3
              style={{
                fontSize: '13px',
                margin: '9px 0 0',
                paddingBottom: '10px',
                borderBottom: '1px solid #e2e8f0',
              }}
            >
              Administrator & access
            </h3>

            <div style={{ display: 'grid', gap: '7px' }}>
              <label
                htmlFor="adminName"
                style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}
              >
                Administrator name
              </label>
              <input
                id="adminName"
                name="adminName"
                value={form.adminName}
                onChange={handleChange}
                placeholder="Enter administrator name"
                required
                style={hospitalInputStyle}
              />
            </div>

            <div style={{ display: 'grid', gap: '7px' }}>
              <label
                htmlFor="secretKey"
                style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}
              >
                Create a secret key
              </label>
              <input
                id="secretKey"
                name="secretKey"
                type="password"
                value={form.secretKey}
                onChange={handleChange}
                placeholder="At least 8 characters"
                minLength={8}
                autoComplete="new-password"
                required
                style={hospitalInputStyle}
              />
              <p
                style={{
                  margin: 0,
                  fontSize: '11px',
                  lineHeight: 1.6,
                  color: '#64748b',
                }}
              >
                This key is stored in this browser only and is not securely
                protected in this version.
              </p>
            </div>

            {error && (
              <p
                role="alert"
                style={{
                  margin: 0,
                  padding: '12px',
                  borderRadius: '10px',
                  background: '#fef2f2',
                  color: '#b91c1c',
                  fontSize: '13px',
                }}
              >
                {error}
              </p>
            )}

            {message && (
              <p
                role="status"
                style={{
                  margin: 0,
                  padding: '14px',
                  borderRadius: '12px',
                  background: '#f0fdfa',
                  border: '1px solid #99f6e4',
                  color: '#115e59',
                  fontSize: '13px',
                  lineHeight: 1.7,
                  overflowWrap: 'anywhere',
                }}
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              style={{
                width: '100%',
                border: 'none',
                borderRadius: '12px',
                padding: '15px 18px',
                background: 'linear-gradient(100deg, #0f766e, #0d9488)',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 8px 20px #0f766e25',
                marginTop: '3px',
              }}
            >
              Register Hospital →
            </button>
          </form>

          <div
            style={{
              marginTop: '23px',
              paddingTop: '18px',
              borderTop: '1px solid #e2e8f0',
              textAlign: 'center',
            }}
          >
            <Link
              to="/"
              style={{
                color: '#0f766e',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: 700,
              }}
            >
              ← Back to Home
            </Link>
          </div>
        </section>
      </div>
    </div>

    <style>{`
      .hospital-registration-layout input:focus,
      .hospital-registration-layout textarea:focus {
        outline: none;
        border-color: #0d9488 !important;
        box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.12);
      }

      @media (max-width: 760px) {
        .hospital-registration-layout {
          grid-template-columns: minmax(0, 1fr) !important;
        }
      }
    `}</style>
  </main>
)

}

const hospitalInputStyle = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '12px 13px',
  border: '1px solid #cbd5e1',
  borderRadius: '10px',
  background: '#ffffff',
  color: '#0f172a',
  fontSize: '13px',
  fontFamily: 'inherit',
  transition: 'border-color 0.2s, box-shadow 0.2s',
}

export default RegisterHospital
