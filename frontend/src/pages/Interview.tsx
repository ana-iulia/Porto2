import InterviewWindow from '../components/interview/InterviewWindow'
import { GirlRobotIcon } from '../components/chat/ChatWidget'
import { Download } from 'lucide-react'
export default function Interview() {
  return (
    <section>
      <div className="container chat-wrap">
        <div className="chat-header">
          <div className="eyebrow"><span className="eyebrow-dot" />chat</div>
          <h1 className="chat-title" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <GirlRobotIcon size={52} />
            Ask about Ana
          </h1>
          <p className="chat-sub">
            Tell me who you are and I'll give you a tailored summary or just ask anything directly.
            Grounded in real experience, no hallucinations.
          </p>
          <a
            href="/CV.pdf"
            download
            className="btn btn-ghost"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', marginTop: '0.5rem' }}
          >
            <Download size={13} /> Download CV
          </a>
        </div>
        <InterviewWindow />
      </div>
    </section>
  )
}
