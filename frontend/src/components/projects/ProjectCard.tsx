import type { Project } from '../../data/projects'

interface Props {
  project: Project
}

export default function ProjectCard({ project }: Props) {
  return (
    <div className="card">
      <div className="card-top">
        <span className="card-name">{project.title}</span>
      </div>
      <p className="card-blurb">{project.description}</p>
      <div className="tags">
        {project.tags.map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
    </div>
  )
}
