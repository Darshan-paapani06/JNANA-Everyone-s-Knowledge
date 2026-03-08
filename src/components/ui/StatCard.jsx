export default function StatCard({ icon, label, value, color='var(--saffron)', delay=0 }) {
  return (
    <div className="card fade-up" style={{ padding:'16px 20px', display:'flex', alignItems:'center', gap:14, animationDelay:`${delay}ms` }}>
      <span style={{ fontSize:26 }}>{icon}</span>
      <div>
        <div style={{ fontSize:22, fontWeight:800, color, lineHeight:1 }}>{value}</div>
        <div style={{ fontSize:11, color:'var(--text-muted)', letterSpacing:1, marginTop:3 }}>{label}</div>
      </div>
    </div>
  )
}
