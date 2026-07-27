import { Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span className="footer-note">© {new Date().getFullYear()} Ana-Iulia Enache</span>
        <div className="social">
          <a href="https://github.com/ana-iulia" target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={17} />
          </a>
          <a href="https://www.linkedin.com/in/ana-iulia-enache-24b159145" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin size={17} />
          </a>
          <a href="mailto:anaiuliaenache@gmail.com" aria-label="Email">
            <Mail size={17} />
          </a>
        </div>
      </div>
    </footer>
  )
}
