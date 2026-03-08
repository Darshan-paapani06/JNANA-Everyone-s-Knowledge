import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function AuthPage() {
  const [mode,    setMode]    = useState('signin')  // 'signin' | 'signup'
  const [email,   setEmail]   = useState('')
  const [password,setPassword]= useState('')
  const [name,    setName]    = useState('')
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')
  const [success, setSuccess] = useState('')
  const { signIn, signUp }    = useAuth()
  const nav                   = useNavigate()

  const inp = (val, set, placeholder, type='text') => (
    <input
      value={val} onChange={e => { set(e.target.value); setError('') }}
      placeholder={placeholder} type={type}
      style={{ width:'100%', background:'rgba(255,255,255,0.05)', border:'1px solid var(--border-subtle)', borderRadius:10, padding:'12px 16px', color:'var(--text-primary)', fontFamily:'var(--font-display)', fontSize:14, outline:'none', marginBottom:12, transition:'border 0.2s' }}
      onFocus={e=>e.target.style.borderColor='var(--border-primary)'}
      onBlur={e=>e.target.style.borderColor='var(--border-subtle)'}
    />
  )

  const handle = async (e) => {
    e.preventDefault(); if (loading) return
    setLoading(true); setError(''); setSuccess('')
    if (mode === 'signin') {
      const { error: err } = await signIn(email, password)
      if (err) { setError(err.message); setLoading(false) }
      else nav('/')
    } else {
      if (!name.trim()) { setError('Please enter your name'); setLoading(false); return }
      const { error: err } = await signUp(email, password, name)
      if (err) { setError(err.message); setLoading(false) }
      else setSuccess('✓ Check your email to confirm your account, then sign in.')
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'32px 24px' }}>
      <div className="card-saffron fade-up" style={{ width:'100%', maxWidth:420, padding:36 }}>
        {/* Logo */}
        <div style={{ textAlign:'center', marginBottom:28 }}>
          <div style={{ fontSize:36, fontWeight:800, letterSpacing:-1, marginBottom:4 }}>
            <span style={{ color:'var(--saffron)' }}>J</span>NANA
          </div>
          <div style={{ fontFamily:'var(--font-dev)', fontSize:14, color:'var(--text-muted)' }}>ज्ञान · National Intelligence</div>
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', background:'rgba(255,255,255,0.04)', borderRadius:10, padding:4, marginBottom:24 }}>
          {['signin','signup'].map(m => (
            <button key={m} onClick={() => { setMode(m); setError(''); setSuccess('') }} style={{ flex:1, padding:'8px 0', borderRadius:8, border:'none', cursor:'pointer', fontFamily:'var(--font-display)', fontWeight:700, fontSize:12, letterSpacing:1, textTransform:'uppercase', transition:'all 0.2s', background:mode===m?'var(--saffron-dim)':'transparent', color:mode===m?'var(--saffron)':'var(--text-muted)', border:`1px solid ${mode===m?'var(--border-primary)':'transparent'}` }}>
              {m === 'signin' ? '🔑 Sign In' : '✨ Sign Up'}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handle}>
          {mode==='signup' && inp(name, setName, 'Full Name')}
          {inp(email, setEmail, 'Email Address', 'email')}
          {inp(password, setPassword, 'Password', 'password')}

          {error && (
            <div style={{ background:'rgba(255,68,102,0.08)', border:'1px solid rgba(255,68,102,0.3)', borderRadius:8, padding:'10px 14px', color:'var(--red)', fontSize:12, fontFamily:'var(--font-mono)', marginBottom:12 }}>
              {error}
            </div>
          )}
          {success && (
            <div style={{ background:'rgba(0,255,136,0.08)', border:'1px solid rgba(0,255,136,0.3)', borderRadius:8, padding:'10px 14px', color:'var(--green)', fontSize:12, fontFamily:'var(--font-mono)', marginBottom:12 }}>
              {success}
            </div>
          )}

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ width:'100%', padding:'14px', fontSize:13, marginTop:4 }}>
            {loading
              ? <><span>Processing</span><div className="thinking-dots"><span/><span/><span/></div></>
              : mode==='signin' ? '⚡ Enter JNANA' : '🚀 Join JNANA'
            }
          </button>
        </form>

        <div style={{ textAlign:'center', marginTop:16, fontSize:11, color:'var(--text-muted)', fontFamily:'var(--font-mono)' }}>
          Serving 1.4 billion citizens · Free forever
        </div>
      </div>
    </div>
  )
}
