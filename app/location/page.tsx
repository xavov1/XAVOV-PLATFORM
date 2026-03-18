'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LocationPage(){

  const router = useRouter()

  const [city,setCity] = useState('')
  const [district,setDistrict] = useState('')
  const [street,setStreet] = useState('')

  function saveLocation(){

    if(!city || !district || !street){
      alert("Complete address")
      return
    }

    const location = {
      city,
      district,
      street
    }

    localStorage.setItem('userLocation',JSON.stringify(location))

    router.push('/payment')

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
          Delivery Address
        </h1>

        <input
          placeholder="City"
          value={city}
          onChange={(e)=>setCity(e.target.value)}
          style={{
            width:'100%',
            padding:'12px',
            marginBottom:'12px'
          }}
        />

        <input
          placeholder="District"
          value={district}
          onChange={(e)=>setDistrict(e.target.value)}
          style={{
            width:'100%',
            padding:'12px',
            marginBottom:'12px'
          }}
        />

        <input
          placeholder="Street"
          value={street}
          onChange={(e)=>setStreet(e.target.value)}
          style={{
            width:'100%',
            padding:'12px',
            marginBottom:'20px'
          }}
        />

        <button
          onClick={saveLocation}
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
          Continue To Payment
        </button>

      </div>

    </div>

  )
}