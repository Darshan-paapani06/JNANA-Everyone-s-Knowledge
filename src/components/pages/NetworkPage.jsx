import { useEffect, useRef } from 'react'
const NODES = [
  {id:'brain',x:.50,y:.50,r:38,label:'JNANA\nBrain',color:'#FF6B00',type:'core'},
  {id:'ag',x:.20,y:.20,r:22,label:'Agriculture',color:'#00FF88',type:'domain'},
  {id:'health',x:.75,y:.18,r:22,label:'Healthcare',color:'#00E5FF',type:'domain'},
  {id:'legal',x:.87,y:.50,r:22,label:'Legal',color:'#7C3AED',type:'domain'},
  {id:'edu',x:.72,y:.82,r:22,label:'Education',color:'#FFD700',type:'domain'},
  {id:'fin',x:.30,y:.82,r:22,label:'Finance',color:'#FF4466',type:'domain'},
  {id:'emp',x:.13,y:.52,r:22,label:'Employment',color:'#FF8C00',type:'domain'},
  {id:'v1',x:.06,y:.28,r:10,label:'MH',color:'#4ECDC4',type:'node'},
  {id:'v2',x:.42,y:.08,r:10,label:'DL',color:'#4ECDC4',type:'node'},
  {id:'v3',x:.92,y:.28,r:10,label:'TN',color:'#4ECDC4',type:'node'},
  {id:'v4',x:.94,y:.72,r:10,label:'KA',color:'#4ECDC4',type:'node'},
  {id:'v5',x:.55,y:.95,r:10,label:'AP',color:'#4ECDC4',type:'node'},
  {id:'v6',x:.08,y:.78,r:10,label:'WB',color:'#4ECDC4',type:'node'},
]
const EDGES = [['brain','ag'],['brain','health'],['brain','legal'],['brain','edu'],['brain','fin'],['brain','emp'],['ag','v1'],['ag','v2'],['health','v3'],['legal','v3'],['edu','v4'],['edu','v5'],['fin','v5'],['emp','v6'],['emp','v1'],['ag','health'],['health','fin'],['legal','emp'],['edu','emp'],['fin','ag']]
export default function NetworkPage() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current; if(!canvas) return
    const ctx = canvas.getContext('2d')
    let raf; let t=0
    const resize = () => { canvas.width=canvas.offsetWidth; canvas.height=canvas.offsetHeight }
    resize(); window.addEventListener('resize',resize)
    const draw = () => {
      const W=canvas.width,H=canvas.height; ctx.clearRect(0,0,W,H); t+=0.008
      const placed = NODES.map(n=>({...n,px:n.x*W,py:n.y*H}))
      const byId   = Object.fromEntries(placed.map(n=>[n.id,n]))
      EDGES.forEach(([a,b],idx)=>{
        const na=byId[a],nb=byId[b],prog=(Math.sin(t*1.2+idx*0.7)+1)/2
        const grd=ctx.createLinearGradient(na.px,na.py,nb.px,nb.py)
        grd.addColorStop(0,na.color+'30'); grd.addColorStop(prog,na.color+'CC'); grd.addColorStop(1,nb.color+'30')
        ctx.beginPath(); ctx.moveTo(na.px,na.py); ctx.lineTo(nb.px,nb.py)
        ctx.strokeStyle=grd; ctx.lineWidth=1.2; ctx.stroke()
        const tx=na.px+(nb.px-na.px)*prog,ty=na.py+(nb.py-na.py)*prog
        ctx.beginPath(); ctx.arc(tx,ty,3,0,Math.PI*2); ctx.fillStyle=na.color+'EE'; ctx.fill()
      })
      placed.forEach(n=>{
        const bobY=n.type==='core'?Math.sin(t*1.5)*4:Math.sin(t*0.9+n.px*0.008)*7
        const py=n.py+bobY
        const grd=ctx.createRadialGradient(n.px,py,0,n.px,py,n.r*2.8)
        grd.addColorStop(0,n.color+'28'); grd.addColorStop(1,'transparent')
        ctx.beginPath(); ctx.arc(n.px,py,n.r*2.8,0,Math.PI*2); ctx.fillStyle=grd; ctx.fill()
        ctx.beginPath(); ctx.arc(n.px,py,n.r,0,Math.PI*2)
        ctx.fillStyle=n.type==='core'?'#0F0F2A':n.color+'14'; ctx.fill()
        ctx.strokeStyle=n.color; ctx.lineWidth=n.type==='core'?2.5:1.5; ctx.stroke()
        ctx.fillStyle=n.type==='core'?n.color:'#F0EDE8'
        ctx.font=`bold ${n.type==='core'?13:10}px Syne,sans-serif`
        ctx.textAlign='center'; ctx.textBaseline='middle'
        n.label.split('\n').forEach((l,i,arr)=>ctx.fillText(l,n.px,py+(i-(arr.length-1)/2)*13))
      })
      raf=requestAnimationFrame(draw)
    }
    draw()
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener('resize',resize) }
  },[])
  return (
    <div style={{ maxWidth:1200, margin:'0 auto', padding:'40px 24px' }}>
      <div style={{ textAlign:'center', marginBottom:28 }}>
        <div className="label" style={{ marginBottom:10 }}>LIVE NETWORK</div>
        <h2 style={{ fontSize:36, fontWeight:800, letterSpacing:-1 }}>Federated Knowledge Graph</h2>
      </div>
      <div className="card" style={{ overflow:'hidden', borderColor:'var(--border-primary)' }}>
        <canvas ref={canvasRef} style={{ width:'100%', height:500, display:'block' }}/>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginTop:14 }}>
        {[{c:'#FF6B00',l:'Core National Brain'},{c:'#00FF88',l:'Domain Nodes'},{c:'#4ECDC4',l:'Village Edge Pods'}].map(x=>(
          <div key={x.l} className="card" style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 16px' }}>
            <div style={{ width:10, height:10, borderRadius:'50%', background:x.c, boxShadow:`0 0 8px ${x.c}` }}/>
            <span style={{ fontSize:12, fontFamily:'var(--font-mono)', color:'var(--text-muted)' }}>{x.l}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
