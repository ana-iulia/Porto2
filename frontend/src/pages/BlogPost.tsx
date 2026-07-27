import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import { blogPosts } from '../data/blogPosts'
import MDXRenderer from '../components/blog/MDXRenderer'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div className="container post-header">
        <button className="back-btn" onClick={() => navigate('/blog')}>
          <ArrowLeft size={14} /> back to blog
        </button>
        <p style={{ color: 'var(--text-faint)' }}>Post not found.</p>
      </div>
    )
  }

  return (
    <section>
      <div className="container post-header">
        <button className="back-btn" onClick={() => navigate('/blog')}>
          <ArrowLeft size={14} /> back to blog
        </button>
        <div className="blog-meta">
          <span><Calendar size={11} style={{ verticalAlign: '-2px', marginRight: 5 }} />{post.date}</span>
          {post.readTime && <span><Clock size={11} style={{ verticalAlign: '-2px', marginRight: 5 }} />{post.readTime}</span>}
          {post.tag && <span>{post.tag}</span>}
        </div>
        <h1 className="post-title">{post.title}</h1>
      </div>
      <div className="container">
        <div className="post-body">
          <MDXRenderer slug={post.slug} />
        </div>
      </div>
    </section>
  )
}
