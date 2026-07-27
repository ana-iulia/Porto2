const BASE = (import.meta.env.VITE_API_URL ?? '') + '/api'

export interface InterviewPayload {
  role: 'recruiter' | 'collaborator' | 'developer'
  detail: string
  freeform?: boolean
}

export interface ChatResponse {
  answer: string
  sources?: string[]
}

export async function interviewChat(payload: InterviewPayload): Promise<ChatResponse> {
  const res = await fetch(`${BASE}/interview`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('API error')
  return res.json() as Promise<ChatResponse>
}
