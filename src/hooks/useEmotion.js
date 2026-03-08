import { useState, useEffect } from 'react'
import { EMOTION_PROFILES } from '../constants'

export const detectEmotion = (text) => {
  if (!text || text.length < 4) return null
  for (const [key, p] of Object.entries(EMOTION_PROFILES)) {
    if (p.keywords.test(text)) return { key, ...p }
  }
  return { key:'neutral', label:'Neutral', icon:'⚪', color:'#8A8A9E', priority:'NORMAL' }
}

export const useEmotion = (text, delay = 400) => {
  const [emotion, setEmotion] = useState(null)
  useEffect(() => {
    if (!text || text.length < 5) { setEmotion(null); return }
    const t = setTimeout(() => setEmotion(detectEmotion(text)), delay)
    return () => clearTimeout(t)
  }, [text, delay])
  return emotion
}
