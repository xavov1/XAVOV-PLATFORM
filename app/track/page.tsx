"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function TrackPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("id")

  const [order, setOrder] = useState<any>(null)

  useEffect(() => {
    if (!orderId) return

    fetch(`/api/orders/${orderId}`)
      .then(res => res.json())
      .then(data => setOrder(data))
  }, [orderId])

  if (!order) {
    return <div style={{ padding: 40 }}>جارٍ تحميل الطلب...</div>
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>تتبع الطلب</h1>

      <p><strong>رقم الطلب:</strong> {order.id}</p>
      <p><strong>حالة الدفع:</strong> {order.paymentStatus}</p>
      <p><strong>حالة الطلب:</strong> {order.orderStatus}</p>

      <div style={{ marginTop: 30 }}>
        <h3>مراحل الطلب:</h3>

        <ul>
          <li style={{ color: order.paymentStatus === "paid" ? "green" : "gray" }}>
            ✔ تم الدفع
          </li>

          <li style={{ color: order.orderStatus === "processing" ? "green" : "gray" }}>
            📦 قيد التجهيز
          </li>

          <li style={{ color: order.orderStatus === "shipped" ? "green" : "gray" }}>
            🚚 تم الشحن
          </li>

          <li style={{ color: order.orderStatus === "delivered" ? "green" : "gray" }}>
            📍 تم التسليم
          </li>
        </ul>
      </div>
    </div>
  )
}