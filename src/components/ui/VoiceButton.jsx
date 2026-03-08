import { useEffect, useRef } from 'react'

export default function VoiceButton({ listening, onToggle, supported, volume = 0, disabled }) {
  const canvasRef = useRef(null)
  const rafRef    = useRef(null)

  useEffect(() => {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    const W = c.width = 56, H = c.height = 56, cx = W/2, cy = H/2
    let t = 0

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      if (listening) {
        // Pulsing rings based on volume
        const rings = 3
        for (let i = 0; i < rings; i++) {
          const phase  = (t * 0.05 + i * 0.3) % 1
          const r      = 20 + phase * 16 + (volume / 100) * 6
          const alpha  = (1 - phase) * 0.4
          ctx.beginPath()
          ctx.arc(cx, cy, r, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(255,107,0,${alpha})`
          ctx.lineWidth = 1.5
          ctx.stroke()
        }
        // Waveform bars
        const bars = 5
        for (let i = 0; i < bars; i++) {
          const h = 6 + Math.sin(t * 0.12 + i * 0.8) * 4 + (volume / 100) * 8
          ctx.fillStyle = `rgba(255,107,0,0.9)`
          ctx.beginPath()
          ctx.roundRect(cx - bars*4 + i*8, cy - h/2, 4, h, 2)
          ctx.fill()
        }
      } else {
        // Mic icon
        ctx.fillStyle = 'rgba(255,107,0,0.15)'
        ctx.beginPath(); ctx.arc(cx, cy, 20, 0, Math.PI*2); ctx.fill()
        // Mic body
        ctx.strokeStyle = 'rgba(255,107,0,0.8)'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.roundRect(cx-5, cy-10, 10, 14, 5)
        ctx.stroke()
        // Mic stand
        ctx.beginPath()
        ctx.arc(cx, cy+4, 8, Math.PI, 2*Math.PI)
        ctx.moveTo(cx, cy+12); ctx.lineTo(cx, cy+16)
        ctx.moveTo(cx-4, cy+16); ctx.lineTo(cx+4, cy+16)
        ctx.stroke()
      }
      t++
      rafRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(rafRef.current)
  }, [listening, volume])

  if (!supported) return null

  return (
    <button
      onClick={onToggle}
      disabled={disabled}
      title={listening ? 'Stop listening' : 'Speak your query'}
      style={{
        background: listening ? 'rgba(255,107,0,0.12)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${listening ? 'rgba(255,107,0,0.5)' : 'var(--border-subtle)'}`,
        borderRadius: 10, width: 52, height: 52, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.2s', padding: 0, flexShrink: 0,
        boxShadow: listening ? '0 0 20px rgba(255,107,0,0.25)' : 'none',
      }}
    >
      <canvas ref={canvasRef} style={{ width: 56, height: 56 }} />
    </button>
  )
}
