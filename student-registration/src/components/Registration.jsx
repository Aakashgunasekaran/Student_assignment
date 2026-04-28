import { useMemo, useState } from 'react'

const initialFormState = {
  name: '',
  email: '',
  age: '',
  course: '',
  gender: '',
  skills: [],
  address: '',
}

const courseOptions = [
  'Computer Science',
  'Information Technology',
  'Electronics',
  'Mechanical Engineering',
]

const skillOptions = ['JavaScript', 'React', 'Node.js', 'UI Design']

function validateForm(values) {
  const errors = {}

  if (!values.name.trim()) {
    errors.name = 'Name is required.'
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required.'
  }

  if (!values.age) {
    errors.age = 'Age is required.'
  }

  if (!values.course) {
    errors.course = 'Please select a course.'
  }

  if (!values.gender) {
    errors.gender = 'Please choose a gender.'
  }

  return errors
}

export default function Registration({ onBack, onSubmitSuccess }) {
  const [formData, setFormData] = useState(initialFormState)
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const selectedSkillsLabel = useMemo(() => {
    if (formData.skills.length === 0) {
      return 'No skills selected'
    }

    return formData.skills.join(', ')
  }, [formData.skills])

  const handleInputChange = (event) => {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))

    setErrors((current) => {
      if (!current[name]) {
        return current
      }

      const nextErrors = { ...current }
      delete nextErrors[name]
      return nextErrors
    })
  }

  const handleSkillChange = (event) => {
    const { value, checked } = event.target

    setFormData((current) => ({
      ...current,
      skills: checked
        ? [...current.skills, value]
        : current.skills.filter((skill) => skill !== value),
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSubmitted(true)

    const validationErrors = validateForm(formData)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    onSubmitSuccess({
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim(),
      address: formData.address.trim(),
    })

    setFormData(initialFormState)
    setErrors({})
    setIsSubmitted(false)
  }

  return (
    <section className="panel form-panel" aria-labelledby="registration-title">
      <div className="panel-header">
        <div>
          <p className="section-tag">Admissions</p>
          <h2 id="registration-title">Student Registration Form</h2>
          <p className="section-copy">
            Capture student details with a controlled form and lightweight validation.
          </p>
        </div>
        <button type="button" className="secondary-button" onClick={onBack}>
          Back to Home
        </button>
      </div>

      <form className="registration-form" onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <label className="field">
            <span>Name *</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter full name"
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name ? <small className="error-text">{errors.name}</small> : null}
          </label>

          <label className="field">
            <span>Email *</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email address"
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email ? <small className="error-text">{errors.email}</small> : null}
          </label>

          <label className="field">
            <span>Age *</span>
            <input
              type="number"
              name="age"
              min="1"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="Enter age"
              aria-invalid={Boolean(errors.age)}
            />
            {errors.age ? <small className="error-text">{errors.age}</small> : null}
          </label>

          <label className="field">
            <span>Course *</span>
            <select
              name="course"
              value={formData.course}
              onChange={handleInputChange}
              aria-invalid={Boolean(errors.course)}
            >
              <option value="">Select a course</option>
              {courseOptions.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
            {errors.course ? <small className="error-text">{errors.course}</small> : null}
          </label>
        </div>

        <fieldset className="field-group">
          <legend>Gender *</legend>
          <div className="choice-row">
            {['Male', 'Female', 'Other'].map((option) => (
              <label key={option} className="choice-pill">
                <input
                  type="radio"
                  name="gender"
                  value={option}
                  checked={formData.gender === option}
                  onChange={handleInputChange}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          {errors.gender ? <small className="error-text">{errors.gender}</small> : null}
        </fieldset>

        <fieldset className="field-group">
          <legend>Skills</legend>
          <div className="choice-row">
            {skillOptions.map((skill) => (
              <label key={skill} className="choice-pill">
                <input
                  type="checkbox"
                  value={skill}
                  checked={formData.skills.includes(skill)}
                  onChange={handleSkillChange}
                />
                <span>{skill}</span>
              </label>
            ))}
          </div>
          <p className="helper-text">Selected: {selectedSkillsLabel}</p>
        </fieldset>

        <label className="field">
          <span>Address</span>
          <textarea
            name="address"
            rows="4"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter address"
          />
        </label>

        <div className="form-actions">
          <button type="button" className="secondary-button" onClick={onBack}>
            Cancel
          </button>
          <button type="submit" className="primary-button">
            Submit Registration
          </button>
        </div>

        {isSubmitted && Object.keys(errors).length > 0 ? (
          <p className="form-status" role="alert">
            Please fix the highlighted fields before submitting.
          </p>
        ) : null}
      </form>
    </section>
  )
}
