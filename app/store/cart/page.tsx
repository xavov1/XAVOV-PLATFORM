'use client'

import { useEffect, useState } from 'react'

export default function CartPage() {

  const [cart, setCart] = useState<any[]>([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart") || "[]")
    setCart(data)
  }, [])

  const removeItem = (id: number) => {
    const updated = cart.filter(item => item.id !== id)
    setCart(updated)
    localStorage.setItem("cart", JSON.stringify(updated))
  }

  const changeQty = (id: number, delta: number) => {
    const updated = cart.map(item => {
      if (item.id === id) {
        return { ...item, qty: Math.max(1, item.qty + delta) }
      }
      return item
    })
    setCart(updated)
    localStorage.setItem("cart", JSON.stringify(updated))
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <div style={{padding:20, color:"white", background:"#050810", minHeight:"100vh"}}>
      <h2>السلة</h2>

      {cart.length === 0 && <p>السلة فارغة</p>}

      {cart.map(item => (
        <div key={item.id} style={{border:"1px solid #333", padding:10, marginBottom:10}}>
          <h3>{item.name}</h3>
          <p>السعر: {item.price} ريال</p>

          <button onClick={() => changeQty(item.id, -1)}>-</button>
          <span style={{margin:"0 10px"}}>{item.qty}</span>
          <button onClick={() => changeQty(item.id, 1)}>+</button>

          <button 
            onClick={() => removeItem(item.id)} 
            style={{marginLeft:10, background:"red", color:"white"}}
          >
            حذف
          </button>
        </div>
      ))}

      <h3>المجموع: {total} ريال</h3>

      <button style={{marginTop:20}}>
        إتمام الطلب
      </button>
    </div>
  )
}