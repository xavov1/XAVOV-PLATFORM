'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

export default function Home() {

const canvasRef = useRef<HTMLCanvasElement>(null)

useEffect(() => {

const canvas = canvasRef.current!
const ctx = canvas.getContext('2d')!

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const particles:any[] = []

for(let i=0;i<120;i++){
particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
vx:(Math.random()-0.5)*0.4,
vy:(Math.random()-0.5)*0.4,
size:Math.random()*1.5+0.5,
opacity:Math.random()*0.8+0.2,
color:i%3===0?'#C9A84C':i%3===1?'#1E90FF':'#ffffff'
})
}

let frame=0
let animId:number

function draw(){

frame++

ctx.fillStyle='rgba(4,9,15,0.35)'
ctx.fillRect(0,0,canvas.width,canvas.height)

particles.forEach((p,i)=>{

p.x+=p.vx
p.y+=p.vy

if(p.x<0||p.x>canvas.width)p.vx*=-1
if(p.y<0||p.y>canvas.height)p.vy*=-1

particles.slice(i+1,i+6).forEach((p2:any)=>{

const dx=p.x-p2.x
const dy=p.y-p2.y
const dist=Math.sqrt(dx*dx+dy*dy)

if(dist<120){
ctx.beginPath()
ctx.moveTo(p.x,p.y)
ctx.lineTo(p2.x,p2.y)
ctx.strokeStyle=p.color
ctx.globalAlpha=(1-dist/120)*0.15
ctx.lineWidth=0.5
ctx.stroke()
ctx.globalAlpha=1
}

})

ctx.beginPath()
ctx.arc(p.x,p.y,p.size,0,Math.PI*2)
ctx.fillStyle=p.color
ctx.globalAlpha=p.opacity*(0.6+Math.sin(frame*0.02+i)*0.4)
ctx.fill()
ctx.globalAlpha=1

})

animId=requestAnimationFrame(draw)

}

draw()

const resize=()=>{
canvas.width=window.innerWidth
canvas.height=window.innerHeight
}

window.addEventListener('resize',resize)

return ()=>{
cancelAnimationFrame(animId)
window.removeEventListener('resize',resize)
}

},[])

return(

<main style={{
position:'relative',
minHeight:'100vh',
overflow:'hidden',
background:'#020202'
}}>

<canvas
ref={canvasRef}
style={{
position:'absolute',
inset:0,
zIndex:0
}}
/>

<div style={{
position:'relative',
zIndex:10,
minHeight:'100vh',
display:'flex',
flexDirection:'column',
alignItems:'center',
justifyContent:'center'
}}>

{/* XAVOV */}

<div style={{
fontFamily:"Georgia,serif",
fontSize:'80px',
fontWeight:900,
letterSpacing:'20px',
background:'linear-gradient(135deg,#8B6914,#F0D080,#C9A84C,#F0D080,#8B6914)',
WebkitBackgroundClip:'text',
WebkitTextFillColor:'transparent',
filter:'drop-shadow(0 0 40px rgba(201,168,76,0.5))',
marginBottom:'8px',
animation:'logoFloat 4s ease-in-out infinite'
}}>
XAVOV
</div>

<div style={{
fontFamily:'monospace',
fontSize:'11px',
letterSpacing:'6px',
color:'rgba(201,168,76,0.4)',
marginBottom:'10px'
}}>
NEXT GENERATION COMMERCE
</div>

<div style={{
width:'200px',
height:'1px',
marginBottom:'60px',
background:'linear-gradient(90deg,transparent,#C9A84C,transparent)',
boxShadow:'0 0 20px rgba(201,168,76,0.3)'
}}/>

<div style={{display:'flex',gap:'24px'}}>

<Link href="/store" style={{textDecoration:'none'}}>

<div style={{
width:'200px',
height:'100px',
border:'1px solid rgba(201,168,76,0.3)',
background:'rgba(201,168,76,0.04)',
borderRadius:'2px',
display:'flex',
flexDirection:'column',
alignItems:'center',
justifyContent:'center',
gap:'6px',
cursor:'pointer',
backdropFilter:'blur(20px)',
transition:'all 0.3s ease',
boxShadow:'0 0 30px rgba(201,168,76,0.05)',
}}
>

<span style={{
color:'rgba(201,168,76,1)',
fontSize:'18px',
fontWeight:700,
letterSpacing:'4px',
fontFamily:'Georgia,serif'
}}>
المتجر
</span>

<span style={{
color:'rgba(201,168,76,0.35)',
fontSize:'9px',
letterSpacing:'5px',
fontFamily:'monospace'
}}>
STORE
</span>

</div>

</Link>

<Link href="/xa" style={{textDecoration:'none'}}>

<div style={{
width:'200px',
height:'100px',
border:'1px solid rgba(30,144,255,0.3)',
background:'rgba(30,144,255,0.04)',
borderRadius:'2px',
display:'flex',
flexDirection:'column',
alignItems:'center',
justifyContent:'center',
gap:'6px',
cursor:'pointer',
backdropFilter:'blur(20px)',
transition:'all 0.3s ease',
boxShadow:'0 0 30px rgba(30,144,255,0.05)'
}}
>

<span style={{
color:'rgba(30,144,255,1)',
fontSize:'18px',
fontWeight:700,
letterSpacing:'4px',
fontFamily:'Georgia,serif'
}}>
XA-A-B-C
</span>

<span style={{
color:'rgba(30,144,255,0.35)',
fontSize:'9px',
letterSpacing:'5px',
fontFamily:'monospace'
}}>
GATEWAY
</span>

</div>

</Link>

</div>

</div>

<style>{`
@keyframes logoFloat{
0%,100%{transform:translateY(0)}
50%{transform:translateY(-10px)}
}
`}</style>

</main>

)

}