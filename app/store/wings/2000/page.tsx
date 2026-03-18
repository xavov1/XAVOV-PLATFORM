'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const WINDOWS = [
  {
    code:'F1', ar:'تويوتا', en:'TOYOTA',
    icon:'🚗', glow:'255,160,0',
    desc:'قطع غيار تويوتا أصلية وبديلة لجميع الموديلات',
    products:['Camry 2020-2024','Land Cruiser 300','Hilux Revo','Corolla Cross','RAV4 Hybrid'],
    href:'/store/wings/2000/F1',
  },
  {
    code:'F2', ar:'كيا', en:'KIA',
    icon:'🚙', glow:'200,40,40',
    desc:'قطع غيار كيا الأصلية لجميع الموديلات الحديثة',
    products:['Sportage 2022+','Sorento','K8 Sedan','EV6','Carnival MPV'],
    href:'/store/wings/2000/F2',
  },
  {
    code:'F3', ar:'شانجان + MG', en:'CHANGAN & MG',
    icon:'⭐', glow:'180,30,255',
    desc:'قطع غيار شانجان وMG الصينية بأسعار مميزة',
    products:['CS75 Plus','Uni-K','MG ZS','MG5 Sedan','Changan Lamore'],
    href:'/store/wings/2000/F3',
  },
  {
    code:'F4', ar:'هوندا', en:'HONDA',
    icon:'🏎️', glow:'0,160,255',
    desc:'قطع غيار هوندا أصلية وبديلة معتمدة',
    products:['Accord 2022+','CR-V Hybrid','Civic Type R','HR-V e:HEV','Pilot 2023'],
    href:'/store/wings/2000/F4',
  },
  {
    code:'F5', ar:'شفروليه', en:'CHEVROLET',
    icon:'🔶', glow:'255,200,0',
    desc:'قطع غيار شفروليه الأصلية للسوق السعودي',
    products:['Tahoe 2021+','Silverado','Equinox','TrailBlazer','Camaro SS'],
    href:'/store/wings/2000/F5',
  },
]

export default function Wing2000() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [active, setActive] = useState<number|null>(null)
  const [entered, setEntered] = useState(false)

  useEffect(()=>{
    setTimeout(()=>setEntered(true),80)

    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const pts:any[]=[]
    for(let i=0;i<70;i++){
      pts.push({
        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height,
        vx:(Math.random()-.5)*.35,
        vy:(Math.random()-.5)*.35,
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
        ctx.fillStyle='#FFA000'
        ctx.fill()
      })

      id=requestAnimationFrame(draw)
    }

    draw()
    return()=>cancelAnimationFrame(id)
  },[])

  return (
    <main style={{position:'relative',minHeight:'100vh',overflow:'hidden',background:'#04090F'}}>
      <canvas ref={canvasRef} style={{position:'absolute',inset:0,zIndex:0}}/>

      <div style={{position:'relative',zIndex:10,minHeight:'100vh',padding:'40px',display:'flex',flexDirection:'column'}}>

        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'20px',flex:1}}>
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
                    cursor:'pointer',
                    transition:'all .3s',
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