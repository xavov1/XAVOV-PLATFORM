"use client"

import { useEffect, useState } from "react"

type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  const updateCartStorage = (updatedCart: CartItem[]) => {
    setCart(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
    window.dispatchEvent(new Event("cartUpdated"))
  }

  const increaseQuantity = (id: string) => {
    const updatedCart = cart.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
    updateCartStorage(updatedCart)
  }

  const decreaseQuantity = (id: string) => {
    const updatedCart = cart
      .map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0)

    updateCartStorage(updatedCart)
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>🛒 سلة المشتريات</h1>

      {cart.length === 0 ? (
        <p>السلة فارغة</p>
      ) : (
        <>
          {cart.map(item => (
            <div
              key={item.id}
              style={{
                background: "#111",
                padding: 20,
                borderRadius: 10,
                marginBottom: 15,
                color: "#fff",
              }}
            >
              <h3>{item.name}</h3>
              <p>السعر: {item.price} ريال</p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 10,
                }}
              >
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 6,
                    background: "#dc2626",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => increaseQuantity(item.id)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 6,
                    background: "#16a34a",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  +
                </button>
              </div>
            </div>
          ))}

          <h2 style={{ marginTop: 30 }}>
            الإجمالي: {total} ريال
          </h2>

          <button
            onClick={() => (window.location.href = "/checkout")}
            style={{
              marginTop: 20,
              padding: "10px 20px",
              borderRadius: 8,
              background: "#2563eb",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            إتمام الطلب
          </button>
        </>
      )}
    </div>
  )
}