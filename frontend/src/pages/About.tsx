import { Download } from 'lucide-react'

const EDUCATION = [
{
    range: '2022 — 2024',
    degree: 'M.Sc. Software Engineering',
    org: 'Faculty of Mathematics & Computer Science, Babeş-Bolyai University',
    text: 'Focus on software architecture, design patterns and distributed systems',
  },
  {
    range: '2019 — 2022',
    degree: 'B.Sc. Computer Science',
    org: 'Faculty of Mathematics & Computer Science, Babeş-Bolyai University',
    text: 'Focus on software engineering, algorithms and data structures',
  },
]

const TIMELINE = [
{
   range: '2025 — Present',
   role: 'Software Engineer',
   org: 'BMW Group',
   text: 'Building Java services with Quarkus, deploying and maintaining applications on Kubernetes, enhancing observability and automating operational workflows with AI.',
},
{
   range: '2024 — 2025',
   role: 'Go Developer',
   org: 'AROBS Transilvania Software',
   text: 'Developing cloud-native applications in Go, building distributed services with gRPC and UDP, implementing observability with Grafana, Prometheus, Loki and Promtail.',
  },
  {
   range: '2022 — 2024',
   role: 'Java Developer',
   org: 'AROBS Transilvania Software',
   text: 'Developed enterprise microservices using Spring Boot, Java 11/17, and REST APIs, integrating Kafka, AWS and PostgreSQL in cloud-native environments.',
  },
  {
    range: '2021',
    role: 'Android Developer Intern',
    org: 'Endava',
    text: 'Mobile development',
  },
  {
    range: '2021',
    role: 'Java Developer Intern',
    org: 'Bright Network | Internship Experience U.K.',
    text: 'Java Fundamentals',
  },
]

export default function About() {
  return (
    <section>
      <div className="container about-hero">
        <div className="avatar">AI</div>
        <div className="about-bio">
          <div className="eyebrow"><span className="eyebrow-dot" />about</div>
          <a
            href="/CV.pdf"
            download
            className="btn btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.2rem', fontSize: '0.88rem' }}
          >
            <Download size={15} /> Download CV
          </a>
          <p>
            I build backend systems, AI-powered applications and platform solutions that help teams develop, monitor and operate complex systems.
            My work combines different technologies and modern AI to create reliable tools for real-world engineering challenges.
          </p>
          <p>
            I focus on creating systems that improve reliability, simplify operations and enhance the developer or user experience. 
            I enjoy solving problems that sit at the intersection of software, infrastructure and intelligence.
          </p>
          <p>
            I'm always learning and experimenting with new technologies. This is where I started sharing the projects I build, the technical challenges I solve and the lessons I learn along the way. 
            I believe that sharing knowledge is one of the best ways to grow as an engineer.
          </p>
        </div>
      </div>
      <div className="container">
        <div style={{ marginTop: '50px' }}>
          <div className="section-head"><h2 className="section-title">Path so far</h2></div>
          <div className="timeline">
            {TIMELINE.map((t, i) => (
              <div className="timeline-item" key={i}>
                <div className="timeline-range">{t.range}</div>
                <div>
                  <div className="timeline-role">{t.role}</div>
                  <div className="timeline-org">{t.org}</div>
                  <p className="timeline-text">{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: '60px' }}>
          <div className="section-head"><h2 className="section-title">Education</h2></div>
          <div className="timeline">
            {EDUCATION.map((e, i) => (
              <div className="timeline-item" key={i}>
                <div className="timeline-range">{e.range}</div>
                <div>
                  <div className="timeline-role">{e.degree}</div>
                  <div className="timeline-org">{e.org}</div>
                  <p className="timeline-text">{e.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
