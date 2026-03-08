import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function UserMenu({ user, profile, onSignOut }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const nav = useNavigate()

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const initial = (profile?.full_name || user?.email || 'C')[0].toUpperCase()

  return (
    <div ref={ref} style={{ position:'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width:36, height:36, borderRadius:'50%', background:'linear-gradient(135deg,var(--saffron),#FF4500)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-display)', fontWeight:800, fontSize:15, color:'white', flexShrink:0 }}
      >
        {initial}
      </button>

      {open && (
        <div className="fade-in" style={{ position:'absolute', top:'calc(100% + 10px)', right:0, background:'var(--bg-card)', border:'1px solid var(--border-primary)', borderRadius:12, padding:16, minWidth:220, zIndex:200, boxShadow:'0 20px 60px rgba(0,0,0,0.5)' }}>
          {/* User Info */}
          <div style={{ paddingBottom:12, borderBottom:'1px solid var(--border-subtle)', marginBottom:12 }}>
            <div style={{ fontSize:14, fontWeight:700, color:'var(--text-primary)', marginBottom:2 }}>{profile?.full_name || 'Citizen'}</div>
            <div style={{ fontSize:11, color:'var(--text-muted)', fontFamily:'var(--font-mono)' }}>{user?.email}</div>
          </div>
          {/* Actions */}
          {[
            { icon:'⚡', label:'My Queries', action: () => { nav('/'); setOpen(false) } },
            { icon:'🌍', label:'Live Map',   action: () => { nav('/map'); setOpen(false) } },
            { icon:'🏛️', label:'Dashboard',  action: () => { nav('/dashboard'); setOpen(false) } },
          ].map(item => (
            <button key={item.label} onClick={item.action} style={{ display:'flex', alignItems:'center', gap:10, width:'100%', background:'none', border:'none', cursor:'pointer', padding:'8px 6px', borderRadius:8, color:'var(--text-secondary)', fontFamily:'var(--font-display)', fontSize:13, transition:'all 0.15s' }}
              onMouseEnter={e=>e.currentTarget.style.background='var(--bg-hover)'}
              onMouseLeave={e=>e.currentTarget.style.background='none'}>
              <span>{item.icon}</span>{item.label}
            </button>
          ))}
          <div style={{ borderTop:'1px solid var(--border-subtle)', marginTop:8, paddingTop:8 }}>
            <button onClick={() => { onSignOut(); setOpen(false) }} style={{ display:'flex', alignItems:'center', gap:10, width:'100%', background:'none', border:'none', cursor:'pointer', padding:'8px 6px', borderRadius:8, color:'var(--red)', fontFamily:'var(--font-display)', fontSize:13 }}>
              <span>🚪</span> Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
