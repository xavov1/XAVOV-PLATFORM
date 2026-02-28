"use client"

import { useState } from "react"

type Props = {
  id: string
  name: string
}

export default function AddToCartButton({ id, name }: Props) {
  const [added, setAdded] = useState(false)

  const handleClick = () => {
    const stored = localStorage.getItem("cart")
    const cart = stored ? JSON.parse(stored) : []

    const existingIndex = cart.findIndex((item: any) => item.id === id)

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1
    } else {
      cart.push({
        id,
        name,
        price: 100,
        quantity: 1,
      })
    }

    localStorage.setItem("cart", JSON.stringify(cart))

    window.dispatchEvent(new Event("cartUpdated"))

    setAdded(true)

    setTimeout(() => {
      setAdded(false)
    }, 1000)
  }

  return (
    <button
      onClick={handleClick}
      style={{
        marginTop: 10,
        padding: "8px 16px",
        borderRadius: 8,
        background: added ? "#16a34a" : "#000",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        transition: "0.3s",
      }}
    >
      {added ? "✓ تمت الإضافة" : "أضف إلى السلة"}
    </button>
  )
}