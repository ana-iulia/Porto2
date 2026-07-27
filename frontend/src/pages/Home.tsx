import { useNavigate } from 'react-router-dom'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { useTypewriter, type Token } from '../hooks/useTypewriter'
import { projects } from '../data/projects'
import { blogPosts } from '../data/blogPosts'
import ProjectCard from '../components/projects/ProjectCard'
import BlogListItem from '../components/blog/BlogListItem'

const HERO_TOKENS: Token[] = [
  { t: 'const ', c: 'kw' },
  { t: 'ana-iulia', c: 'var' },
  { t: ' = {\n', c: 'punct' },
  { t: '  role', c: 'key' },
  { t: ': ', c: 'punct' },
  { t: "'software engineer'", c: 'str' },
  { t: ',\n', c: 'punct' },
  { t: '  builds', c: 'key' },
  { t: ': ', c: 'punct' },
  { t: "['AI applications', 'distributed systems']", c: 'str' },
  { t: ',\n', c: 'punct' },
  { t: '  believes', c: 'key' },
  { t: ': ', c: 'punct' },
  { t: "'ai should be grounded, great software solves real problems'", c: 'str' },
  { t: ',\n', c: 'punct' },
  { t: '};', c: 'punct' },
]

const SKILLS = [
  { group: 'Languages', items: ['Java', 'Go', 'Python', 'TypeScript', 'SQL'] },
  { group: 'AI', items: ['LangChain', 'RAG', 'LLMs', 'AI Agents'] },
  { group: 'Backend', items: ['Kafka', 'REST APIs', 'Spring Boot'] },
  { group: 'Cloud & DevOps', items: ['Kubernetes', 'AWS', 'Docker', 'Azure DevOps'] },
  { group: 'Observability', items: ['Grafana', 'Prometheus', 'Loki', 'Promtail'] },
  { group: 'Databases', items: ['PostgreSQL', 'SQLite', 'JPA/Hibernate'] },
]

function CodeHero() {
  const { rendered, done } = useTypewriter(HERO_TOKENS, true)
  return (
    <div className="code-window">
      <div className="code-header">
        <span className="nav-dot" style={{ background: 'var(--accent)' }} />
        <span className="nav-dot" style={{ background: 'var(--accent2)' }} />
        <span className="nav-dot" style={{ background: 'var(--accent3)' }} />
        <span className="code-filename">ana.ts</span>
      </div>
      <div className="code-body">
        <pre><code>
          {rendered.map((r, i) => (
            <span key={i} className={`tok-${r.c}`}>{r.text}</span>
          ))}
          <span className="cursor" />
        </code></pre>
      </div>
      <div className="code-status">{done ? '// eager to find solutions suited to your needs' : '\u00a0'}</div>
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const featured = projects.filter((p) => p.featured).slice(0, 2)
  const recentPosts = blogPosts.slice(0, 2)

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="eyebrow"><span className="eyebrow-dot" />welcome to my page</div>
            <h1 className="h1">Hi, I'm Ana-Iulia.<br />I build <em>intelligent</em><br />systems</h1>
            <p className="lede">
              Software Engineer focused on AI, platform engineering and distributed systems - transforming complex ideas into scalable products.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => navigate('/projects')}>
                View projects <ArrowUpRight size={16} />
              </button>
              <button className="btn btn-ghost" onClick={() => navigate('/interview')}>
                <Sparkles size={16} /> Ask me anything
              </button>
            </div>
          </div>
          <CodeHero />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">Selected work</h2>
            <button className="btn btn-ghost" style={{ padding: '8px 14px', fontSize: '0.82rem' }} onClick={() => navigate('/projects')}>
              All projects
            </button>
          </div>
          <div className="project-grid">
            {featured.map((p) => <ProjectCard key={p.id} project={p} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head"><h2 className="section-title">Toolkit</h2></div>
          <div className="skills-grid">
            {SKILLS.map((s) => (
              <div key={s.group}>
                <div className="skill-group-title">{s.group}</div>
                <div className="chip-col">
                  {s.items.map((i) => <span className="chip" key={i}>{i}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">From the blog</h2>
            <button className="btn btn-ghost" style={{ padding: '8px 14px', fontSize: '0.82rem' }} onClick={() => navigate('/blog')}>
              Read more
            </button>
          </div>
          <div className="blog-list">
            {recentPosts.map((p) => (
              <BlogListItem key={p.slug} post={p} onClick={() => navigate(`/blog/${p.slug}`)} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
