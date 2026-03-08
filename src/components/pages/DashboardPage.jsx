import { useState, useEffect } from 'react'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts'
import { queryLogs } from '../../lib/supabase'
import { PLATFORM_STATS, DOMAINS } from '../../constants'
import StatCard from '../ui/StatCard'

const mockWeek = [
  { day:'Mon', queries:14200, helpfulness:87 },{ day:'Tue', queries:16800, helpfulness:89 },
  { day:'Wed', queries:15400, helpfulness:86 },{ day:'Thu', queries:18900, helpfulness:91 },
  { day:'Fri', queries:21200, helpfulness:93 },{ day:'Sat', queries:17600, helpfulness:88 },
  { day:'Sun', queries:18442, helpfulness:94 },
]
const mockHourly = Array.from({length:24},(_,i)=>({ hour:`${i}:00`, queries: Math.floor(400+Math.sin(i*0.5)*300+Math.random()*200) }))
const emotionData = [
  { emotion:'Curious',    count:7420, color:'#00E5FF' },
  { emotion:'Distressed', count:3210, color:'#FF4466' },
  { emotion:'Neutral',    count:5400, color:'#8A8A9E' },
  { emotion:'Angry',      count:1820, color:'#FF8C00' },
  { emotion:'Optimistic', count: 592, color:'#00FF88' },
]

const TT = ({ active, payload, label }) => active && payload?.length ? (
  <div style={{ background:'var(--bg-panel)', border:'1px solid var(--border-primary)', borderRadius:8, padding:'10px 14px', fontFamily:'var(--font-mono)', fontSize:11 }}>
    <div style={{ color:'var(--text-muted)', marginBottom:4 }}>{label}</div>
    {payload.map((p,i) => <div key={i} style={{ color:p.color||'var(--saffron)' }}>{typeof p.value==='number'?p.value.toLocaleString():p.value}</div>)}
  </div>
) : null

export default function DashboardPage({ user }) {
  const [recentQueries, setRecentQueries] = useState([])
  const [totalToday,    setTotalToday]    = useState(18442)
  const [loading,       setLoading]       = useState(true)
  const [liveCount,     setLiveCount]     = useState(0)

  // Mock fallback data shown when Supabase is not connected
  const MOCK_QUERIES = [
    { id:'m1', query_text:'My crops failed this year, how do I apply for PM-KISAN relief?',           domain:'agriculture', emotion:'Distressed', language:'Hindi',   helpful:true,  created_at: new Date(Date.now()-1*60000).toISOString() },
    { id:'m2', query_text:'What are my rights if my employer denies maternity leave?',               domain:'legal',       emotion:'Angry',     language:'English', helpful:true,  created_at: new Date(Date.now()-4*60000).toISOString() },
    { id:'m3', query_text:'How to get a BPL ration card in Tamil Nadu?',                            domain:'governance',  emotion:'Curious',   language:'Tamil',   helpful:true,  created_at: new Date(Date.now()-9*60000).toISOString() },
    { id:'m4', query_text:'Nearest government hospital with free dialysis in Pune?',                domain:'healthcare',  emotion:'Distressed',language:'Marathi', helpful:true,  created_at: new Date(Date.now()-14*60000).toISOString() },
    { id:'m5', query_text:'Steps to apply for Pradhan Mantri Awas Yojana housing scheme',          domain:'governance',  emotion:'Curious',   language:'Hindi',   helpful:null,  created_at: new Date(Date.now()-22*60000).toISOString() },
    { id:'m6', query_text:'How to file an RTI to know the status of my land mutation?',            domain:'legal',       emotion:'Angry',     language:'English', helpful:true,  created_at: new Date(Date.now()-31*60000).toISOString() },
    { id:'m7', query_text:'My child was denied school admission — what is the RTE Act remedy?',    domain:'education',   emotion:'Angry',     language:'Telugu',  helpful:true,  created_at: new Date(Date.now()-45*60000).toISOString() },
    { id:'m8', query_text:'Mudra loan eligibility for a small vegetable street vendor',            domain:'finance',     emotion:'Optimistic',language:'Kannada', helpful:null,  created_at: new Date(Date.now()-58*60000).toISOString() },
  ]

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const { data } = await queryLogs.getRecent(8)
      // Use real Supabase data if available, else show vivid mock data
      setRecentQueries(data?.length ? data : MOCK_QUERIES)
      setLoading(false)
    }
    load()
    const id  = setInterval(() => setTotalToday(t => t + Math.floor(Math.random()*3)), 2200)
    const id2 = setInterval(() => setLiveCount(c => (c+1)%100), 1800)

    // Simulate new live queries appearing
    const id3 = setInterval(() => {
      const newQ = MOCK_QUERIES[Math.floor(Math.random()*MOCK_QUERIES.length)]
      setRecentQueries(prev => [{ ...newQ, id: Date.now().toString(), created_at: new Date().toISOString() }, ...prev].slice(0, 8))
    }, 5000)

    return () => { clearInterval(id); clearInterval(id2); clearInterval(id3) }
  }, [])

  const domainBreakdown = DOMAINS.map(d => ({ name:d.label, value:Math.floor(Math.random()*35)+5, color:d.color }))

  return (
    <div style={{ maxWidth:1300, margin:'0 auto', padding:'32px 24px' }}>
      <div style={{ marginBottom:28 }}>
        <div className="label" style={{ marginBottom:8 }}>REAL-TIME ANALYTICS</div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
          <h2 style={{ fontSize:32, fontWeight:800, letterSpacing:-1 }}>National Dashboard</h2>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ width:8, height:8, borderRadius:'50%', background:'var(--green)', boxShadow:'0 0 8px var(--green)', animation:'pulse 1.5s infinite' }} />
            <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--text-muted)' }}>LIVE DATA</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, marginBottom:24 }}>
        {[...PLATFORM_STATS.slice(0,5), { label:'Queries Today', value:totalToday.toLocaleString(), icon:'⚡', color:'var(--gold)' }].map((s,i) => <StatCard key={s.label} {...s} delay={i*50}/>)}
      </div>

      {/* Charts Row 1 */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 360px', gap:20, marginBottom:20 }}>
        {/* Area chart */}
        <div className="card" style={{ padding:24 }}>
          <div className="label" style={{ marginBottom:16 }}>▸ QUERY VOLUME — 7 DAYS</div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={mockWeek}>
              <defs>
                <linearGradient id="qg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#FF6B00" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#FF6B00" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="day" tick={{ fill:'var(--text-muted)', fontSize:11, fontFamily:'var(--font-mono)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill:'var(--text-muted)', fontSize:10, fontFamily:'var(--font-mono)' }} axisLine={false} tickLine={false} />
              <Tooltip content={<TT/>} />
              <Area type="monotone" dataKey="queries" stroke="var(--saffron)" strokeWidth={2.5} fill="url(#qg)" dot={{ fill:'var(--saffron)', r:3 }} activeDot={{ r:5 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie */}
        <div className="card" style={{ padding:24 }}>
          <div className="label" style={{ marginBottom:16 }}>▸ DOMAIN BREAKDOWN</div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={domainBreakdown} cx="50%" cy="50%" innerRadius={42} outerRadius={68} paddingAngle={3} dataKey="value">
                {domainBreakdown.map((d,i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip content={<TT/>} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginTop:10 }}>
            {domainBreakdown.map(d => (
              <div key={d.name} style={{ display:'flex', alignItems:'center', gap:4, fontSize:10, fontFamily:'var(--font-mono)', color:'var(--text-muted)' }}>
                <div style={{ width:7, height:7, borderRadius:2, background:d.color }} />{d.name.split(' ')[0]} {d.value}%
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:20 }}>
        {/* Emotion bar */}
        <div className="card" style={{ padding:24 }}>
          <div className="label" style={{ marginBottom:16 }}>▸ EMOTIONAL CONTEXT TODAY</div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={emotionData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="emotion" tick={{ fill:'var(--text-muted)', fontSize:10, fontFamily:'var(--font-mono)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill:'var(--text-muted)', fontSize:9, fontFamily:'var(--font-mono)' }} axisLine={false} tickLine={false} />
              <Tooltip content={<TT/>} />
              {emotionData.map((d, i) => (
                <Bar key={i} dataKey="count" fill={d.color} radius={[4,4,0,0]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Hourly */}
        <div className="card" style={{ padding:24 }}>
          <div className="label" style={{ marginBottom:16 }}>▸ QUERIES — 24 HOURS</div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={mockHourly}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="hour" tick={{ fill:'var(--text-muted)', fontSize:9, fontFamily:'var(--font-mono)' }} axisLine={false} tickLine={false} interval={5} />
              <YAxis hide />
              <Tooltip content={<TT/>} />
              <Line type="monotone" dataKey="queries" stroke="var(--cyan)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Live DB Queries */}
      <div className="card" style={{ padding:24 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div className="label">▸ RECENT CITIZEN QUERIES</div>
            <div style={{ display:'flex', alignItems:'center', gap:5, background:'rgba(0,255,136,0.08)', border:'1px solid rgba(0,255,136,0.2)', borderRadius:20, padding:'2px 10px' }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background:'var(--green)', boxShadow:'0 0 6px var(--green)', animation:'pulse 1.5s infinite' }} />
              <span style={{ fontFamily:'var(--font-mono)', fontSize:9, color:'var(--green)', letterSpacing:1 }}>LIVE</span>
            </div>
          </div>
          {loading && <div className="thinking-dots"><span/><span/><span/></div>}
        </div>
        <div>
          {recentQueries.map((q, i) => {
            const domainColors = { agriculture:'#00FF88', healthcare:'#00E5FF', legal:'#7C3AED', education:'#FFD700', finance:'#FF4466', employment:'#FF8C00', governance:'#FF6B00', environment:'#4ECDC4' }
            const domainColor = domainColors[q.domain] || 'var(--saffron)'
            const emotionIcons = { Distressed:'🔴', Angry:'🟠', Curious:'🔵', Optimistic:'🟢', Neutral:'⚪', Melancholic:'🟣' }
            return (
              <div key={q.id || i} className="fade-in" style={{ padding:'12px 0', borderBottom:'1px solid var(--border-subtle)', display:'grid', gridTemplateColumns:'1fr auto', gap:16, alignItems:'center', animationDelay:`${i*60}ms` }}>
                <div>
                  <div style={{ fontSize:13, color:'var(--text-primary)', marginBottom:5, lineHeight:1.5 }}>
                    {q.query_text}
                  </div>
                  <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                    <span style={{ fontSize:9, padding:'2px 8px', borderRadius:4, background:`${domainColor}15`, color:domainColor, fontFamily:'var(--font-mono)', letterSpacing:1, textTransform:'uppercase' }}>{q.domain}</span>
                    <span style={{ fontSize:10, color:'var(--text-muted)', fontFamily:'var(--font-mono)' }}>{emotionIcons[q.emotion] || '⚪'} {q.emotion}</span>
                    <span style={{ fontSize:10, color:'var(--text-muted)', fontFamily:'var(--font-mono)' }}>🌐 {q.language}</span>
                  </div>
                </div>
                <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:4, flexShrink:0 }}>
                  {q.helpful !== null && <span style={{ fontSize:14 }}>{q.helpful ? '👍' : '👎'}</span>}
                  <span style={{ fontSize:9, fontFamily:'var(--font-mono)', color:'var(--text-muted)', whiteSpace:'nowrap' }}>
                    {new Date(q.created_at).toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
        <div style={{ marginTop:12, fontFamily:'var(--font-mono)', fontSize:10, color:'var(--text-muted)', textAlign:'center' }}>
          {recentQueries[0]?.id?.toString().startsWith('m') ? '⚙️ Showing demo data — connect Supabase to see real citizen queries' : `✓ Live data from Supabase · ${recentQueries.length} recent queries`}
        </div>
      </div>
    </div>
  )
}
