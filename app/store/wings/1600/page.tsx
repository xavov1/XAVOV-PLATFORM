'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const WINDOWS = [
  {
    code:'B1', ar:'ثلاجات', en:'REFRIGERATORS',
    icon:'🧊', glow:'30,144,255',
    desc:'ثلاجات عائلية وصغيرة بأحدث تقنيات التبريد',
    products:['Samsung Family Hub','LG InstaView','Haier Multi-Door','Toshiba Side-by-Side','Hisense French Door'],
    href:'/store/wings/1600/B1',
  },
  {
    code:'B2', ar:'غسالات', en:'WASHING MACHINES',
    icon:'🌀', glow:'0,200,180',
    desc:'غسالات أوتوماتيك وشبه أوتوماتيك للاستخدام اليومي',
    products:['Samsung AddWash','LG TwinWash','Haier Drum','Toshiba Front Load','Midea TopLoad'],
    href:'/store/wings/1600/B2',
  },
  {
    code:'B3', ar:'مكيفات', en:'AIR CONDITIONERS',
    icon:'❄️', glow:'100,200,255',
    desc:'مكيفات سبليت وشباك بكفاءة عالية وتوفير للطاقة',
    products:['Gree Inverter 24K','Midea U-Shape','Haier 18K','Carrier Performance','York Affinity'],
    href:'/store/wings/1600/B3',
  },
  {
    code:'B4', ar:'أفران', en:'OVENS & COOKERS',
    icon:'🔥', glow:'255,120,30',
    desc:'أفران كهربائية وغاز وميكروويف للمطبخ الحديث',
    products:['Samsung Smart Oven','LG NeoChef','Bosch Serie 6','Midea Built-in','Whirlpool W7'],
    href:'/store/wings/1600/B4',
  },
  {
    code:'B5', ar:'أجهزة صغيرة', en:'SMALL APPLIANCES',
    icon:'⚡', glow:'255,200,0',
    desc:'خلاطات ومكانس وأجهزة منزلية صغيرة متنوعة',
    products:['Dyson V15','Philips Airfryer','Tefal Blender','Braun MultiQuick','Rowenta Steam'],
    href:'/store/wings/1600/B5',
  },
  {
    code:'B6', ar:'كوفي', en:'COFFEE MACHINES',
    icon:'☕', glow:'180,100,50',
    desc:'ماكينات قهوة إسبريسو وفلتر وكبسولات',
    products:['De\'Longhi Magnifica','Nespresso Vertuo','Breville Barista','Jura E8','Siemens EQ.9'],
    href:'/store/wings/1600/B6',
  },
]

export default function Wing1600() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [active, setActive] = useState<number|null>(null)
  const [entered, setEntered] = useState(false)

  useEffect(()=>{
    setTimeout(()=>setEntered(true),80)
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
                    padding:'28px 24px',
                    cursor:'pointer',
                    transition:'all .4s',
                  }}>

                  <div style={{fontSize:'28px',color:'#fff'}}>{w.code}</div>
                  <div style={{color:'#aaa',marginBottom:'10px'}}>{w.ar}</div>
                  <div style={{color:'#555',marginBottom:'10px'}}>{w.desc}</div>

                  <div style={{display:'flex',flexDirection:'column',gap:'5px',marginBottom:'10px'}}>
                    {w.products.map((p,j)=>(
                      <div key={j} style={{fontSize:'10px',color:'#666'}}>{p}</div>
                    ))}
                  </div>

                  {/* 🔥 OPEN + CART */}
                  <div style={{
                    marginTop:'10px',
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