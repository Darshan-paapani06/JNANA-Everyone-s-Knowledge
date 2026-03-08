import { useState } from 'react'
import { feedback } from '../../lib/supabase'

export default function ResponseBox({ response, domain, emotion }) {
  const [voted, setVoted] = useState(null)
  const fmt = response.split('\n').map((line, i) => {
    if (/^━━/.test(line)) return <div key={i} style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:2, color:'var(--saffron)', margin:'18px 0 6px', textTransform:'uppercase' }}>{line}</div>
    if (/^→/.test(line))  return <div key={i} style={{ paddingLeft:16, borderLeft:'2px solid var(--saffron)', margin:'4px 0', fontSize:14, lineHeight:1.6, color:'var(--text-primary)' }}>{line}</div>
    if (!line.trim())     return <div key={i} style={{ height:5 }} />
    return <div key={i} style={{ fontSize:14, lineHeight:1.75, color:'var(--text-secondary)', margin:'2px 0' }}>{line}</div>
  })
  return (
    <div className="card-saffron fade-up" style={{ padding:28, marginTop:20 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:8, height:8, borderRadius:'50%', background:'var(--green)', boxShadow:'0 0 8px var(--green)' }} />
          <span style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:2, color:'var(--green)' }}>JNANA RESPONSE</span>
          {domain && <span style={{ fontSize:10, padding:'2px 8px', borderRadius:4, background:'var(--saffron-dim)', color:'var(--saffron)', fontFamily:'var(--font-mono)' }}>{domain.toUpperCase()}</span>}
        </div>
        {emotion && <span style={{ fontSize:16 }}>{emotion.icon}</span>}
      </div>
      <div>{fmt}</div>
      <div style={{ marginTop:20, paddingTop:14, borderTop:'1px solid var(--border-subtle)', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
        <div style={{ display:'flex', gap:16, fontFamily:'var(--font-mono)', fontSize:10, color:'var(--text-muted)' }}>
          <span>⚡ 7 stages</span><span>📄 640K docs</span><span>🌐 22 languages</span><span>📍 District-verified</span>
        </div>
        {voted===null ? (
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ fontSize:11, color:'var(--text-muted)', fontFamily:'var(--font-mono)' }}>Helpful?</span>
            <button onClick={()=>setVoted(true)} className="btn btn-ghost" style={{ padding:'4px 12px', fontSize:11 }}>👍 Yes</button>
            <button onClick={()=>setVoted(false)} className="btn btn-ghost" style={{ padding:'4px 12px', fontSize:11 }}>👎 No</button>
          </div>
        ) : <span style={{ fontSize:11, color:'var(--green)', fontFamily:'var(--font-mono)' }}>✓ Feedback recorded</span>}
      </div>
    </div>
  )
}
