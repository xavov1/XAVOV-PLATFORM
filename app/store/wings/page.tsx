'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const WINGS = [
  { code:'A', num:'1500', ar:'الأجهزة الذكية', en:'SMART DEVICES',     icon:'◈', windows:['A1 جوالات','A2 لابتوبات','A3 قطع داخلية','A4 طابعات','A5 شاشات'],           glow:'201,168,76',  href:'/store/wings/1500' },
  { code:'B', num:'1600', ar:'الأجهزة المنزلية',en:'HOME APPLIANCES',   icon:'◉', windows:['B1 ثلاجات','B2 غسالات','B3 مكيفات','B4 أفران','B5 صغيرة','B6 كوفي'],        glow:'30,144,255',  href:'/store/wings/1600' },
  { code:'C', num:'1700', ar:'الزراعي والصناعي', en:'AGRI & INDUSTRIAL', icon:'⬡', windows:['C1 مضخات','C2 معدات أرض','C3 مولدات','C4 صناعي ثقيل','C5 أدوات','C6 سلامة'], glow:'0,200,120',   href:'/store/wings/1700' },
  { code:'D', num:'1800', ar:'الإلكترونيات',    en:'ELECTRONICS',       icon:'◇', windows:['D1 تلفزيونات','D2 صوتيات','D3 مراقبة','D4 ساعات','D5 كاميرات'],             glow:'180,100,255', href:'/store/wings/1800' },
  { code:'G', num:'1900', ar:'الألعاب',         en:'GAMING',            icon:'⬢', windows:['G1 PC Gaming','G2 PlayStation','G3 Xbox','G4 رقمي','G5 غرفة غيمينق'],        glow:'255,80,80',   href:'/store/wings/1900' },
  { code:'F', num:'2000', ar:'قطع السيارات',    en:'AUTO PARTS',        icon:'◎', windows:['F1 تويوتا','F2 كيا','F3 شانجان+MG','F4 هوندا','F5 شفروليه'],                glow:'255,160,30',  href:'/store/wings/2000' },
]

export default function Wings() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [active, setActive] = useState<number|null>(null)
  const [entered, setEntered] = useState(false)

  useEffect(()=>{
    setTimeout(()=>setEntered(true),100)
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const pts:{x:number,y:number,vx:number,vy:number,r:number,c:string}[]=[]
    for(let i=0;i<60;i++) pts.push({
      x:Math.random()*canvas.width, y:Math.random()*canvas.height,
      vx:(Math.random()-.5)*.3, vy:(Math.random()-.5)*.3,
      r:Math.random()*1.2+.3,
      c:i%3===0?'#C9A84C':i%3===1?'#1E90FF':'#fff'
    })
    let f=0,id:number
    const draw=()=>{
      f++
      ctx.fillStyle='rgba(4,9,15,.18)'
      ctx.fillRect(0,0,canvas.width,canvas.height)
      ctx.strokeStyle='rgba(201,168,76,.025)'
      ctx.lineWidth=1
      for(let x=0;x<canvas.width;x+=120){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,canvas.height);ctx.stroke()}
      for(let y=0;y<canvas.height;y+=120){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(canvas.width,y);ctx.stroke()}
      const sy=(f*.6)%canvas.height
      const g=ctx.createLinearGradient(0,sy-16,0,sy+2)
      g.addColorStop(0,'rgba(201,168,76,0)');g.addColorStop(1,'rgba(201,168,76,.025)')
      ctx.fillStyle=g;ctx.fillRect(0,sy-16,canvas.width,18)
      pts.forEach((p,i)=>{
        p.x+=p.vx;p.y+=p.vy
        if(p.x<0||p.x>canvas.width)p.vx*=-1
        if(p.y<0||p.y>canvas.height)p.vy*=-1
        ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2)
        ctx.fillStyle=p.c
        ctx.globalAlpha=.4+Math.sin(f*.02+i)*.3
        ctx.fill();ctx.globalAlpha=1
      })
      id=requestAnimationFrame(draw)
    }
    draw()
    const r=()=>{canvas.width=window.innerWidth;canvas.height=window.innerHeight}
    window.addEventListener('resize',r)
    return()=>{cancelAnimationFrame(id);window.removeEventListener('resize',r)}
  },[])

  return (
    <main style={{position:'relative',minHeight:'100vh',overflow:'hidden',background:'#04090F'}}>
      <canvas ref={canvasRef} style={{position:'absolute',inset:0,zIndex:0}}/>

      <div style={{position:'relative',zIndex:10,minHeight:'100vh',padding:'48px 40px',display:'flex',flexDirection:'column'}}>

        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'56px'}}>
          <Link href="/store" style={{textDecoration:'none'}}>
            <div style={{
              fontFamily:'monospace',fontSize:'10px',letterSpacing:'4px',
              color:'rgba(201,168,76,0.35)',cursor:'pointer',
              transition:'color .3s',display:'flex',alignItems:'center',gap:'8px',
            }}
            onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.color='rgba(201,168,76,.9)'}
            onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.color='rgba(201,168,76,.35)'}>
              ← STORE
            </div>
          </Link>

          <div style={{textAlign:'center'}}>
            <div style={{
              fontFamily:"'Georgia',serif",fontSize:'11px',
              letterSpacing:'10px',color:'rgba(201,168,76,0.4)',
            }}>XAVOV</div>
            <div style={{
              fontFamily:"'Georgia',serif",fontSize:'32px',fontWeight:900,
              letterSpacing:'14px',
              background:'linear-gradient(135deg,#8B6914,#F0D080,#C9A84C)',
              WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',
              filter:'drop-shadow(0 0 20px rgba(201,168,76,.35))',
            }}>WINGS</div>
          </div>

          <div style={{fontFamily:'monospace',fontSize:'10px',letterSpacing:'3px',color:'rgba(201,168,76,0.25)'}}>
            ٦ أجنحة · ٣٢ نافذة
          </div>
        </div>

        <div style={{width:'100%',height:'1px',background:'linear-gradient(90deg,transparent,rgba(201,168,76,.3),transparent)',marginBottom:'48px'}}/>

        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(3,1fr)',
          gap:'20px',
          flex:1,
        }}>
          {WINGS.map((w,i)=>{
            const isActive = active===i
            const delay = i*80
            return (
              <Link key={w.code} href={w.href} style={{textDecoration:'none'}}>
                <div
                  onMouseEnter={()=>setActive(i)}
                  onMouseLeave={()=>setActive(null)}
                  style={{
                    border:`1px solid rgba(${w.glow},${isActive?.5:.15})`,
                    background:`rgba(${w.glow},${isActive?.07:.02})`,
                    borderRadius:'3px',
                    padding:'28px 24px',
                    cursor:'pointer',
                    backdropFilter:'blur(20px)',
                    transition:'all .4s cubic-bezier(.34,1.56,.64,1)',
                    boxShadow: isActive
                      ? `0 0 60px rgba(${w.glow},.15),0 20px 40px rgba(0,0,0,.4),inset 0 1px 0 rgba(${w.glow},.15)`
                      : `0 0 20px rgba(${w.glow},.04)`,
                    transform: isActive ? 'translateY(-8px) scale(1.02)' : entered?'translateY(0)':'translateY(30px)',
                    opacity: entered?1:0,
                    transitionDelay: entered?`0ms`:`${delay}ms`,
                    height:'100%',
                    position:'relative',
                    overflow:'hidden',
                  }}>

                  <div style={{
                    position:'absolute',top:0,right:0,
                    width:'40px',height:'40px',
                    borderTop:`1px solid rgba(${w.glow},${isActive?.6:.2})`,
                    borderRight:`1px solid rgba(${w.glow},${isActive?.6:.2})`,
                    transition:'all .4s',
                  }}/>
                  <div style={{
                    position:'absolute',bottom:0,left:0,
                    width:'30px',height:'30px',
                    borderBottom:`1px solid rgba(${w.glow},${isActive?.4:.1})`,
                    borderLeft:`1px solid rgba(${w.glow},${isActive?.4:.1})`,
                    transition:'all .4s',
                  }}/>

                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'16px'}}>
                    <div style={{
                      fontFamily:'monospace',fontSize:'11px',letterSpacing:'3px',
                      color:`rgba(${w.glow},.5)`,
                    }}>WING · {w.code}</div>
                    <div style={{
                      fontSize:'20px',
                      color:`rgba(${w.glow},${isActive?1:.6})`,
                      filter:`drop-shadow(0 0 ${isActive?12:4}px rgba(${w.glow},.5))`,
                      transition:'all .4s',
                    }}>{w.icon}</div>
                  </div>

                  <div style={{
                    fontFamily:'monospace',fontSize:'36px',fontWeight:700,
                    color:`rgba(${w.glow},${isActive?1:.7})`,
                    letterSpacing:'2px',lineHeight:1,marginBottom:'4px',
                    filter:`drop-shadow(0 0 ${isActive?16:0}px rgba(${w.glow},.4))`,
                    transition:'all .4s',
                  }}>{w.num}</div>

                  <div style={{
                    fontFamily:"'Georgia',serif",fontSize:'15px',fontWeight:700,
                    color:isActive?'rgba(255,255,255,.95)':'rgba(255,255,255,.6)',
                    letterSpacing:'2px',marginBottom:'4px',
                    transition:'color .4s',
                  }}>{w.ar}</div>

                  <div style={{
                    fontFamily:'monospace',fontSize:'9px',letterSpacing:'3px',
                    color:`rgba(${w.glow},.35)`,marginBottom:'20px',
                  }}>{w.en}</div>

                  <div style={{
                    width:isActive?'100%':'40%',height:'1px',marginBottom:'16px',
                    background:`linear-gradient(90deg,rgba(${w.glow},.5),transparent)`,
                    transition:'width .5s ease',
                  }}/>

                  <div style={{display:'flex',flexDirection:'column',gap:'6px'}}>
                    {w.windows.map((win,j)=>(
                      <div key={j} style={{
                        display:'flex',alignItems:'center',gap:'8px',
                        fontFamily:'monospace',fontSize:'10px',
                        color:isActive?'rgba(255,255,255,.55)':'rgba(255,255,255,.25)',
                        letterSpacing:'.5px',
                        transition:`all .3s ease ${j*40}ms`,
                        transform:isActive?'translateX(0)':'translateX(4px)',
                      }}>
                        <div style={{
                          width:'3px',height:'3px',borderRadius:'50%',flexShrink:0,
                          background:`rgba(${w.glow},${isActive?.8:.3})`,
                          boxShadow:isActive?`0 0 6px rgba(${w.glow},.5)`:'none',
                          transition:'all .3s',
                        }}/>
                        {win}
                      </div>
                    ))}
                  </div>

                  <div style={{
                    marginTop:'20px',
                    display:'flex',alignItems:'center',gap:'6px',
                    fontFamily:'monospace',fontSize:'9px',letterSpacing:'3px',
                    color:`rgba(${w.glow},${isActive?.7:.2})`,
                    transition:'all .4s',
                    transform:isActive?'translateX(0)':'translateX(-4px)',
                  }}>
                    <span>ENTER WING</span>
                    <span style={{fontSize:'12px',transform:isActive?'translateX(4px)':'translateX(0)',transition:'transform .4s'}}>→</span>
                  </div>

                </div>
              </Link>
            )
          })}
        </div>

        <div style={{
          textAlign:'center',marginTop:'40px',
          fontFamily:'monospace',fontSize:'9px',letterSpacing:'4px',
          color:'rgba(201,168,76,.15)',
        }}>
          XAVOV · ٦ WINGS · ٣٢ WINDOWS · POWERED BY AI
        </div>

      </div>

      <style>{`
        *{box-sizing:border-box;}
        @media(max-width:768px){
          div[style*="grid-template-columns"]{
            grid-template-columns:1fr!important;
          }
        }
      `}</style>
    </main>
  )
}