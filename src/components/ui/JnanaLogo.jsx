import { useEffect, useRef } from 'react'

// Rotating Ashok Chakra Canvas
function AshokChakra({ size = 32 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    canvas.width  = size * dpr
    canvas.height = size * dpr
    ctx.scale(dpr, dpr)

    let angle = 0
    let raf

    const draw = () => {
      ctx.clearRect(0, 0, size, size)
      const cx = size / 2, cy = size / 2
      const R  = size * 0.46   // outer ring radius
      const ri = size * 0.30   // inner radius
      const hubR = size * 0.07 // hub radius

      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(angle)

      // Outer ring
      ctx.beginPath()
      ctx.arc(0, 0, R, 0, Math.PI * 2)
      ctx.strokeStyle = '#06038D'
      ctx.lineWidth = size * 0.06
      ctx.stroke()

      // Inner ring
      ctx.beginPath()
      ctx.arc(0, 0, ri * 0.55, 0, Math.PI * 2)
      ctx.strokeStyle = '#06038D'
      ctx.lineWidth = size * 0.04
      ctx.stroke()

      // 24 spokes
      for (let i = 0; i < 24; i++) {
        const a = (i * Math.PI * 2) / 24
        const cos = Math.cos(a), sin = Math.sin(a)

        // Main spoke line
        ctx.beginPath()
        ctx.moveTo(cos * (ri * 0.55 + size * 0.02), sin * (ri * 0.55 + size * 0.02))
        ctx.lineTo(cos * (R - size * 0.04), sin * (R - size * 0.04))
        ctx.strokeStyle = '#06038D'
        ctx.lineWidth = size * 0.025
        ctx.lineCap = 'round'
        ctx.stroke()

        // Teardrop tip on outer ring
        const tx = cos * (R - size * 0.01)
        const ty = sin * (R - size * 0.01)
        ctx.beginPath()
        ctx.arc(tx, ty, size * 0.025, 0, Math.PI * 2)
        ctx.fillStyle = '#06038D'
        ctx.fill()
      }

      // Hub dot
      ctx.beginPath()
      ctx.arc(0, 0, hubR, 0, Math.PI * 2)
      ctx.fillStyle = '#06038D'
      ctx.fill()

      ctx.restore()

      angle += 0.018 // smooth rotation speed
      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(raf)
  }, [size])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size, display: 'inline-block', verticalAlign: 'middle' }}
    />
  )
}

// Full JNANA Logo
export default function JnanaLogo({ size = 'lg' }) {
  const fontSize = size === 'lg' ? 30 : size === 'xl' ? 44 : 22
  const chakraSize = size === 'lg' ? 34 : size === 'xl' ? 50 : 26

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: fontSize,
      letterSpacing: -1,
      lineHeight: 1,
      filter: 'drop-shadow(0 0 18px rgba(255,107,0,0.3))',
      userSelect: 'none',
    }}>
      {/* J — Saffron/Orange */}
      <span style={{
        color: '#FF6B00',
        textShadow: '0 0 20px rgba(255,107,0,0.6), 0 0 40px rgba(255,107,0,0.3)',
        display: 'inline-block',
        animation: 'letterPop 3s ease-in-out infinite',
        animationDelay: '0s',
      }}>J</span>

      {/* N — Saffron/Orange */}
      <span style={{
        color: '#FF8C00',
        textShadow: '0 0 20px rgba(255,140,0,0.5)',
        display: 'inline-block',
        animation: 'letterPop 3s ease-in-out infinite',
        animationDelay: '0.1s',
      }}>N</span>

      {/* A — Ashok Chakra wheel */}
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: chakraSize + 4,
        height: fontSize + 4,
        position: 'relative',
        marginBottom: -2,
      }}>
        <AshokChakra size={chakraSize} />
      </span>

      {/* N — Green */}
      <span style={{
        color: '#138808',
        textShadow: '0 0 20px rgba(19,136,8,0.5)',
        display: 'inline-block',
        animation: 'letterPop 3s ease-in-out infinite',
        animationDelay: '0.3s',
      }}>N</span>

      {/* A — Green */}
      <span style={{
        color: '#138808',
        textShadow: '0 0 20px rgba(19,136,8,0.6), 0 0 40px rgba(19,136,8,0.3)',
        display: 'inline-block',
        animation: 'letterPop 3s ease-in-out infinite',
        animationDelay: '0.4s',
      }}>A</span>

      <style>{`
        @keyframes letterPop {
          0%,100% { transform: translateY(0) scale(1); }
          50%      { transform: translateY(-2px) scale(1.04); }
        }
      `}</style>
    </div>
  )
}
