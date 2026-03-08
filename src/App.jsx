import { Routes, Route } from 'react-router-dom'
import { useAuth }       from './hooks/useAuth'
import Background        from './components/layout/Background'
import Header            from './components/layout/Header'
import QueryPage         from './components/pages/QueryPage'
import MapPage           from './components/pages/MapPage'
import PipelinePage      from './components/pages/PipelinePage'
import NetworkPage       from './components/pages/NetworkPage'
import InsightsPage      from './components/pages/InsightsPage'
import DashboardPage     from './components/pages/DashboardPage'
import AuthPage          from './components/pages/AuthPage'

export default function App() {
  const { user, profile, loading, signOut } = useAuth()

  if (loading) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:16 }}>
      <div style={{ fontSize:36, fontWeight:800 }}><span style={{ color:'var(--saffron)' }}>J</span>NANA</div>
      <div className="thinking-dots"><span/><span/><span/></div>
    </div>
  )

  return (
    <div style={{ minHeight:'100vh', position:'relative' }}>
      <Background/>
      <div style={{ position:'relative', zIndex:1 }}>
        <Header user={user} profile={profile} onSignOut={signOut}/>
        <main>
          <Routes>
            <Route path="/"          element={<QueryPage    user={user}/>}/>
            <Route path="/map"       element={<MapPage/>}/>
            <Route path="/pipeline"  element={<PipelinePage/>}/>
            <Route path="/network"   element={<NetworkPage/>}/>
            <Route path="/insights"  element={<InsightsPage/>}/>
            <Route path="/dashboard" element={<DashboardPage user={user}/>}/>
            <Route path="/auth"      element={<AuthPage/>}/>
          </Routes>
        </main>
      </div>
    </div>
  )
}
