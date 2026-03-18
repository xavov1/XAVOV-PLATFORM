'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const WINDOWS = [
  {
    code:'D1', ar:'تلفزيونات', en:'TELEVISIONS',
    icon:'📺', glow:'180,100,255',
    desc:'تلفزيونات OLED وQLED و8K بأحدث التقنيات',
    products:['LG OLED C4','Samsung QN900D','Sony Bravia 9','Hisense U8N','TCL QM891G'],
    href:'/store/wings/1800/D1',
  },
  {
    code:'D2', ar:'صوتيات', en:'AUDIO SYSTEMS',
    icon:'🔊', glow:'140,80,255',
    desc:'سماعات وأنظمة صوت منزلية وشخصية احترافية',
    products:['Sonos Arc Ultra','Bose 900','Sony HT-A9M2','JBL Bar 1300','Samsung Q990D'],
    href:'/store/wings/1800/D2',
  },
  {
    code:'D3', ar:'مراقبة', en:'SURVEILLANCE',
    icon:'📷', glow:'100,140,255',
    desc:'كاميرات مراقبة وأنظمة أمن للمنازل والمحلات',
    products:['Hikvision 4K','Dahua Pro','Reolink E1','Axis P3245','Hanwha XNV'],
    href:'/store/wings/1800/D3',
  },
  {
    code:'D4', ar:'ساعات', en:'SMART WATCHES',
    icon:'⌚', glow:'200,160,255',
    desc:'ساعات ذكية رياضية وفاخرة لكل الأذواق',
    products:['Apple Watch Ultra 2','Samsung Galaxy Watch 7','Garmin Fenix 8','Huawei Watch GT5','Xiaomi Watch S4'],
    href:'/store/wings/1800/D4',
  },
  {
    code:'D5', ar:'كاميرات', en:'CAMERAS',
    icon:'📸', glow:'160,100,220',
    desc:'كاميرات احترافية ورياضية وللمحتوى الرقمي',
    products:['Sony A7 V','Canon EOS R6 II','Nikon Z8','GoPro Hero 13','DJI Osmo 4'],
    href:'/store/wings/1800/D5',
  },
]

export default function Wing1800() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [active, setActive] = useState<number|null>(null)

  useEffect(()=>{
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const pts:any[]=[]
    for(let i=0;i<50;i++){
      pts.push({
        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height,
        vx:(Math.random()-.5)*.3,
        vy:(Math.random()-.5)*.3,
      })
    }

    let id:number
    const draw=()=>{
      ctx.fillStyle='rgba(4,9,15,.2)'
      ctx.fillRect(0,0,canvas.width,canvas.height)

      pts.forEach(p=>{
        p.x+=p.vx
        p.y+=p.vy
        if(p.x<0||p.x>canvas.width)p.vx*=-1
        if(p.y<0||p.y>canvas.height)p.vy*=-1

        ctx.beginPath()
        ctx.arc(p.x,p.y,1.5,0,Math.PI*2)
        ctx.fillStyle='#B464FF'
        ctx.fill()
      })

      id=requestAnimationFrame(draw)
    }

    draw()
    return()=>cancelAnimationFrame(id)
  },[])

  return (
    <main style={{position:'relative',minHeight:'100vh',background:'#04090F'}}>
      <canvas ref={canvasRef} style={{position:'absolute',inset:0}}/>

      <div style={{position:'relative',zIndex:10,padding:'40px'}}>

        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'20px'}}>
          {WINDOWS.map((w,i)=>{
            const isA=active===i
            return (
              <Link key={w.code} href={w.href} style={{textDecoration:'none'}}>
                
                <div
                  onClick={() => window.location.href = w.href} // 🔥 FIX OPEN
                  onMouseEnter={()=>setActive(i)}
                  onMouseLeave={()=>setActive(null)}
                  style={{
                    border:`1px solid rgba(${w.glow},${isA?.55:.15})`,
                    background:`rgba(${w.glow},${isA?.07:.02})`,
                    borderRadius:'3px',
                    padding:'24px',
                    transition:'all .3s',
                    cursor:'pointer',
                  }}>

                  <div style={{fontSize:'24px',color:'#fff'}}>{w.code}</div>
                  <div style={{color:'#aaa',marginBottom:'10px'}}>{w.ar}</div>
                  <div style={{color:'#555',marginBottom:'10px'}}>{w.desc}</div>

                  <div style={{marginBottom:'10px'}}>
                    {w.products.map((p,j)=>(
                      <div key={j} style={{fontSize:'10px',color:'#666'}}>{p}</div>
                    ))}
                  </div>

                  {/* OPEN + CART */}
                  <div style={{
                    display:'flex',
                    justifyContent:'space-between',
                    alignItems:'center'
                  }}>
                    <span style={{color:'#aaa'}}>OPEN →</span>

                    <button
                      onClick={(e)=>{
                        e.preventDefault()
                        e.stopPropagation()

                        const existing = JSON.parse(localStorage.getItem("cart") || "[]")

                        const newItem = {
                          id: Date.now(),
                          name: w.ar,
                          price: 1000,
                        }

                        localStorage.setItem("cart", JSON.stringify([...existing, newItem]))
                      }}
                      style={{
                        padding:'6px 10px',
                        fontSize:'10px',
                        border:`1px solid rgba(${w.glow},.5)`,
                        background:'transparent',
                        color:`rgba(${w.glow},.9)`,
                        cursor:'pointer'
                      }}
                    >
                      + CART
                    </button>
                  </div>

                </div>

              </Link>
            )
          })}
        </div>

      </div>
    </main>
  )
}