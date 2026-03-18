'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'

export default function Store() {

const canvasRef = useRef<HTMLCanvasElement>(null)

useEffect(()=>{

const canvas = canvasRef.current!
const ctx = canvas.getContext('2d')!

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const particles:any[]=[]

for(let i=0;i<80;i++){
particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
vx:(Math.random()-0.5)*0.3,
vy:(Math.random()-0.5)*0.3,
size:Math.random()*1.2+0.3,
opacity:Math.random()*0.6+0.2,
color:i%3===0?'#C9A84C':i%3===1?'#1E90FF':'#ffffff'
})
}

let frame=0
let anim:number

function draw(){

frame++

ctx.fillStyle='rgba(4,9,15,0.2)'
ctx.fillRect(0,0,canvas.width,canvas.height)

particles.forEach((p,i)=>{

p.x+=p.vx
p.y+=p.vy

if(p.x<0||p.x>canvas.width)p.vx*=-1
if(p.y<0||p.y>canvas.height)p.vy*=-1

ctx.beginPath()
ctx.arc(p.x,p.y,p.size,0,Math.PI*2)

ctx.fillStyle=p.color
ctx.globalAlpha=p.opacity*(0.5+Math.sin(frame*0.02+i)*0.5)
ctx.fill()

ctx.globalAlpha=1

})

anim=requestAnimationFrame(draw)

}

draw()

const resize=()=>{
canvas.width=window.innerWidth
canvas.height=window.innerHeight
}

window.addEventListener('resize',resize)

return ()=>{
cancelAnimationFrame(anim)
window.removeEventListener('resize',resize)
}

},[])

const cards=[

{
ar:'الأجنحة',
en:'WINGS',
glow:'201,168,76',
href:'/store/wings'
},

{
ar:'العضويات',
en:'MEMBERSHIP',
glow:'30,144,255',
href:'/store/membership'
},

{
ar:'المزاد',
en:'AUCTIONS',
glow:'255,100,50',
href:'/store/auctions'
}

]

return(

<main style={{
position:'relative',
minHeight:'100vh',
overflow:'hidden',
background:'#020202'
}}>

<canvas ref={canvasRef} style={{
position:'absolute',
inset:0,
zIndex:0
}}/>

<div style={{
position:'relative',
zIndex:10,
minHeight:'100vh',
display:'flex',
flexDirection:'column',
alignItems:'center',
padding:'60px 24px'
}}>

<div style={{textAlign:'center'}}>

<div style={{
fontFamily:'Georgia,serif',
fontSize:'42px',
fontWeight:900,
letterSpacing:'12px',
background:'linear-gradient(135deg,#8B6914,#F0D080,#C9A84C)',
WebkitBackgroundClip:'text',
WebkitTextFillColor:'transparent'
}}>
STORE
</div>

<div style={{
width:'160px',
height:'1px',
margin:'16px auto',
background:'linear-gradient(90deg,transparent,#C9A84C,transparent)'
}}/>

</div>

<div style={{
display:'flex',
gap:'24px',
marginTop:'60px'
}}>

{cards.map((card,i)=>(

<Link key={i} href={card.href} style={{textDecoration:'none'}}>

<div style={{
width:'280px',
height:'140px',
border:`1px solid rgba(${card.glow},0.25)`,
background:`rgba(${card.glow},0.03)`,
borderRadius:'4px',
display:'flex',
flexDirection:'column',
alignItems:'center',
justifyContent:'center',
cursor:'pointer',
transition:'all 0.3s ease'
}}

onMouseEnter={e=>{
const d=e.currentTarget as HTMLDivElement
d.style.borderColor=`rgba(${card.glow},0.7)`
d.style.transform='translateY(-6px)'
}}

onMouseLeave={e=>{
const d=e.currentTarget as HTMLDivElement
d.style.borderColor=`rgba(${card.glow},0.25)`
d.style.transform='translateY(0)'
}}

>

<div style={{
fontFamily:'Georgia,serif',
fontSize:'24px',
color:`rgba(${card.glow},1)`,
letterSpacing:'4px'
}}>
{card.ar}
</div>

<div style={{
fontFamily:'monospace',
fontSize:'10px',
letterSpacing:'4px',
color:`rgba(${card.glow},0.35)`
}}>
{card.en}
</div>

</div>

</Link>

))}

</div>

<Link href="/" style={{marginTop:'60px',textDecoration:'none'}}>

<div style={{
fontFamily:'monospace',
fontSize:'10px',
letterSpacing:'4px',
color:'rgba(201,168,76,0.3)'
}}>
← XAVOV HOME
</div>

</Link>

</div>

</main>

)

}