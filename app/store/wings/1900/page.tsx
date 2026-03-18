'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const WINDOWS = [
  {
    code:'G1', ar:'PC Gaming', en:'PC GAMING',
    icon:'🖥️', glow:'255,80,80',
    desc:'أجهزة PC Gaming جاهزة وقطع للبناء والتطوير',
    products:['ASUS ROG Strix','MSI Titan GT77','Alienware Aurora','Lenovo Legion Tower','HP Omen 45L'],
    href:'/store/wings/1900/G1',
  },
  {
    code:'G2', ar:'PlayStation', en:'PLAYSTATION',
    icon:'🎮', glow:'0,100,255',
    desc:'PS5 وإكسسوارات وألعاب PlayStation الأصلية',
    products:['PS5 Pro','DualSense Edge','PlayStation VR2','PS5 Slim','DualSense Controller'],
    href:'/store/wings/1900/G2',
  },
  {
    code:'G3', ar:'Xbox', en:'XBOX',
    icon:'🟢', glow:'0,200,80',
    desc:'Xbox Series X وS وإكسسوارات وألعاب أصلية',
    products:['Xbox Series X','Xbox Series S','Elite Controller 2','Xbox Headset','Seagate Expansion'],
    href:'/store/wings/1900/G3',
  },
  {
    code:'G4', ar:'رقمي', en:'DIGITAL',
    icon:'💎', glow:'100,200,255',
    desc:'بطاقات هدايا وألعاب رقمية واشتراكات Gaming',
    products:['PSN Gift Card','Xbox Game Pass','Steam Wallet','Nintendo eShop','EA Play Pro'],
    href:'/store/wings/1900/G4',
  },
  {
    code:'G5', ar:'غرفة غيمينق', en:'GAMING ROOM',
    icon:'⚡', glow:'255,160,0',
    desc:'كراسي وشاشات وإضاءة وإكسسوارات الغرفة',
    products:['Secretlab Titan','ASUS ROG Swift','Razer Basilisk V3','HyperX Cloud III','Nanoleaf Lines'],
    href:'/store/wings/1900/G5',
  },
]

export default function Wing1900() {
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
        ctx.fillStyle='#FF5050'
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