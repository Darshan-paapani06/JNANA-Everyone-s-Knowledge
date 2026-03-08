export default function PipelineStepItem({ step, activeStepId, completedStepIds=[] }) {
  const isActive    = activeStepId === step.id
  const isCompleted = completedStepIds.includes(step.id)
  return (
    <div className="slide-left" style={{ display:'flex', gap:12, alignItems:'flex-start', padding:'10px 0', borderBottom:'1px solid var(--border-subtle)', animationDelay:`${step.id*60}ms` }}>
      <div style={{ width:30, height:30, borderRadius:'50%', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontFamily:'var(--font-mono)', background: isCompleted?`${step.color}20`:isActive?`${step.color}15`:'rgba(255,255,255,0.04)', border:`1.5px solid ${isCompleted||isActive?step.color:'var(--border-subtle)'}`, color:isCompleted||isActive?step.color:'var(--text-muted)', transition:'all 0.3s', boxShadow:isActive?`0 0 12px ${step.color}40`:'none' }}>
        {isCompleted ? '✓' : step.id}
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:13, fontWeight:700, color:isActive?'var(--text-primary)':isCompleted?step.color:'var(--text-secondary)', display:'flex', alignItems:'center', gap:8, transition:'color 0.3s' }}>
          <span>{step.icon}</span> {step.name}
          {isActive && <div className="thinking-dots"><span/><span/><span/></div>}
        </div>
        {(isActive||isCompleted) && step.detail && (
          <div className="fade-in" style={{ fontSize:11, color:'var(--text-muted)', fontFamily:'var(--font-mono)', marginTop:3 }}>{step.detail}</div>
        )}
      </div>
      {isCompleted && <div style={{ fontSize:10, fontFamily:'var(--font-mono)', color:step.color, padding:'2px 6px', background:`${step.color}10`, borderRadius:4, border:`1px solid ${step.color}20`, flexShrink:0 }}>✓</div>}
    </div>
  )
}
