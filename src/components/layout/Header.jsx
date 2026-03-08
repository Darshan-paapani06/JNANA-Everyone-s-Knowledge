import { NavLink, useNavigate } from 'react-router-dom'
import { NAV_ROUTES } from '../../constants'
import UserMenu from './UserMenu'
import JnanaLogo from '../ui/JnanaLogo'
import { useStore } from '../../store/useStore'
import { UI_LANGUAGES, getT } from '../../lib/i18n'

export default function Header({ user, profile, onSignOut }) {
  const nav = useNavigate()
  const { uiLanguage, setUiLanguage } = useStore()
  const t = getT(uiLanguage)

  return (
    <header style={{ position:'sticky', top:0, zIndex:100, borderBottom:'1px solid var(--border-primary)', background:'rgba(7,7,26,0.9)', backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)' }}>
      <div style={{ maxWidth:1400, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 28px', height:60 }}>
        {/* Logo */}
        <NavLink to="/" style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:12 }}>
          <JnanaLogo size="lg" />
          <div style={{ width:1, height:26, background:'var(--border-primary)' }} />
          <div style={{ fontFamily:'var(--font-dev)', fontSize:10, color:'var(--text-muted)', lineHeight:1.5 }}>
            <div>ज्ञान</div>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:8, letterSpacing:1 }}>{t('status_phase')}</div>
          </div>
        </NavLink>

        {/* Nav — translated labels */}
        <nav style={{ display:'flex', gap:2 }}>
          {NAV_ROUTES.map(r => {
            const labelKey = `nav_${r.label.toLowerCase().replace(' ','_')}`
            return (
              <NavLink key={r.path} to={r.path} end={r.path==='/'} style={({ isActive }) => ({
                display:'flex', alignItems:'center', gap:5, padding:'6px 12px', borderRadius:8,
                fontFamily:'var(--font-display)', fontWeight:700, fontSize:11, letterSpacing:1.5, textTransform:'uppercase',
                textDecoration:'none', transition:'all 0.2s',
                color: isActive?'var(--saffron)':'var(--text-muted)',
                background: isActive?'var(--saffron-dim)':'transparent',
                border:`1px solid ${isActive?'var(--border-primary)':'transparent'}`,
              })}>
                <span style={{ fontSize:12 }}>{r.icon}</span>
                {t(labelKey) !== labelKey ? t(labelKey) : r.label}
              </NavLink>
            )
          })}
        </nav>

        {/* Right side */}
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          {/* UI Language switcher */}
          <select
            value={uiLanguage}
            onChange={e => setUiLanguage(e.target.value)}
            title="Switch UI language"
            style={{ background:'var(--bg-card)', border:'1px solid var(--border-subtle)', color:'var(--text-muted)', fontFamily:'var(--font-mono)', fontSize:10, padding:'4px 8px', borderRadius:6, cursor:'pointer', outline:'none' }}
          >
            {UI_LANGUAGES.map(l => (
              <option key={l.code} value={l.code}>{l.native}</option>
            ))}
          </select>

          {/* Live indicator */}
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            <div style={{ width:7, height:7, borderRadius:'50%', background:'var(--green)', boxShadow:'0 0 8px var(--green)', animation:'pulse 2s infinite' }} />
            <span style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--text-muted)' }}>{t('status_live')}</span>
          </div>
          {/* Auth */}
          {user ? (
            <UserMenu user={user} profile={profile} onSignOut={onSignOut} />
          ) : (
            <button className="btn btn-primary" onClick={() => nav('/auth')} style={{ padding:'7px 18px', fontSize:11 }}>
              {t('auth_signin')}
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
