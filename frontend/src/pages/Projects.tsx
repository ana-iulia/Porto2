import { projects } from '../data/projects'
import ProjectCard from '../components/projects/ProjectCard'

export default function Projects() {
  return (
    <section className="section" style={{ borderTop: 'none', paddingTop: '56px' }}>
      <div className="container">
        <div className="eyebrow" style={{ marginBottom: 8 }}><span className="eyebrow-dot" />projects</div>
        <div className="section-head">
          <h2 className="section-title">Things I've built</h2>
          <span className="section-sub">{projects.length} projects</span>
        </div>
        <div className="project-grid">
          {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>
      </div>
    </section>
  )
}
