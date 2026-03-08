export default function EmotionBadge({ emotion }) {
  if (!emotion) return null
  return (
    <div className="fade-in" style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'4px 12px', borderRadius:20, background:`${emotion.color}18`, border:`1px solid ${emotion.color}40`, color:emotion.color, fontFamily:'var(--font-mono)', fontSize:11, fontWeight:700, letterSpacing:1 }}>
      {emotion.icon} {emotion.label.toUpperCase()}
      {emotion.priority==='CRISIS' && <span style={{ background:emotion.color, color:'white', padding:'1px 6px', borderRadius:4, fontSize:9, letterSpacing:1 }}>PRIORITY</span>}
    </div>
  )
}
