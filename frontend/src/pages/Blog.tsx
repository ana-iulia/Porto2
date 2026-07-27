import { useNavigate } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'
import BlogListItem from '../components/blog/BlogListItem'

export default function Blog() {
  const navigate = useNavigate()
  return (
    <section className="section" style={{ borderTop: 'none', paddingTop: '56px' }}>
      <div className="container">
        <div className="eyebrow" style={{ marginBottom: 8 }}><span className="eyebrow-dot" />writing</div>
        <div className="section-head">
          <h2 className="section-title">Notes on the craft</h2>
          <span className="section-sub">{blogPosts.length} posts</span>
        </div>
        <div className="blog-list">
          {blogPosts.map((post) => (
            <BlogListItem key={post.slug} post={post} onClick={() => navigate(`/blog/${post.slug}`)} />
          ))}
        </div>
      </div>
    </section>
  )
}
