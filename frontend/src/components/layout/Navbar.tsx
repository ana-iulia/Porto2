import { useNavigate, useLocation } from 'react-router-dom'

const TABS = [
  { to: '/', label: 'home.tsx' },
  { to: '/about', label: 'about.tsx' },
  { to: '/projects', label: 'projects.tsx' },
  { to: '/blog', label: 'blog.tsx' },
  { to: '/interview', label: 'chat.tsx' },
]

export default function Navbar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  function isActive(to: string) {
    if (to === '/') return pathname === '/'
    return pathname.startsWith(to)
  }

  return (
    <nav className="nav">
      <div className="nav-inner">
        <button className="nav-brand" onClick={() => navigate('/')}>
          <span className="nav-brand-mark">AI</span>
          <span className="nav-tab-ext">ana-iulia enache</span>
        </button>
        <div className="nav-tabs">
          <span className="nav-dots">
            <span className="nav-dot" />
            <span className="nav-dot" />
            <span className="nav-dot" />
          </span>
          {TABS.map(({ to, label }) => (
            <button
              key={to}
              className={`nav-tab ${isActive(to) ? 'active' : ''}`}
              onClick={() => navigate(to)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
