"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function CartIcon() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const updateCart = () => {
      const stored = localStorage.getItem("cart")
      const cart = stored ? JSON.parse(stored) : []

      const totalItems = cart.reduce(
        (sum: number, item: any) => sum + item.quantity,
        0
      )

      setCount(totalItems)
    }

    updateCart()

    window.addEventListener("cartUpdated", updateCart)

    return () => {
      window.removeEventListener("cartUpdated", updateCart)
    }
  }, [])

  return (
    <Link href="/cart" style={{ position: "relative", textDecoration: "none" }}>
      <div
        style={{
          fontSize: 24,
          cursor: "pointer",
          color: "#fff",
        }}
      >
        🛒
      </div>

      {count > 0 && (
        <span
          style={{
            position: "absolute",
            top: -8,
            right: -10,
            background: "#16a34a",
            color: "#fff",
            borderRadius: "50%",
            padding: "4px 8px",
            fontSize: 12,
            fontWeight: "bold",
          }}
        >
          {count}
        </span>
      )}
    </Link>
  )
}