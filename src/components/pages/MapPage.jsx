import { useState, useEffect, useRef, useCallback } from 'react'
import { INDIA_STATES, DOMAINS } from '../../constants'
import { queryLogs } from '../../lib/supabase'

// Generate realistic mock query data per state
const genStateData = () => {
  const domains = DOMAINS.map(d => d.id)
  return INDIA_STATES.reduce((acc, s) => {
    const base = Math.floor(s.pop * 0.8 + Math.random() * 200)
    acc[s.id] = {
      total:   base,
      today:   Math.floor(base * 0.04 + Math.random() * 30),
      domains: Object.fromEntries(domains.map(d => [d, Math.floor(Math.random() * base * 0.3)])),
      trend:   Math.random() > 0.4 ? 'up' : 'down',
      lastQuery: `${Math.floor(Math.random()*59)+1}m ago`,
    }
    return acc
  }, {})
}

const MAX_QUERIES = 220

export default function MapPage() {
  const canvasRef     = useRef(null)
  const [stateData]   = useState(genStateData)
  const [hovered,     setHovered]   = useState(null)
  const [selected,    setSelected]  = useState(null)
  const [liveQueries, setLiveQueries] = useState([])
  const [totalToday,  setTotalToday]  = useState(18442)
  const rafRef        = useRef(null)
  const particlesRef  = useRef([])
  const tRef          = useRef(0)

  // Simulate live queries streaming in
  useEffect(() => {
    const states = INDIA_STATES
    const domains = DOMAINS
    const add = () => {
      const st  = states[Math.floor(Math.random() * states.length)]
      const dom = domains[Math.floor(Math.random() * domains.length)]
      const queries = ['farmer loan waiver','ration card apply','PM-KISAN status','land record','health scheme','job card','school admission','water supply complaint']
      setLiveQueries(prev => [{
        id: Date.now(), state: st.name, stateId: st.id,
        domain: dom.label, domainColor: dom.color, icon: dom.icon,
        query: queries[Math.floor(Math.random()*queries.length)],
        ts: 'just now',
      }, ...prev].slice(0, 12))
      setTotalToday(t => t + 1)
      // Add particle burst on canvas
      const c = canvasRef.current
      if (c) {
        const W = c.width, H = c.height
        const node = INDIA_STATES.find(s => s.id === st.id)
        if (node) {
          const px = (node.x / 100) * W
          const py = (node.y / 100) * H
          for (let i = 0; i < 5; i++) {
            particlesRef.current.push({
              x: px, y: py,
              vx: (Math.random()-0.5)*3,
              vy: (Math.random()-0.5)*3,
              life: 1, color: dom.color, r: Math.random()*3+1,
            })
          }
        }
      }
    }
    const id = setInterval(add, 1800)
    return () => clearInterval(id)
  }, [])

  // Canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      const W = canvas.offsetWidth, H = canvas.offsetHeight
      ctx.clearRect(0, 0, W, H)
      tRef.current += 0.02

      INDIA_STATES.forEach(state => {
        const px = (state.x / 100) * W
        const py = (state.y / 100) * H
        const data = stateData[state.id]
        if (!data) return

        const isHov = hovered === state.id
        const isSel = selected === state.id
        const intensity = Math.min(1, data.total / MAX_QUERIES)
        const baseR = 6 + intensity * 14
        const r = isHov || isSel ? baseR + 4 : baseR

        // Pulse ring for active states
        if (data.today > 15 || isSel) {
          const pScale = (Math.sin(tRef.current * 2 + px * 0.01) + 1) / 2
          const pR = r + pScale * 14
          const pAlpha = (1 - pScale) * 0.35
          ctx.beginPath()
          ctx.arc(px, py, pR, 0, Math.PI * 2)
          ctx.strokeStyle = `${state.color}${Math.floor(pAlpha*255).toString(16).padStart(2,'0')}`
          ctx.lineWidth = 1.5
          ctx.stroke()
        }

        // Glow
        const grd = ctx.createRadialGradient(px, py, 0, px, py, r * 2.2)
        grd.addColorStop(0, state.color + (isHov ? '60' : '30'))
        grd.addColorStop(1, 'transparent')
        ctx.beginPath(); ctx.arc(px, py, r * 2.2, 0, Math.PI * 2)
        ctx.fillStyle = grd; ctx.fill()

        // Node circle
        ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2)
        ctx.fillStyle = isSel ? state.color : isHov ? state.color + 'CC' : state.color + '80'
        ctx.fill()
        if (isSel || isHov) {
          ctx.strokeStyle = state.color; ctx.lineWidth = 2; ctx.stroke()
        }

        // Label for bigger states
        if (baseR > 12 || isHov || isSel) {
          ctx.fillStyle = isHov || isSel ? 'white' : 'rgba(240,237,232,0.7)'
          ctx.font = `${isHov || isSel ? 'bold ' : ''}${isHov || isSel ? 11 : 9}px Syne, sans-serif`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(state.id, px, py)
        }
      })

      // Particles
      particlesRef.current = particlesRef.current.filter(p => p.life > 0.01)
      particlesRef.current.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2)
        ctx.fillStyle = p.color + Math.floor(p.life * 220).toString(16).padStart(2,'0')
        ctx.fill()
        p.x += p.vx; p.y += p.vy; p.life *= 0.92; p.vx *= 0.95; p.vy *= 0.95
      })

      // Connection lines between high-activity nodes
      const top5 = [...INDIA_STATES].sort((a,b) => (stateData[b.id]?.total||0) - (stateData[a.id]?.total||0)).slice(0,5)
      top5.forEach((a, i) => {
        if (i === 0) return
        const na = top5[0], nb = a
        const pxa = (na.x/100)*W, pya = (na.y/100)*H
        const pxb = (nb.x/100)*W, pyb = (nb.y/100)*H
        const grd2 = ctx.createLinearGradient(pxa, pya, pxb, pyb)
        grd2.addColorStop(0, na.color + '20')
        grd2.addColorStop(1, nb.color + '20')
        ctx.beginPath(); ctx.moveTo(pxa,pya); ctx.lineTo(pxb,pyb)
        ctx.strokeStyle = grd2; ctx.lineWidth = 1; ctx.setLineDash([4,6]); ctx.stroke()
        ctx.setLineDash([])
      })

      rafRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener('resize', resize) }
  }, [stateData, hovered, selected])

  // Mouse interaction
  const handleMouseMove = useCallback((e) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top
    const W = rect.width, H = rect.height
    let found = null
    for (const state of INDIA_STATES) {
      const px = (state.x / 100) * W, py = (state.y / 100) * H
      const data = stateData[state.id]
      const r = 10 + Math.min(1, (data?.total||0) / MAX_QUERIES) * 14
      if (Math.hypot(mx - px, my - py) <= r + 5) { found = state.id; break }
    }
    setHovered(found)
    canvas.style.cursor = found ? 'pointer' : 'default'
  }, [stateData])

  const handleClick = useCallback((e) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const mx = e.clientX - rect.left, my = e.clientY - rect.top
    const W = rect.width, H = rect.height
    for (const state of INDIA_STATES) {
      const px = (state.x/100)*W, py = (state.y/100)*H
      const data = stateData[state.id]
      const r = 10 + Math.min(1,(data?.total||0)/MAX_QUERIES)*14
      if (Math.hypot(mx-px, my-py) <= r+5) { setSelected(s => s===state.id ? null : state.id); return }
    }
    setSelected(null)
  }, [stateData])

  const selState  = selected  ? INDIA_STATES.find(s => s.id === selected)  : null
  const selData   = selected  ? stateData[selected] : null
  const hovState  = hovered   ? INDIA_STATES.find(s => s.id === hovered)   : null
  const hovData   = hovered   ? stateData[hovered]  : null
  const showState = selState || hovState
  const showData  = selData  || hovData

  return (
    <div style={{ maxWidth:1300, margin:'0 auto', padding:'28px 24px' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:20 }}>
        <div>
          <div className="label" style={{ marginBottom:8 }}>▸ LIVE QUERY HEATMAP</div>
          <h2 style={{ fontSize:32, fontWeight:800, letterSpacing:-1 }}>India Intelligence Map</h2>
          <p style={{ color:'var(--text-muted)', fontSize:13, marginTop:6 }}>Real-time citizen queries flowing across 28 states</p>
        </div>
        <div style={{ textAlign:'right' }}>
          <div style={{ fontSize:32, fontWeight:800, color:'var(--saffron)' }}>{totalToday.toLocaleString()}</div>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--text-muted)' }}>QUERIES TODAY</div>
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 320px', gap:20, alignItems:'start' }}>
        {/* Map Canvas */}
        <div style={{ position:'relative' }}>
          <div className="card" style={{ overflow:'hidden', borderColor:'var(--border-primary)', background:'rgba(7,7,26,0.95)', position:'relative' }}>
            {/* Map background label */}
            <div style={{ position:'absolute', top:12, left:16, fontFamily:'var(--font-mono)', fontSize:9, color:'rgba(255,107,0,0.3)', letterSpacing:2, zIndex:2 }}>
              INDIA · KNOWLEDGE NETWORK · LIVE
            </div>
            <canvas
              ref={canvasRef}
              onMouseMove={handleMouseMove}
              onClick={handleClick}
              onMouseLeave={() => setHovered(null)}
              style={{ width:'100%', height:520, display:'block' }}
            />
            {/* Tooltip */}
            {showState && showData && (
              <div className="fade-in" style={{ position:'absolute', bottom:16, left:16, background:'rgba(13,13,38,0.95)', border:`1px solid ${showState.color}40`, borderRadius:12, padding:'12px 16px', backdropFilter:'blur(10px)', minWidth:200 }}>
                <div style={{ fontWeight:800, fontSize:15, color:showState.color, marginBottom:6 }}>{showState.name}</div>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--text-muted)', marginBottom:8 }}>{showState.id} · {showData.trend === 'up' ? '📈' : '📉'} {showData.trend}</div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                  {[['Total Queries', showData.total.toLocaleString()], ['Today', showData.today], ['Last Query', showData.lastQuery], ['Top Domain', Object.entries(showData.domains).sort((a,b)=>b[1]-a[1])[0]?.[0] || '-']].map(([l,v]) => (
                    <div key={l}>
                      <div style={{ fontSize:9, color:'var(--text-muted)', fontFamily:'var(--font-mono)', letterSpacing:1 }}>{l}</div>
                      <div style={{ fontSize:13, fontWeight:700, color:'var(--text-primary)', marginTop:1 }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* Legend */}
          <div style={{ display:'flex', alignItems:'center', gap:16, marginTop:10, flexWrap:'wrap' }}>
            <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, fontFamily:'var(--font-mono)', color:'var(--text-muted)' }}>
              <div style={{ width:8,  height:8,  borderRadius:'50%', background:'var(--saffron)', opacity:0.4 }} /> Low activity
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, fontFamily:'var(--font-mono)', color:'var(--text-muted)' }}>
              <div style={{ width:12, height:12, borderRadius:'50%', background:'var(--saffron)' }} /> High activity
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, fontFamily:'var(--font-mono)', color:'var(--text-muted)' }}>
              <div style={{ width:8,  height:8,  borderRadius:'50%', background:'var(--cyan)', boxShadow:'0 0 6px var(--cyan)' }} /> New query burst
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {/* Top States */}
          <div className="card" style={{ padding:18 }}>
            <div className="label" style={{ marginBottom:12 }}>▸ TOP STATES TODAY</div>
            {[...INDIA_STATES]
              .sort((a,b) => (stateData[b.id]?.today||0) - (stateData[a.id]?.today||0))
              .slice(0,6)
              .map((s, i) => {
                const d = stateData[s.id]
                const pct = Math.round((d.today / 120) * 100)
                return (
                  <div key={s.id} onClick={() => setSelected(sel => sel===s.id?null:s.id)} style={{ padding:'8px 0', borderBottom:'1px solid var(--border-subtle)', cursor:'pointer' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <span style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--text-muted)', width:16 }}>#{i+1}</span>
                        <div style={{ width:8, height:8, borderRadius:'50%', background:s.color }} />
                        <span style={{ fontSize:12, fontWeight:700 }}>{s.name}</span>
                      </div>
                      <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:s.color }}>{d.today}</span>
                    </div>
                    <div style={{ height:3, background:'var(--border-subtle)', borderRadius:2, overflow:'hidden' }}>
                      <div style={{ height:'100%', width:`${Math.min(100,pct)}%`, background:s.color, borderRadius:2, transition:'width 0.5s' }} />
                    </div>
                  </div>
                )
              })}
          </div>

          {/* Live feed */}
          <div className="card" style={{ padding:18 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
              <div style={{ width:7, height:7, borderRadius:'50%', background:'var(--green)', boxShadow:'0 0 6px var(--green)', animation:'pulse 1.5s infinite' }} />
              <div className="label">LIVE QUERIES</div>
            </div>
            {liveQueries.slice(0,8).map(q => (
              <div key={q.id} className="fade-in" style={{ padding:'7px 0', borderBottom:'1px solid var(--border-subtle)', display:'flex', gap:8, alignItems:'flex-start' }}>
                <span style={{ fontSize:14, flexShrink:0 }}>{q.icon}</span>
                <div style={{ minWidth:0 }}>
                  <div style={{ fontSize:11, color:'var(--text-primary)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{q.query}</div>
                  <div style={{ fontSize:9, fontFamily:'var(--font-mono)', color:'var(--text-muted)', marginTop:1 }}>
                    <span style={{ color:q.domainColor }}>{q.state}</span> · {q.ts}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
