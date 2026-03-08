import { useState } from 'react'
import { generateInsight } from '../../lib/anthropic'
import { INSIGHT_TOPICS } from '../../constants'
export default function InsightsPage() {
  const [topic,insight,loading,error,setTopic] = (() => {
    const [topic,setTopic]   = useState('')
    const [insight,setInsight] = useState('')
    const [loading,setLoading] = useState(false)
    const [error,setError]   = useState('')
    return [topic,insight,loading,error, async (t) => {
      setTopic(t); setLoading(true); setInsight(''); setError('')
      try { setInsight(await generateInsight(t)) }
      catch(e) { setError(e.message==='NO_API_KEY'?'⚠️ Add your Anthropic API key to .env':'Error: '+e.message) }
      finally { setLoading(false) }
    }]
  })()
  const fmt = insight.split('\n').map((l,i)=>{
    if(/^━━/.test(l)) return <div key={i} style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:2, color:'var(--saffron)', margin:'18px 0 6px', textTransform:'uppercase' }}>{l}</div>
    if(/^→/.test(l))  return <div key={i} style={{ paddingLeft:16, borderLeft:'2px solid var(--saffron)', margin:'4px 0', fontSize:14, lineHeight:1.6, color:'var(--text-primary)' }}>{l}</div>
    if(!l.trim())     return <div key={i} style={{ height:5 }}/>
    return <div key={i} style={{ fontSize:14, lineHeight:1.75, color:'var(--text-secondary)', margin:'2px 0' }}>{l}</div>
  })
  return (
    <div style={{ maxWidth:1000, margin:'0 auto', padding:'40px 24px' }}>
      <div style={{ textAlign:'center', marginBottom:32 }}>
        <div className="label" style={{ marginBottom:10 }}>AI-POWERED CROSS-DOMAIN ANALYSIS</div>
        <h2 style={{ fontSize:36, fontWeight:800, letterSpacing:-1 }}>National Insight Engine</h2>
      </div>
      <div style={{ display:'flex', flexWrap:'wrap', gap:10, justifyContent:'center', marginBottom:28 }}>
        {INSIGHT_TOPICS.map(t=>(
          <button key={t} onClick={()=>setTopic(t)} disabled={loading} style={{ background:topic===t?'var(--saffron-dim)':'var(--bg-card)', border:`1px solid ${topic===t?'var(--saffron)':'var(--border-subtle)'}`, color:topic===t?'var(--saffron)':'var(--text-primary)', fontFamily:'var(--font-display)', fontWeight:700, fontSize:13, padding:'10px 20px', borderRadius:10, cursor:'pointer', transition:'all 0.2s' }}>{t}</button>
        ))}
      </div>
      {error && <div style={{ background:'rgba(255,68,102,0.08)', border:'1px solid rgba(255,68,102,0.3)', borderRadius:10, padding:'14px 18px', color:'var(--red)', fontFamily:'var(--font-mono)', fontSize:13, marginBottom:20 }}>{error}</div>}
      {loading && <div style={{ textAlign:'center', padding:'60px 0', color:'var(--text-muted)' }}><div style={{ fontSize:42, marginBottom:12 }}>🔍</div><div style={{ fontFamily:'var(--font-mono)', fontSize:13 }}>Analysing "{topic}"…</div><div className="thinking-dots" style={{ justifyContent:'center', display:'flex', marginTop:10 }}><span/><span/><span/></div></div>}
      {insight && <div className="card-saffron fade-up" style={{ padding:32 }}><div className="label" style={{ marginBottom:20, color:'var(--green)' }}>◉ NATIONAL INSIGHT · {topic.toUpperCase()}</div>{fmt}</div>}
      {!insight&&!loading&&!error && <div style={{ textAlign:'center', padding:'60px 0', color:'var(--text-muted)' }}><div style={{ fontSize:48, marginBottom:12 }}>🏛️</div><div>Select a topic to generate a national insight report</div></div>}
    </div>
  )
}
