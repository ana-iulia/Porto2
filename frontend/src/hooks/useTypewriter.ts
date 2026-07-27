import { useState, useEffect, useMemo } from 'react'

export interface Token {
  t: string
  c: 'kw' | 'var' | 'punct' | 'key' | 'str'
}

export function useTypewriter(tokens: Token[], active: boolean) {
  const fullLength = useMemo(
    () => tokens.reduce((n, tk) => n + tk.t.length, 0),
    [tokens]
  )

  const reduceMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
    []
  )

  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    if (reduceMotion) {
      setCount(fullLength)
      return
    }
    setCount(0)
    let n = 0
    const id = setInterval(() => {
      n += 1
      setCount(n)
      if (n >= fullLength) clearInterval(id)
    }, 16)
    return () => clearInterval(id)
  }, [active, fullLength, reduceMotion])

  const rendered: { text: string; c: string }[] = []
  let consumed = 0
  for (const tk of tokens) {
    const remaining = count - consumed
    if (remaining <= 0) break
    rendered.push({ text: tk.t.slice(0, remaining), c: tk.c })
    consumed += tk.t.length
  }

  return { rendered, done: count >= fullLength }
}
