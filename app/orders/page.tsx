"use client"
import { useEffect, useState } from "react"

export default function OrdersPage() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/api/orders")
      .then(res => res.json())
      .then(data => setOrders(data))
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>Orders</h1>

      {orders.map((order: any) => (
        <div key={order.id} style={{
          border: "1px solid #ccc",
          marginBottom: 10,
          padding: 10
        }}>
          <p><b>ID:</b> {order.id}</p>
          <p><b>Status:</b> {order.status}</p>
          <p><b>City:</b> {order.city}</p>
        </div>
      ))}
    </div>
  )
}