import { useCallback, useState } from 'react'
import Registration from './components/Registration'
import Home from './pages/Home'

const PAGES = {
  HOME: 'home',
  REGISTER: 'register',
}

export default function App() {
  const [activePage, setActivePage] = useState(PAGES.HOME)
  const [submittedStudent, setSubmittedStudent] = useState(null)

  const navigateTo = useCallback((page) => {
    setActivePage(page)
  }, [])

  const handleRegistrationSuccess = useCallback((student) => {
    setSubmittedStudent(student)
    setActivePage(PAGES.HOME)
  }, [])

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Student Portal</p>
          <h1>Registration Dashboard</h1>
        </div>
        <nav className="topbar-actions" aria-label="Primary navigation">
          <button
            type="button"
            className={activePage === PAGES.HOME ? 'nav-button active' : 'nav-button'}
            onClick={() => navigateTo(PAGES.HOME)}
          >
            Home
          </button>
          <button
            type="button"
            className={activePage === PAGES.REGISTER ? 'nav-button active' : 'nav-button'}
            onClick={() => navigateTo(PAGES.REGISTER)}
          >
            Register
          </button>
        </nav>
      </header>

      <main className="page-shell">
        {activePage === PAGES.HOME ? (
          <Home
            latestRegistration={submittedStudent}
            onStartRegistration={() => navigateTo(PAGES.REGISTER)}
          />
        ) : (
          <Registration
            onBack={() => navigateTo(PAGES.HOME)}
            onSubmitSuccess={handleRegistrationSuccess}
          />
        )}
      </main>
    </div>
  )
}
