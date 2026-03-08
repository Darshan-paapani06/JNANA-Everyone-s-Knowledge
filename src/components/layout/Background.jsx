export default function Background() {
  return (
    <div style={{ position:'fixed', inset:0, zIndex:0, overflow:'hidden', pointerEvents:'none' }}>
      <style>{`
        @keyframes o1{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(50px,-70px) scale(1.08)}}
        @keyframes o2{0%,100%{transform:translate(0,0)}50%{transform:translate(-60px,50px) scale(0.94)}}
        @keyframes gp{0%,100%{opacity:0.04}50%{opacity:0.09}}
        @keyframes sc{0%{transform:translateY(-100%)}100%{transform:translateY(100vh)}}
        .bo1{position:absolute;width:700px;height:700px;border-radius:50%;background:radial-gradient(circle,rgba(255,107,0,0.11),transparent 70%);top:-250px;left:-150px;animation:o1 14s ease-in-out infinite}
        .bo2{position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(124,58,237,0.09),transparent 70%);bottom:-180px;right:-120px;animation:o2 17s ease-in-out infinite}
        .bo3{position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(0,229,255,0.07),transparent 70%);top:40%;right:15%;animation:o1 20s ease-in-out infinite reverse}
        .bgrid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,107,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,107,0,0.04) 1px,transparent 1px);background-size:64px 64px;animation:gp 5s ease-in-out infinite}
        .bscan{position:absolute;width:100%;height:3px;background:linear-gradient(90deg,transparent,rgba(255,107,0,0.1),transparent);animation:sc 10s linear infinite}
      `}</style>
      <div className="bo1"/><div className="bo2"/><div className="bo3"/>
      <div className="bgrid"/><div className="bscan"/>
    </div>
  )
}
