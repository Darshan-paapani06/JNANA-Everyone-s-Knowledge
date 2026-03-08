import { useState, useEffect, useRef, useCallback } from 'react'

const LANG_MAP = {
  en:'en-IN', hi:'hi-IN', ta:'ta-IN', te:'te-IN',
  bn:'bn-IN', mr:'mr-IN', gu:'gu-IN', kn:'kn-IN', ml:'ml-IN', pa:'pa-IN',
}

export const useVoice = ({ language = 'en', onResult, onError } = {}) => {
  const [listening,    setListening]    = useState(false)
  const [transcript,   setTranscript]   = useState('')
  const [supported,    setSupported]    = useState(false)
  const [volume,       setVolume]       = useState(0)
  const recognitionRef = useRef(null)
  const analyserRef    = useRef(null)
  const animFrameRef   = useRef(null)

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    setSupported(!!SR)
  }, [])

  const startVolumeMonitor = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const ctx    = new AudioContext()
      const source = ctx.createMediaStreamSource(stream)
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 256
      source.connect(analyser)
      analyserRef.current = { analyser, ctx, stream }
      const data = new Uint8Array(analyser.frequencyBinCount)
      const tick = () => {
        analyser.getByteFrequencyData(data)
        const avg = data.reduce((a, b) => a + b, 0) / data.length
        setVolume(Math.min(100, avg * 2))
        animFrameRef.current = requestAnimationFrame(tick)
      }
      tick()
    } catch (_) {}
  }, [])

  const stopVolumeMonitor = useCallback(() => {
    cancelAnimationFrame(animFrameRef.current)
    if (analyserRef.current) {
      analyserRef.current.stream.getTracks().forEach(t => t.stop())
      analyserRef.current.ctx.close()
      analyserRef.current = null
    }
    setVolume(0)
  }, [])

  const startListening = useCallback(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) return

    const rec = new SR()
    rec.continuous = false
    rec.interimResults = true
    rec.lang = LANG_MAP[language] || 'en-IN'
    rec.maxAlternatives = 1

    rec.onstart  = () => { setListening(true); startVolumeMonitor() }
    rec.onend    = () => { setListening(false); stopVolumeMonitor() }
    rec.onerror  = (e) => { setListening(false); stopVolumeMonitor(); onError?.(e.error) }
    rec.onresult = (e) => {
      const t = Array.from(e.results).map(r => r[0].transcript).join('')
      setTranscript(t)
      if (e.results[e.results.length - 1].isFinal) onResult?.(t)
    }

    recognitionRef.current = rec
    rec.start()
  }, [language, onResult, onError, startVolumeMonitor, stopVolumeMonitor])

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop()
  }, [])

  const toggleListening = useCallback(() => {
    listening ? stopListening() : startListening()
  }, [listening, startListening, stopListening])

  useEffect(() => () => { stopListening(); stopVolumeMonitor() }, [])

  return { listening, transcript, supported, volume, startListening, stopListening, toggleListening }
}
