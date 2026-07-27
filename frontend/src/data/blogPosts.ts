export interface BlogPost {
  slug: string
  title: string
  date: string
  summary: string
  tags: string[]
  readTime?: string
  tag?: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'building-safe-rag-pipeline',
    title: "How I Built the RAG Pipeline for Lumi — and What I'd Improve",
    date: 'Jul 27, 2026',
    summary:
      'The chunk → embed → retrieve → generate pipeline behind Lumi, two code examples, the safety guardrails baked into the system prompt, and an honest look at what is missing.',
    tags: ['RAG', 'LangChain', 'ChromaDB', 'Health AI'],
    readTime: '6 min',
    tag: 'Engineering',
  },
  {
    slug: 'serious-games-for-professionals',
    title: 'Serious Games for Professionals',
    date: '2023-02-10',
   summary:"Serious games turn learning into an interactive experience, helping teams build technical and collaborative skills through realistic, goal-oriented scenarios.",
    tags: ['Serious Games', 'Learning', 'Software Engineering'],
    readTime: '5 min',
    tag: 'Professional Development',
  },
]
