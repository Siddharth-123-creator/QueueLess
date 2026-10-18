
import { useState } from 'react'
import { Link } from 'react-router-dom'

function DoctorRegistration() {
  const [form, setForm] = useState({
    doctorName: '',
    specialty: 'General Physician',
    qualification: '',
    experience: '',
    languages: 'Hindi, English',
    fee: '',
    phone: '',
    clinicName: '',
    clinicAddress: '',
    timings: '',
  })

  const [message, setMessage] = useState('')

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
    setMessage('')
  }

  
function handleSubmit(event) {
  event.preventDefault()

  const newDoctor = {
    id: Date.now(),
    name: form.doctorName,
    specialty: form.specialty,
    qualification: form.qualification,
    experience: Number(form.experience),
    languages: form.languages
      .split(',')
      .map((language) => language.trim())
      .filter(Boolean),
    fee: Number(form.fee),
    phone: form.phone,
    clinic: form.clinicName,
    location: form.clinicAddress,
    timings: form.timings,
    rating: null,
    reviews: 0,
    verificationStatus: 'Pending',
  }

  const savedDoctors = JSON.parse(
    localStorage.getItem('queueless_registered_doctors') || '[]'
  )

  savedDoctors.push(newDoctor)

  localStorage.setItem(
    'queueless_registered_doctors',
    JSON.stringify(savedDoctors)
  )

  setMessage(
    'Registration saved in this browser. Your profile is pending verification and is not yet publicly listed.'
  )
}


  return (
    <main className="portal">
      <Link to="/doctors" className="brand">
        <span className="brand-icon">Q</span>
        QueueLess
      </Link>

      <section className="portal-card">
        <span className="eyebrow">JOIN QUEUELESS</span>
        <h1>Doctor Registration</h1>
        <p>
          Register your professional profile and the clinic
          where patients can find and consult you.
        </p>

        <form onSubmit={handleSubmit}>
          <h2>Doctor Details</h2>

          <label htmlFor="doctorName">Full name</label>
          <input
            id="doctorName"
            name="doctorName"
            value={form.doctorName}
            onChange={handleChange}
            placeholder="Dr. Your Name"
            required
          />

          <label htmlFor="specialty">Specialty</label>
          <select
            id="specialty"
            name="specialty"
            value={form.specialty}
            onChange={handleChange}
          >
            <option>General Physician</option>
            <option>Dermatology</option>
            <option>Dentistry</option>
            <option>Pediatrics</option>
            <option>ENT</option>
            <option>Cardiology</option>
            <option>Orthopedics</option>
            <option>Other</option>
          </select>

          <label htmlFor="qualification">Qualification</label>
          <input
            id="qualification"
            name="qualification"
            value={form.qualification}
            onChange={handleChange}
            placeholder="e.g. MBBS, MD"
            required
          />

          <label htmlFor="experience">Years of experience</label>
          <input
            id="experience"
            name="experience"
            type="number"
            min="0"
            max="80"
            value={form.experience}
            onChange={handleChange}
            placeholder="e.g. 8"
            required
          />

          <label htmlFor="languages">Languages spoken</label>
          <input
            id="languages"
            name="languages"
            value={form.languages}
            onChange={handleChange}
            placeholder="Hindi, English"
            required
          />

          <label htmlFor="fee">Consultation fee (₹)</label>
          <input
            id="fee"
            name="fee"
            type="number"
            min="0"
            value={form.fee}
            onChange={handleChange}
            placeholder="e.g. 500"
            required
          />

          <label htmlFor="phone">Contact number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter contact number"
            required
          />

          <h2>Clinic Details</h2>

          <label htmlFor="clinicName">Clinic name</label>
          <input
            id="clinicName"
            name="clinicName"
            value={form.clinicName}
            onChange={handleChange}
            placeholder="e.g. City Care Clinic"
            required
          />

          <label htmlFor="clinicAddress">Full clinic address</label>
          <textarea
            id="clinicAddress"
            name="clinicAddress"
            value={form.clinicAddress}
            onChange={handleChange}
            placeholder="Building, street, area, city"
            rows={3}
            required
          />

          <label htmlFor="timings">Consultation days and timings</label>
          <input
            id="timings"
            name="timings"
            value={form.timings}
            onChange={handleChange}
            placeholder="e.g. Mon–Sat, 10 AM–2 PM"
            required
          />

          <button type="submit">
            Submit Registration →
          </button>
        </form>

        {message && (
          <p className="demo-note" role="status">
            {message}
          </p>
        )}

        <p className="demo-note">
          Demo only: registration is not saved to a database.
          Public listing should happen only after verification.
        </p>

        <Link to="/doctors">← Back to Find Doctors & Clinics</Link>
      </section>
    </main>
  )
}

export default DoctorRegistration
