import type { BlogPost } from '../../data/blogPosts'

interface Props {
  post: BlogPost
}

export default function PostCard({ post }: Props) {
  return (
    <div className="border border-gray-100 rounded-xl p-5 hover:shadow-md transition">
      <p className="text-xs text-gray-400 font-mono mb-1">{post.date}</p>
      <h3 className="font-semibold text-lg mb-2 hover:text-indigo-600 transition">{post.title}</h3>
      <p className="text-gray-500 text-sm mb-3">{post.summary}</p>
      <div className="flex gap-2">
        {post.tags.map((t) => (
          <span key={t} className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-500">{t}</span>
        ))}
      </div>
    </div>
  )
}
