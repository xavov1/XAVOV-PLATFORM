'use client'

import { useState,useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function PaymentPage(){

  const router = useRouter()

  const [order,setOrder] = useState<any>(null)
  const [method,setMethod] = useState("card")

  useEffect(()=>{

    const cart = JSON.parse(localStorage.getItem('cart') || '[]')

    if(cart.length > 0){
      setOrder(cart[cart.length - 1])
    }

  },[])

  function payNow(){

    const payment = {
      method,
      status:"paid"
    }

    localStorage.setItem("payment",JSON.stringify(payment))

    router.push("/track")

  }

  if(!order){
    return <div style={{color:"white"}}>Loading...</div>
  }

  return(

    <div style={{
      minHeight:'100vh',
      background:'#0b0f14',
      display:'flex',
      alignItems:'center',
      justifyContent:'center'
    }}>

      <div style={{
        width:'420px',
        background:'#121821',
        padding:'30px',
        borderRadius:'10px',
        color:'white'
      }}>

        <h1 style={{
          fontSize:'26px',
          marginBottom:'20px'
        }}>
          Payment
        </h1>

        <p style={{marginBottom:'10px'}}>
          Product: {order.product}
        </p>

        <p style={{marginBottom:'20px'}}>
          Price: {order.price} SAR
        </p>

        <div style={{marginBottom:'20px'}}>

          <label style={{display:'block',marginBottom:'10px'}}>
            <input
              type="radio"
              checked={method==="card"}
              onChange={()=>setMethod("card")}
            /> Card
          </label>

          <label style={{display:'block',marginBottom:'10px'}}>
            <input
              type="radio"
              checked={method==="stcpay"}
              onChange={()=>setMethod("stcpay")}
            /> STC Pay
          </label>

          <label style={{display:'block',marginBottom:'10px'}}>
            <input
              type="radio"
              checked={method==="tabby"}
              onChange={()=>setMethod("tabby")}
            /> Tabby
          </label>

          <label style={{display:'block'}}>
            <input
              type="radio"
              checked={method==="tamara"}
              onChange={()=>setMethod("tamara")}
            /> Tamara
          </label>

        </div>

        <button
          onClick={payNow}
          style={{
            width:'100%',
            padding:'12px',
            background:'#22c55e',
            border:'none',
            borderRadius:'6px',
            color:'white',
            fontWeight:'bold',
            cursor:'pointer'
          }}
        >
          Pay Now
        </button>

      </div>

    </div>

  )
}