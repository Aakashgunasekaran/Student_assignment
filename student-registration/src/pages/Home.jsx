export default function Home({ latestRegistration, onStartRegistration }) {
  return (
    <section className="home-layout">
      <div className="panel hero-panel">
        <p className="section-tag">Overview</p>
        <h2>Welcome to the Student Registration Portal</h2>
        <p className="section-copy">
          Manage admissions with a simple two-page flow built on React state, controlled
          inputs, and a responsive layout.
        </p>
        <div className="hero-actions">
          <button type="button" className="primary-button" onClick={onStartRegistration}>
            Open Registration Form
          </button>
        </div>
      </div>

      <div className="panel info-panel">
        <p className="section-tag">Highlights</p>
        <ul className="feature-list">
          <li>Required field validation for key student details</li>
          <li>Course, gender, skills, and address input support</li>
          <li>State-based navigation without adding a router dependency</li>
        </ul>
      </div>

      <div className="panel summary-panel">
        <p className="section-tag">Latest Submission</p>
        {latestRegistration ? (
          <dl className="summary-grid">
            <div>
              <dt>Name</dt>
              <dd>{latestRegistration.name}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{latestRegistration.email}</dd>
            </div>
            <div>
              <dt>Course</dt>
              <dd>{latestRegistration.course}</dd>
            </div>
            <div>
              <dt>Skills</dt>
              <dd>
                {latestRegistration.skills.length > 0
                  ? latestRegistration.skills.join(', ')
                  : 'No skills selected'}
              </dd>
            </div>
          </dl>
        ) : (
          <p className="section-copy">
            No registration has been submitted yet. Use the form to create the first one.
          </p>
        )}
      </div>
    </section>
  )
}
