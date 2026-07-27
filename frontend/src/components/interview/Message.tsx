import ReactMarkdown from 'react-markdown'

interface Props {
  from: 'ai' | 'user'
  text: string
}

export default function Message({ from, text }: Props) {
  const isAI = from === 'ai'
  return (
    <div className={`flex ${isAI ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-xs sm:max-w-sm px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
          isAI
            ? 'bg-white border border-gray-100 text-gray-700'
            : 'bg-indigo-600 text-white'
        }`}
      >
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
    </div>
  )
}
