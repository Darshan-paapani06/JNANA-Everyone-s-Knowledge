import { useState } from 'react'
import { PILLARS } from '../../lib/ragPipeline'
export default function PipelinePage() {
  const [active, setActive] = useState(0)
  const p = PILLARS[active]
  return (
    <div style={{ maxWidth:1200, margin:'0 auto', padding:'40px 24px' }}>
      <div style={{ textAlign:'center', marginBottom:36 }}>
        <div className="label" style={{ marginBottom:10 }}>ARCHITECTURE EXPLORER</div>
        <h2 style={{ fontSize:36, fontWeight:800, letterSpacing:-1 }}>The 5 Revolutionary Pillars</h2>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'280px 1fr', gap:20 }}>
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {PILLARS.map((pl, i) => (
            <button key={pl.id} onClick={()=>setActive(i)} style={{ background:active===i?`${pl.color}08`:'var(--bg-card)', border:`1px solid ${active===i?pl.color:'var(--border-subtle)'}`, borderRadius:12, padding:'14px 16px', cursor:'pointer', textAlign:'left', transition:'all 0.2s', color:'var(--text-primary)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <span style={{ fontSize:20 }}>{pl.icon}</span>
                <div>
                  <div style={{ fontSize:12, fontWeight:700, color:active===i?pl.color:'var(--text-primary)', fontFamily:'var(--font-display)' }}>{pl.name}</div>
                  <div style={{ fontSize:9, fontFamily:'var(--font-mono)', color:'var(--text-muted)', marginTop:1 }}>PILLAR {pl.id} OF 5</div>
                </div>
              </div>
            </button>
          ))}
        </div>
        <div key={active} className="card fade-up" style={{ padding:32, border:`1px solid ${p.color}25` }}>
          <div style={{ fontSize:44, marginBottom:14 }}>{p.icon}</div>
          <h3 style={{ fontSize:24, fontWeight:800, color:p.color, marginBottom:12 }}>{p.name}</h3>
          <p style={{ color:'var(--text-secondary)', lineHeight:1.8, marginBottom:24, fontSize:14 }}>{p.desc}</p>
          <div style={{ background:`${p.color}10`, border:`1px solid ${p.color}25`, borderRadius:8, padding:'10px 16px', marginBottom:24, fontFamily:'var(--font-mono)', fontSize:12, color:p.color, display:'inline-block' }}>◉ {p.metric}</div>
          <div className="label" style={{ color:p.color, marginBottom:14 }}>PROCESSING LAYERS</div>
          <div style={{ position:'relative' }}>
            <div style={{ position:'absolute', left:18, top:10, bottom:10, width:2, background:`linear-gradient(${p.color}80,transparent)` }} />
            {p.layers.map((l,i) => (
              <div key={i} className="slide-left" style={{ display:'flex', alignItems:'center', gap:14, padding:'10px 0 10px 8px', animationDelay:`${i*80}ms` }}>
                <div style={{ width:12, height:12, borderRadius:'50%', background:p.color, boxShadow:`0 0 8px ${p.color}60`, marginLeft:11, flexShrink:0 }} />
                <div style={{ background:`${p.color}08`, border:`1px solid ${p.color}20`, borderRadius:8, padding:'8px 16px', fontSize:13, fontWeight:600, flex:1 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
