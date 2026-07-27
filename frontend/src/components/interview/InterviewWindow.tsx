import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import { interviewChat, type InterviewPayload } from '../../api/client'

type Step = 'role' | 'detail' | 'freeform'
type Role = 'recruiter' | 'collaborator' | 'developer'

const ROLE_LABELS: Record<Role, string> = {
  recruiter: 'Recruiter',
  collaborator: 'Collaborator',
  developer: 'Developer',
}

const ROLE_QUESTIONS: Record<Role, string> = {
  recruiter: 'What role are you hiring for?',
  collaborator: 'What kind of project are you working on?',
  developer: 'What are you trying to learn or build?',
}

const SUGGESTIONS = [
  "What's Ana's tech stack?",
  'What projects has she built?',
  'Is she open to work?',
]

interface Msg {
  from: 'ai' | 'user'
  text: string
}

export default function InterviewWindow() {
  const [step, setStep] = useState<Step>('role')
  const [role, setRole] = useState<Role | null>(null)
  const [messages, setMessages] = useState<Msg[]>([
    { from: 'ai', text: "Hi — I'm Ana-Iulia's assistant. Who are you?" },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  function addMsg(from: 'ai' | 'user', text: string) {
    setMessages((prev) => [...prev, { from, text }])
  }

  function handleRoleSelect(selected: Role) {
    setRole(selected)
    addMsg('user', ROLE_LABELS[selected])
    addMsg('ai', ROLE_QUESTIONS[selected])
    setStep('detail')
  }

  async function sendMessage(text: string, freeform = false) {
    if (!text.trim() || loading) return
    const question = text.trim()
    setInput('')
    addMsg('user', question)
    setLoading(true)

    const payload: InterviewPayload = {
      role: role ?? 'developer',
      detail: freeform ? question : question,
      freeform,
    }

    try {
      const result = await interviewChat(payload)
      addMsg('ai', result.answer)
      if (result.sources?.length) {
        addMsg('ai', `_Sources: ${result.sources.join(', ')}_`)
      }
      if (!freeform) {
        addMsg('ai', 'Any follow-up questions?')
        setStep('freeform')
      }
    } catch {
      addMsg('ai', 'Something went wrong reaching the assistant. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="chat-window" ref={scrollRef}>
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.from === 'user' ? 'user' : 'assistant'}`}>
            <span className="msg-label">{m.from === 'user' ? 'you' : 'assistant'}</span>
            <div className="msg-bubble">{m.text}</div>
          </div>
        ))}
        {loading && (
          <div className="msg assistant">
            <span className="msg-label">assistant</span>
            <div className="msg-bubble">
              <span className="typing"><span /><span /><span /></span>
            </div>
          </div>
        )}
        {step === 'role' && (
          <div className="role-chips" style={{ paddingLeft: 0, marginTop: 4 }}>
            {(Object.keys(ROLE_LABELS) as Role[]).map((r) => (
              <button key={r} className="role-chip" onClick={() => handleRoleSelect(r)}>
                {ROLE_LABELS[r]}
              </button>
            ))}
          </div>
        )}
      </div>

      {step === 'role' && messages.length < 2 && (
        <div className="suggestions">
          {SUGGESTIONS.map((s) => (
            <button key={s} className="suggestion" onClick={() => {
              setRole('developer')
              sendMessage(s, true)
              setStep('freeform')
            }}>{s}</button>
          ))}
        </div>
      )}

      <div className="chat-input-row">
        {step !== 'role' && (
          <>
            <input
              className="chat-input"
              placeholder="Ask a question…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') sendMessage(input, step === 'freeform')
              }}
            />
            <button
              className="chat-send"
              onClick={() => sendMessage(input, step === 'freeform')}
              disabled={loading || !input.trim()}
              aria-label="Send"
            >
              <Send size={17} />
            </button>
          </>
        )}
      </div>
    </>
  )
}
