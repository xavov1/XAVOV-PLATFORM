'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const WINDOWS = [
  {
    code:'C1', ar:'شاشات', en:'DISPLAYS',
    icon:'🖥️', glow:'120,180,255',
    desc:'شاشات كمبيوتر واحترافية للأعمال والبرمجة',
    products:['Samsung Odyssey','LG UltraGear','Dell UltraSharp','ASUS ProArt','MSI Curved'],
    href:'/store/wings/1700/C1',
  },
  {
    code:'C2', ar:'لابتوبات', en:'LAPTOPS',
    icon:'💻', glow:'0,200,255',
    desc:'لابتوبات للأعمال والألعاب والتصميم',
    products:['MacBook Pro','Dell XPS','ASUS ROG','HP Spectre','Lenovo Legion'],
    href:'/store/wings/1700/C2',
  },
  {
    code:'C3', ar:'أجهزة مكتبية', en:'DESKTOPS',
    icon:'🖲️', glow:'150,100,255',
    desc:'أجهزة مكتبية قوية للأداء العالي',
    products:['Custom Gaming PC','HP Omen','Dell Alienware','Lenovo ThinkCentre','ASUS Tower'],
    href:'/store/wings/1700/C3',
  },
  {
    code:'C4', ar:'ملحقات', en:'ACCESSORIES',
    icon:'🎧', glow:'255,150,100',
    desc:'كيبورد، ماوس، سماعات وإكسسوارات',
    products:['Logitech MX','Razer Viper','SteelSeries Apex','HyperX Cloud','Corsair K95'],
    href:'/store/wings/1700/C4',
  },
  {
    code:'C5', ar:'طابعات', en:'PRINTERS',
    icon:'🖨️', glow:'200,200,200',
    desc:'طابعات منزلية ومكتبية متعددة الاستخدام',
    products:['HP LaserJet','Canon Pixma','Epson EcoTank','Brother HL','Samsung Xpress'],
    href:'/store/wings/1700/C5',
  },
  {
    code:'C6', ar:'شبكات', en:'NETWORKING',
    icon:'📡', glow:'0,255,180',
    desc:'راوترات، مقويات، وأنظمة الشبكات',
    products:['TP-Link Archer','Netgear Nighthawk','Huawei 5G CPE','Asus Mesh','D-Link AX'],
    href:'/store/wings/1700/C6',
  },
]

export default function Wing1700() {
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