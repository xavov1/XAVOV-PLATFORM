'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const WINDOWS = [
  {
    code:'A1', ar:'جوالات', en:'SMARTPHONES',
    icon:'📱', glow:'201,168,76',
    desc:'أحدث الجوالات الذكية بأسعار أقل من السوق الصيني',
    products: ['iPhone 16 Pro','Samsung S25 Ultra','Xiaomi 15 Pro','OnePlus 13','Google Pixel 9'],
    href:'/store/wings/1500/A1',
  },
  {
    code:'A2', ar:'لابتوبات', en:'LAPTOPS',
    icon:'💻', glow:'30,144,255',
    desc:'لابتوبات للعمل والغيمينق والإبداع',
    products: ['MacBook Pro M4','Dell XPS 15','ASUS ROG','Lenovo ThinkPad','HP Spectre'],
    href:'/store/wings/1500/A2',
  },
  {
    code:'A3', ar:'قطع داخلية', en:'COMPONENTS',
    icon:'⚙️', glow:'0,200,120',
    desc:'معالجات وذاكرة وكروت شاشة وقطع أصلية',
    products: ['Intel Core i9','RTX 4090','RAM 64GB DDR5','NVMe 2TB','Motherboard Z790'],
    href:'/store/wings/1500/A3',
  },
  {
    code:'A4', ar:'طابعات', en:'PRINTERS',
    icon:'🖨️', glow:'180,100,255',
    desc:'طابعات ليزر وحبر للمكتب والاستخدام الشخصي',
    products: ['HP LaserJet Pro','Canon PIXMA','Epson EcoTank','Brother HL','Xerox VersaLink'],
    href:'/store/wings/1500/A4',
  },
  {
    code:'A5', ar:'شاشات', en:'DISPLAYS',
    icon:'🖥️', glow:'255,160,30',
    desc:'شاشات 4K وOLED للعمل والغيمينق',
    products: ['LG UltraGear 4K','Samsung Odyssey','Dell UltraSharp','BenQ PD','ASUS ProArt'],
    href:'/store/wings/1500/A5',
  },
]

export default function Wing1500() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [active, setActive] = useState<number|null>(null)
  const [entered, setEntered] = useState(false)

  useEffect(()=>{
    setTimeout(()=>setEntered(true),80)
  },[])

  return (
    <main style={{padding:'40px',background:'#04090F',minHeight:'100vh'}}>
      
      <div style={{
        display:'grid',
        gridTemplateColumns:'repeat(3,1fr)',
        gap:'20px',
      }}>
        
        {WINDOWS.map((w,i)=>{
          const isA = active===i

          return (
            <Link key={w.code} href={w.href} style={{textDecoration:'none'}}>
              
              <div
                onClick={() => window.location.href = w.href} // 🔥 OPEN FIX
                onMouseEnter={()=>setActive(i)}
                onMouseLeave={()=>setActive(null)}
                style={{
                  border:`1px solid rgba(${w.glow},${isA?.55:.15})`,
                  padding:'20px',
                  color:'white',
                  cursor:'pointer'
                }}
              >

                <h3>{w.code} - {w.ar}</h3>

                <p style={{fontSize:'12px',opacity:.6}}>
                  {w.desc}
                </p>

                <div style={{marginTop:'10px'}}>
                  {w.products.map((p,j)=>(
                    <div key={j} style={{fontSize:'12px'}}>
                      • {p}
                    </div>
                  ))}
                </div>

                {/* 🔥 OPEN + CART */}
                <div style={{
                  marginTop:'20px',
                  display:'flex',
                  justifyContent:'space-between'
                }}>

                  <span>OPEN →</span>

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
                  >
                    + CART
                  </button>

                </div>

              </div>

            </Link>
          )
        })}

      </div>

    </main>
  )
}