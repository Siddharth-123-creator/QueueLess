
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const doctors = [
  {
    id: 1,
    initials: 'AS',
    name: 'Dr. Ananya Sharma',
    specialty: 'General Physician',
    experience: 12,
    languages: ['English', 'Hindi'],
    clinic: 'City Care Clinic',
    location: 'Indirapuram',
    fee: 400,
    rating: 4.5,
    reviews: 2,
    source: 'sample',
  },
  {
    id: 2,
    initials: 'RM',
    name: 'Dr. Rahul Menon',
    specialty: 'Dermatology',
    experience: 9,
    languages: ['English', 'Hindi', 'Malayalam'],
    clinic: 'Sunrise Skin & Dental Care',
    location: 'Vaishali',
    fee: 700,
    rating: 4.0,
    reviews: 1,
    source: 'sample',
  },
  {
    id: 3,
    initials: 'PK',
    name: 'Dr. Priya Kapoor',
    specialty: 'Dentistry',
    experience: 7,
    languages: ['English', 'Hindi'],
    clinic: 'Sunrise Skin & Dental Care',
    location: 'Vaishali',
    fee: 500,
    rating: null,
    reviews: 0,
    source: 'sample',
  },
  {
    id: 4,
    initials: 'SK',
    name: 'Dr. Sameer Khan',
    specialty: 'Pediatrics',
    experience: 15,
    languages: ['English', 'Hindi', 'Urdu'],
    clinic: 'Little Steps Child & ENT Centre',
    location: 'Kaushambi',
    fee: 600,
    rating: 5.0,
    reviews: 1,
    source: 'sample',
  },
  {
    id: 5,
    initials: 'NA',
    name: 'Dr. Neha Arora',
    specialty: 'ENT',
    experience: 10,
    languages: ['English', 'Hindi'],
    clinic: 'Little Steps Child & ENT Centre',
    location: 'Kaushambi',
    fee: 550,
    rating: null,
    reviews: 0,
    source: 'sample',
  },
]

const specialties = [
  'All',
  'General Physician',
  'Dermatology',
  'Dentistry',
  'Pediatrics',
  'ENT',
  'Cardiology',
  'Orthopedics',
  'Other',
]

function getInitials(name = '') {
  const words = name.trim().split(/\s+/).filter(Boolean)

  if (words.length === 0) return 'DR'

  const first = words[0].toLowerCase() === 'dr.'
    ? words.slice(1)
    : words

  if (first.length === 0) return 'DR'

  return first.length === 1
    ? first[0].slice(0, 2).toUpperCase()
    : `${first[0][0]}${first[first.length - 1][0]}`.toUpperCase()
}

function FindDoctors() {
  const [search, setSearch] = useState('')
  const [specialty, setSpecialty] = useState('All')
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [selectedClinic, setSelectedClinic] = useState(null)
  const [maxFee, setMaxFee] = useState('Any fee')
  const [minExperience, setMinExperience] = useState('Any experience')
  const [minRating, setMinRating] = useState('Any rating')
  const [language, setLanguage] = useState('Any language')
  const [registeredDoctors, setRegisteredDoctors] = useState([])

  useEffect(() => {
    function loadRegisteredDoctors() {
      try {
        const savedDoctors = JSON.parse(
          localStorage.getItem('queueless_registered_doctors') || '[]'
        )

        setRegisteredDoctors(
          Array.isArray(savedDoctors) ? savedDoctors : []
        )
      } catch {
        setRegisteredDoctors([])
      }
    }

    loadRegisteredDoctors()

    // Update the directory if another tab registers a doctor.
    window.addEventListener('storage', loadRegisteredDoctors)

    return () => {
      window.removeEventListener('storage', loadRegisteredDoctors)
    }
  }, [])

  // Only profiles with an Approved status are eligible
  // for this demo's public directory.
  const approvedRegisteredDoctors = useMemo(() => {
    return registeredDoctors
      .filter((doctor) => doctor.verificationStatus === 'Approved')
      .map((doctor) => ({
        ...doctor,
        initials: getInitials(doctor.name),
        languages: Array.isArray(doctor.languages)
          ? doctor.languages
          : [],
        rating: doctor.rating ?? null,
        reviews: doctor.reviews ?? 0,
        source: 'registered',
      }))
  }, [registeredDoctors])

  const allDoctors = useMemo(
    () => [...doctors, ...approvedRegisteredDoctors],
    [approvedRegisteredDoctors]
  )

  const filteredDoctors = useMemo(() => {
    const term = search.trim().toLowerCase()

    return allDoctors.filter((doctor) => {
      const matchesSearch =
        !term ||
        doctor.name.toLowerCase().includes(term) ||
        doctor.clinic.toLowerCase().includes(term) ||
        doctor.specialty.toLowerCase().includes(term) ||
        doctor.location.toLowerCase().includes(term)

      const matchesSpecialty =
        specialty === 'All' || doctor.specialty === specialty

      const matchesFee =
        maxFee === 'Any fee' ||
        (Number.isFinite(Number(doctor.fee)) &&
          Number(doctor.fee) <= Number(maxFee))

      const matchesExperience =
        minExperience === 'Any experience' ||
        Number(doctor.experience) >= Number(minExperience)

      const matchesRating =
        minRating === 'Any rating' ||
        (doctor.rating !== null &&
          Number(doctor.rating) >= Number(minRating))

      const matchesLanguage =
        language === 'Any language' ||
        doctor.languages.includes(language)

      return (
        matchesSearch &&
        matchesSpecialty &&
        matchesFee &&
        matchesExperience &&
        matchesRating &&
        matchesLanguage
      )
    })
  }, [
    allDoctors,
    search,
    specialty,
    maxFee,
    minExperience,
    minRating,
    language,
  ])

  const clinicDoctors = useMemo(() => {
    if (!selectedClinic) return []

    return allDoctors.filter(
      (doctor) =>
        doctor.clinic === selectedClinic.name &&
        doctor.location === selectedClinic.location
    )
  }, [allDoctors, selectedClinic])

  function resetFilters() {
    setSearch('')
    setSpecialty('All')
    setMaxFee('Any fee')
    setMinExperience('Any experience')
    setMinRating('Any rating')
    setLanguage('Any language')
  }

  function openClinic(doctor) {
    setSelectedDoctor(null)
    setSelectedClinic({
      name: doctor.clinic,
      location: doctor.location,
    })
  }

  function openDoctor(doctor) {
    setSelectedClinic(null)
    setSelectedDoctor(doctor)
  }

  function closeDetails() {
    setSelectedDoctor(null)
    setSelectedClinic(null)
  }

  const mapUrl = (clinic, location) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${clinic}, ${location}, Ghaziabad, India`
    )}`

  // Doctor details view
  if (selectedDoctor) {
    return (
      <main className="directory-page">
        <header className="directory-header">
          <Link to="/" className="brand">
            <span className="brand-icon">Q</span>
            QueueLess
          </Link>

          <button type="button" onClick={closeDetails}>
            ← Back to directory
          </button>
        </header>

        <section className="directory-ai">
          <div
            className="doctor-avatar"
            style={{ margin: '0 auto 16px' }}
          >
            {selectedDoctor.initials || getInitials(selectedDoctor.name)}
          </div>

          <span className="sample-label">
            {selectedDoctor.source === 'registered'
              ? 'REGISTERED PROFILE · DEMO'
              : 'SAMPLE DOCTOR PROFILE'}
          </span>

          <h1>{selectedDoctor.name}</h1>

          <p>
            {selectedDoctor.specialty} · {selectedDoctor.experience} years
            of experience
          </p>

          {selectedDoctor.qualification && (
            <p>Qualification: {selectedDoctor.qualification}</p>
          )}

          <p>
            Languages:{' '}
            {selectedDoctor.languages.length
              ? selectedDoctor.languages.join(', ')
              : 'Not provided'}
          </p>

          <p>Consultation fee: ₹{selectedDoctor.fee}</p>

          <p>
            Rating:{' '}
            {selectedDoctor.rating == null
              ? 'No ratings yet'
              : `${Number(selectedDoctor.rating).toFixed(1)} / 5`}
            {' '}({selectedDoctor.reviews || 0} reviews)
          </p>

          <h2>Clinic information</h2>
          <p>{selectedDoctor.clinic}</p>
          <p>{selectedDoctor.location}, Ghaziabad</p>

          {selectedDoctor.timings && (
            <p>Consultation timings: {selectedDoctor.timings}</p>
          )}

          <p>
            <a
              href={mapUrl(
                selectedDoctor.clinic,
                selectedDoctor.location
              )}
              target="_blank"
              rel="noreferrer"
            >
              Get Directions ↗
            </a>
          </p>

          <div style={{ marginTop: 24 }}>
            <Link to="/patient" className="primary-button">
              How to Join the Queue →
            </Link>
          </div>

          <button
            type="button"
            className="reset-filters"
            style={{ marginTop: 20 }}
            onClick={closeDetails}
          >
            Back to all doctors
          </button>
        </section>
      </main>
    )
  }

  // Clinic details view
  if (selectedClinic) {
    return (
      <main className="directory-page">
        <header className="directory-header">
          <Link to="/" className="brand">
            <span className="brand-icon">Q</span>
            QueueLess
          </Link>

          <button type="button" onClick={closeDetails}>
            ← Back to directory
          </button>
        </header>

        <section className="directory-ai">
          <span className="eyebrow">CLINIC INFORMATION</span>
          <h1>{selectedClinic.name}</h1>
          <p>{selectedClinic.location}, Ghaziabad</p>

          <p>
            <a
              href={mapUrl(
                selectedClinic.name,
                selectedClinic.location
              )}
              target="_blank"
              rel="noreferrer"
            >
              Get Directions ↗
            </a>
          </p>

          <h2>Doctors listed at this clinic</h2>

          {clinicDoctors.length === 0 ? (
            <p>No doctor profiles are listed for this clinic.</p>
          ) : (
            clinicDoctors.map((doctor) => (
              <article
                key={doctor.id}
                className="doctor-card"
                style={{ margin: '16px auto', maxWidth: 560 }}
              >
                <div className="doctor-card-top">
                  <div className="doctor-avatar">
                    {doctor.initials || getInitials(doctor.name)}
                  </div>

                  <span className="sample-badge">
                    {doctor.source === 'registered'
                      ? 'REGISTERED · DEMO'
                      : 'SAMPLE'}
                  </span>
                </div>

                <h3>{doctor.name}</h3>
                <p>{doctor.specialty}</p>
                <p>Experience: {doctor.experience} years</p>
                <p>Consultation fee: ₹{doctor.fee}</p>

                <button
                  type="button"
                  onClick={() => openDoctor(doctor)}
                >
                  View Doctor →
                </button>
              </article>
            ))
          )}

          <button
            type="button"
            className="reset-filters"
            style={{ marginTop: 20 }}
            onClick={closeDetails}
          >
            Back to directory
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className="directory-page">
      <header className="directory-header">
        <Link to="/" className="brand">
          <span className="brand-icon">Q</span>
          QueueLess
        </Link>

        <nav className="directory-nav">
          <a href="#doctors">Find Doctors</a>
          <a href="#ai-help">AI Companion</a>
          <Link to="/patient">Patient Portal</Link>
          <Link to="/staff">Hospital Staff</Link>
        </nav>
      </header>

      <section className="directory-hero">
        <span className="eyebrow">YOUR HEALTH, YOUR CHOICE</span>
        <h1>Find Doctors & Clinics</h1>

        <div style={{ margin: '16px 0 24px' }}>
          <p>
            Are you a doctor? Join QueueLess and register your clinic.
          </p>

          <Link to="/doctor-register" className="nav-button">
            Register as a Doctor →
          </Link>
        </div>

        <p>
          Discover healthcare professionals, compare consultation
          fees and find a clinic that works for you.
        </p>

        <input
          className="directory-search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search doctor, clinic, specialty or location..."
          aria-label="Search doctors and clinics"
        />

        <span className="sample-label">
          Demo directory · Sample and locally registered profiles
        </span>
      </section>

      <section className="directory-content" id="doctors">
        <aside className="directory-filters">
          <h2>Filters</h2>

          <label htmlFor="specialty">Specialty</label>
          <select
            id="specialty"
            value={specialty}
            onChange={(event) => setSpecialty(event.target.value)}
          >
            {specialties.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <label htmlFor="fee">Consultation fee</label>
          <select
            id="fee"
            value={maxFee}
            onChange={(event) => setMaxFee(event.target.value)}
          >
            <option>Any fee</option>
            <option value="500">Up to ₹500</option>
            <option value="600">Up to ₹600</option>
            <option value="1000">Up to ₹1000</option>
          </select>

          <label htmlFor="experience">Experience</label>
          <select
            id="experience"
            value={minExperience}
            onChange={(event) => setMinExperience(event.target.value)}
          >
            <option>Any experience</option>
            <option value="10">10+ years</option>
            <option value="12">12+ years</option>
            <option value="15">15+ years</option>
          </select>

          <label htmlFor="rating">Rating</label>
          <select
            id="rating"
            value={minRating}
            onChange={(event) => setMinRating(event.target.value)}
          >
            <option>Any rating</option>
            <option value="4">4★ & up</option>
            <option value="4.5">4.5★ & up</option>
          </select>

          <label htmlFor="language">Language</label>
          <select
            id="language"
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
          >
            <option>Any language</option>
            <option>Hindi</option>
            <option>English</option>
            <option>Urdu</option>
            <option>Malayalam</option>
          </select>

          <button
            type="button"
            className="reset-filters"
            onClick={resetFilters}
          >
            Reset filters
          </button>
        </aside>

        <div className="doctor-results">
          <div className="results-heading">
            <div>
              <h2>Doctors near you</h2>
              <p>{filteredDoctors.length} doctor profile(s) found</p>
            </div>
          </div>

          {filteredDoctors.length === 0 ? (
            <div className="empty-results">
              <h3>No matching doctors found</h3>
              <p>Try changing your search or filters.</p>
            </div>
          ) : (
            <div className="doctor-grid">
              {filteredDoctors.map((doctor) => (
                <article className="doctor-card" key={doctor.id}>
                  <div className="doctor-card-top">
                    <div className="doctor-avatar">
                      {doctor.initials || getInitials(doctor.name)}
                    </div>

                    <span className="sample-badge">
                      {doctor.source === 'registered'
                        ? 'REGISTERED · DEMO'
                        : 'SAMPLE'}
                    </span>
                  </div>

                  <h3>{doctor.name}</h3>

                  <p className="doctor-specialty">
                    {doctor.specialty} · {doctor.experience} yrs
                  </p>

                  <p className="doctor-languages">
                    {doctor.languages.join(', ') || 'Languages not provided'}
                  </p>

                  <div className="doctor-clinic">
                    <strong>{doctor.clinic}</strong>
                    <span>{doctor.location}</span>
                  </div>

                  <div className="doctor-meta">
                    <span>
                      ★{' '}
                      {doctor.rating == null
                        ? 'No rating'
                        : Number(doctor.rating).toFixed(1)}
                      {' '}({doctor.reviews || 0} reviews)
                    </span>

                    <strong>Fee ₹{doctor.fee}</strong>
                  </div>

                  <div className="doctor-actions">
                    <button
                      type="button"
                      onClick={() => openDoctor(doctor)}
                    >
                      View Doctor
                    </button>

                    <button
                      type="button"
                      onClick={() => openClinic(doctor)}
                    >
                      View Clinic
                    </button>

                    <a
                      href={mapUrl(doctor.clinic, doctor.location)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Get Directions ↗
                    </a>

                    <Link to="/patient">
                      How to Join the Queue →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="directory-ai" id="ai-help">
        <span className="eyebrow">QUEUELESS AI COMPANION</span>
        <h2>Need help choosing or joining a queue?</h2>
        <p>
          Learn how QueueLess works, understand staff-issued tokens,
          and explore clinic information. This demo section is not
          yet connected to a live AI service.
        </p>
        <Link to="/patient">Go to Patient Portal →</Link>
      </section>

      <footer className="footer">
        <Link to="/" className="brand">
          <span className="brand-icon">Q</span>
          QueueLess
        </Link>

        <span>Demo directory · Sample and locally registered profiles</span>
      </footer>
    </main>
  )
}

export default FindDoctors
