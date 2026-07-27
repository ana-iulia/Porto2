import { useNavigate } from 'react-router-dom'

export function GirlRobotIcon({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Antenna stem */}
      <line x1="22" y1="10" x2="22" y2="5" stroke="#C3A0D8" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="22" cy="4" r="2.5" fill="#C3A0D8"/>
      {/* Bow wings */}
      <path d="M13 11 C11 8 6 8 6 11 C6 14 11 14 13 11Z" fill="#E8A87C" opacity="0.9"/>
      <path d="M31 11 C33 8 38 8 38 11 C38 14 33 14 31 11Z" fill="#E8A87C" opacity="0.9"/>
      <circle cx="22" cy="11" r="2" fill="#E8A87C"/>
      {/* Head */}
      <rect x="8" y="11" width="28" height="22" rx="7" fill="#2D2440"/>
      <rect x="8" y="11" width="28" height="22" rx="7" stroke="#C3A0D8" strokeWidth="1.2" fill="none"/>
      {/* Eyes */}
      <circle cx="17" cy="21" r="4" fill="#E8A87C"/>
      <circle cx="27" cy="21" r="4" fill="#E8A87C"/>
      <circle cx="17" cy="21" r="2.2" fill="#1B1420"/>
      <circle cx="27" cy="21" r="2.2" fill="#1B1420"/>
      {/* Eye shine */}
      <circle cx="18.2" cy="19.8" r="1" fill="white"/>
      <circle cx="28.2" cy="19.8" r="1" fill="white"/>
      {/* Smile */}
      <path d="M16 28 Q22 32 28 28" stroke="#C3A0D8" strokeWidth="2" strokeLinecap="round" fill="none"/>
      {/* Cheek blush */}
      <ellipse cx="13" cy="25" rx="2.5" ry="1.5" fill="#E8A87C" opacity="0.5"/>
      <ellipse cx="31" cy="25" rx="2.5" ry="1.5" fill="#E8A87C" opacity="0.5"/>
    </svg>
  )
}

export default function ChatWidget() {
  const navigate = useNavigate()

  return (
    <div className="chat-widget">
      <button className="chat-fab" onClick={() => navigate('/interview')} aria-label="Chat with Ana's AI">
        <span className="chat-fab-mascot"><GirlRobotIcon size={30} /></span>
        <span>Let's chat</span>
      </button>
    </div>
  )
}
