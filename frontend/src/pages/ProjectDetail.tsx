import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { projects } from '../data/projects'

export default function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = projects.find((p) => p.id === id)
  const [active, setActive] = useState(0)

  if (!project) {
    return (
      <section className="section">
        <div className="container">
          <p>Project not found.</p>
          <button className="btn btn-ghost" onClick={() => navigate('/projects')}>
            <ArrowLeft size={15} /> Back
          </button>
        </div>
      </section>
    )
  }

  const images = project.images ?? []

  return (
    <section className="section" style={{ borderTop: 'none', paddingTop: '48px' }}>
      <div className="container">
        <button
          className="btn btn-ghost"
          onClick={() => navigate('/projects')}
          style={{ marginBottom: '2rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}
        >
          <ArrowLeft size={14} /> All projects
        </button>

        <div className="project-detail-grid">
          {/* ── LEFT: info ── */}
          <div className="project-detail-info">
            <div className="eyebrow" style={{ marginBottom: 8 }}>
              <span className="eyebrow-dot" />{project.tags[0]}
            </div>
            <h1 className="section-title" style={{ marginBottom: '1rem' }}>{project.title}</h1>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: '2rem' }}>
              {project.longDescription ?? project.description}
            </p>

            {project.highlights && project.highlights.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-faint)', marginBottom: '0.75rem' }}>
                  Highlights
                </h3>
                <ul className="project-detail-highlights">
                  {project.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="tags" style={{ marginBottom: '2rem' }}>
              {project.tags.map((t) => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>

          {/* ── RIGHT: images ── */}
          {images.length > 0 && (
            <div className="project-detail-gallery">
              <div className="project-detail-main-img">
                <img src={images[active]} alt={`${project.title} screenshot ${active + 1}`} />
              </div>
              {images.length > 1 && (
                <div className="project-detail-thumbs">
                  {images.map((src, i) => (
                    <button
                      key={i}
                      className={`project-detail-thumb${i === active ? ' active' : ''}`}
                      onClick={() => setActive(i)}
                    >
                      <img src={src} alt={`Thumb ${i + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
