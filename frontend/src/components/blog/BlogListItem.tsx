import { ArrowUpRight, Calendar, Clock } from 'lucide-react'
import type { BlogPost } from '../../data/blogPosts'

interface Props {
  post: BlogPost
  onClick: () => void
}

export default function BlogListItem({ post, onClick }: Props) {
  return (
    <button className="blog-item" onClick={onClick}>
      <div>
        <div className="blog-meta">
          <span><Calendar size={11} style={{ verticalAlign: '-2px', marginRight: 5 }} />{post.date}</span>
          {post.readTime && <span><Clock size={11} style={{ verticalAlign: '-2px', marginRight: 5 }} />{post.readTime}</span>}
          {post.tag && <span>{post.tag}</span>}
        </div>
        <h3 className="blog-title">{post.title}</h3>
        <p className="blog-excerpt">{post.summary}</p>
      </div>
      <ArrowUpRight className="blog-arrow" size={20} />
    </button>
  )
}
