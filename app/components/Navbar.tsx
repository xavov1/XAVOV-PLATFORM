'use client'

import Link from "next/link"
import { useEffect, useState } from "react"

export default function Navbar(){

  const [points,setPoints] = useState(0)
  const [cartCount,setCartCount] = useState(0)

  useEffect(()=>{

    const savedPoints = localStorage.getItem("points")
    if(savedPoints){
      setPoints(Number(savedPoints))
    }

    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    setCartCount(cart.length)

  },[])

  return(

    <div
      style={{
        width:"100%",
        background:"#0b0f14",
        borderBottom:"1px solid #1f2937",
        padding:"14px 30px",
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        color:"white"
      }}
    >

      <Link
        href="/"
        style={{
          fontWeight:"bold",
          fontSize:"20px",
          textDecoration:"none",
          color:"white"
        }}
      >
        XAVOV
      </Link>

      <div style={{
        display:"flex",
        gap:"25px",
        alignItems:"center"
      }}>

        <Link
          href="/cart"
          style={{
            textDecoration:"none",
            color:"white",
            position:"relative"
          }}
        >
          🛒 Cart

          {cartCount > 0 && (
            <span style={{
              position:"absolute",
              top:"-8px",
              right:"-12px",
              background:"#ef4444",
              borderRadius:"50%",
              padding:"3px 7px",
              fontSize:"12px"
            }}>
              {cartCount}
            </span>
          )}

        </Link>

        <Link
          href="/orders"
          style={{
            textDecoration:"none",
            color:"white"
          }}
        >
          My Orders
        </Link>

        <span>
          My Points: {points}
        </span>

      </div>

    </div>

  )

}