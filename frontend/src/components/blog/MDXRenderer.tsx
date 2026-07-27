import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Props {
  slug: string
}

export default function MDXRenderer({ slug }: Props) {
  const [content, setContent] = useState<string>('')

  useEffect(() => {
    import(`../../content/blog/${slug}.md?raw`)
      .then((mod) => setContent(mod.default as string))
      .catch(() => setContent('Post content not found.'))
  }, [slug])

  return (
    <article className="prose prose-gray max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  )
}
