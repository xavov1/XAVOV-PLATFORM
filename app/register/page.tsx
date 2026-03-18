'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage(){

  const router = useRouter()

  const [phone,setPhone] = useState('')
  const [email,setEmail] = useState('')

  function sendCode(){
    if(!phone){
      alert("Enter phone number")
      return
    }

    localStorage.setItem('userPhone',phone)
    localStorage.setItem('userEmail',email)

    router.push('/otp')
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
          fontSize:'28px',
          marginBottom:'20px',
          fontWeight:'bold'
        }}>
          Register
        </h1>

        <input
          placeholder="Phone Number"
          value={phone}
          onChange={(e)=>setPhone(e.target.value)}
          style={{
            width:'100%',
            padding:'12px',
            marginBottom:'12px'
          }}
        />

        <input
          placeholder="Email (optional)"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          style={{
            width:'100%',
            padding:'12px',
            marginBottom:'20px'
          }}
        />

        <button
          onClick={sendCode}
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
          Send Verification Code
        </button>

      </div>

    </div>

  )
}