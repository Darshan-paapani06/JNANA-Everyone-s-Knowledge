import { useState, useRef } from 'react'
import { useEmotion } from '../../hooks/useEmotion'
import { useVoice }   from '../../hooks/useVoice'
import { runPipeline } from '../../lib/ragPipeline'
import { useStore }    from '../../store/useStore'
import { LANGUAGES, DOMAINS, PLATFORM_STATS } from '../../constants'
import EmotionBadge       from '../ui/EmotionBadge'
import PipelineStepItem   from '../ui/PipelineStepItem'
import ResponseBox        from '../ui/ResponseBox'
import StatCard           from '../ui/StatCard'
import VoiceButton        from '../ui/VoiceButton'

export default function QueryPage({ user }) {
  const [query,            setQuery]            = useState('')
  const [loading,          setLoading]          = useState(false)
  const [steps,            setSteps]            = useState([])
  const [activeStepId,     setActiveStepId]     = useState(null)
  const [completedStepIds, setCompletedStepIds] = useState([])
  const [response,         setResponse]         = useState('')
  const [error,            setError]            = useState('')
  const responseRef = useRef(null)

  const { preferredLanguage, setLanguage, preferredDomain, setDomain, addToHistory, queryHistory } = useStore()
  const emotion   = useEmotion(query)
  const domainObj = DOMAINS.find(d => d.id === preferredDomain) || DOMAINS[0]

  const voice = useVoice({
    language: preferredLanguage,
    onResult: (t) => { setQuery(t) },
    onError:  () => {},
  })

  const handleQuery = async () => {
    if (!query.trim() || loading) return
    setLoading(true); setSteps([]); setActiveStepId(null); setCompletedStepIds([]); setResponse(''); setError('')
    try {
      await runPipeline({
        query, domain: domainObj.label,
        language: LANGUAGES.find(l => l.code === preferredLanguage)?.name || 'English',
        emotion, userId: user?.id,
        onStageStart:    (s) => { setSteps(prev => prev.find(x=>x.id===s.id) ? prev : [...prev,s]); setActiveStepId(s.id) },
        onStageComplete: (id) => { setCompletedStepIds(s => [...s, id]); setActiveStepId(null) },
        onComplete: (res) => {
          setResponse(res); setLoading(false)
          addToHistory({ query, response: res, domain: domainObj.id, emotion, ts: Date.now() })
          setTimeout(() => responseRef.current?.scrollIntoView({ behavior:'smooth', block:'start' }), 100)
        },
        onError: (err) => {
          setError(err.message === 'NO_API_KEY' ? '⚠️ Add your Anthropic API key to .env to activate JNANA.' : `Error: ${err.message}`)
          setLoading(false)
        },
      })
    } catch (_) {}
  }

  return (
    <div style={{ maxWidth:1300, margin:'0 auto', padding:'32px 24px' }}>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 340px', gap:24, alignItems:'start' }}>

        {/* LEFT */}
        <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
          <div className="fade-up" style={{ marginBottom:4 }}>
            <div className="label" style={{ marginBottom:8 }}>▸ ASK JNANA — PHASE 2</div>
            <h1 style={{ fontSize:34, fontWeight:800, lineHeight:1.1, letterSpacing:-1 }}>
              Your Voice. Your Language.<br/>
              <span style={{ color:'var(--saffron)' }}>Your Rights.</span>
            </h1>
          </div>

          {/* Query Box */}
          <div className="card-saffron fade-up" style={{ padding:24, animationDelay:'80ms' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
              <span className="label">▸ YOUR QUERY</span>
              <EmotionBadge emotion={emotion} />
            </div>

            {/* Voice listening indicator */}
            {voice.listening && (
              <div className="fade-in" style={{ background:'rgba(255,107,0,0.08)', border:'1px solid rgba(255,107,0,0.25)', borderRadius:10, padding:'10px 14px', marginBottom:12, display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ width:8, height:8, borderRadius:'50%', background:'var(--saffron)', boxShadow:'0 0 8px var(--saffron)', animation:'pulse 0.8s infinite' }} />
                <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--saffron)' }}>
                  {voice.transcript ? `"${voice.transcript}"` : 'Listening… speak now'}
                </span>
              </div>
            )}

            {/* Textarea + Voice */}
            <div style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
              <textarea
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key==='Enter' && e.ctrlKey && handleQuery()}
                placeholder={`Ask anything in any language…\ne.g. "My crops failed and I cannot repay my loan. What are my rights?"`}
                rows={4}
                style={{ flex:1, background:'rgba(255,255,255,0.04)', border:'1px solid var(--border-subtle)', borderRadius:10, padding:'14px 16px', color:'var(--text-primary)', fontFamily:'var(--font-display)', fontSize:15, resize:'vertical', outline:'none', transition:'border 0.2s', lineHeight:1.6 }}
                onFocus={e => e.target.style.borderColor='var(--border-primary)'}
                onBlur={e => e.target.style.borderColor='var(--border-subtle)'}
              />
              <VoiceButton
                listening={voice.listening}
                onToggle={voice.toggleListening}
                supported={voice.supported}
                volume={voice.volume}
                disabled={loading}
              />
            </div>

            {/* Languages */}
            <div style={{ marginTop:12, display:'flex', flexWrap:'wrap', gap:6 }}>
              {LANGUAGES.map(l => (
                <button key={l.code} className={`btn btn-ghost ${preferredLanguage===l.code?'active':''}`} onClick={()=>setLanguage(l.code)} style={{ padding:'5px 11px', fontSize:12 }}>
                  {l.native}
                </button>
              ))}
            </div>

            {/* Domains */}
            <div style={{ marginTop:10, display:'flex', flexWrap:'wrap', gap:6 }}>
              {DOMAINS.map(d => (
                <button key={d.id} onClick={() => setDomain(d.id)} style={{ background:preferredDomain===d.id?`${d.color}12`:'none', border:`1px solid ${preferredDomain===d.id?d.color:'var(--border-subtle)'}`, color:preferredDomain===d.id?d.color:'var(--text-muted)', fontFamily:'var(--font-display)', fontWeight:600, fontSize:11, padding:'5px 11px', borderRadius:6, cursor:'pointer', transition:'all 0.15s' }}>
                  {d.icon} {d.label}
                </button>
              ))}
            </div>

            <div style={{ marginTop:16, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--text-muted)' }}>
                {voice.supported ? '🎤 Voice ready · ' : ''}Ctrl+Enter to send
              </span>
              <button className="btn btn-primary" onClick={handleQuery} disabled={loading||!query.trim()}>
                {loading ? <><span>Processing</span><div className="thinking-dots"><span/><span/><span/></div></> : '⚡ Query JNANA'}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && <div style={{ background:'rgba(255,68,102,0.08)', border:'1px solid rgba(255,68,102,0.3)', borderRadius:10, padding:'14px 18px', color:'var(--red)', fontFamily:'var(--font-mono)', fontSize:13 }}>{error}</div>}

          {/* Pipeline */}
          {steps.length > 0 && (
            <div className="card fade-up" style={{ padding:20 }}>
              <div className="label" style={{ marginBottom:14 }}>▸ RAG PIPELINE EXECUTION</div>
              {steps.map(s => <PipelineStepItem key={s.id} step={s} activeStepId={activeStepId} completedStepIds={completedStepIds} />)}
            </div>
          )}

          {/* Response */}
          {response && <div ref={responseRef}><ResponseBox response={response} domain={domainObj.label} emotion={emotion} /></div>}
        </div>

        {/* RIGHT */}
        <div style={{ display:'flex', flexDirection:'column', gap:14, position:'sticky', top:78 }}>
          {PLATFORM_STATS.slice(0,4).map((s,i) => <StatCard key={s.label} {...s} delay={i*60} />)}
          {/* Voice tip */}
          {voice.supported && (
            <div className="card fade-up" style={{ padding:16, border:'1px solid rgba(255,107,0,0.15)', animationDelay:'400ms' }}>
              <div style={{ fontSize:20, marginBottom:8 }}>🎤</div>
              <div style={{ fontSize:13, fontWeight:700, marginBottom:4 }}>Voice Input Active</div>
              <div style={{ fontSize:11, color:'var(--text-muted)', lineHeight:1.6 }}>Click the mic button and speak your query in any Indian language. JNANA understands Hindi, Tamil, Telugu, Bengali and more.</div>
            </div>
          )}
          {/* History */}
          {queryHistory.length > 0 && (
            <div className="card" style={{ padding:16 }}>
              <div className="label" style={{ marginBottom:12 }}>▸ HISTORY</div>
              {queryHistory.slice(0,5).map((h,i) => (
                <div key={i} onClick={() => { setQuery(h.query); setResponse(h.response) }} style={{ padding:'8px 0', borderBottom:'1px solid var(--border-subtle)', cursor:'pointer' }}>
                  <div style={{ fontSize:12, color:'var(--text-secondary)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{h.query}</div>
                  {h.emotion && <div style={{ fontSize:10, color:h.emotion.color, fontFamily:'var(--font-mono)', marginTop:2 }}>{h.emotion.icon} {h.emotion.label}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
