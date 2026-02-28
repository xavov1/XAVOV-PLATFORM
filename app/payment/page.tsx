"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderId = searchParams.get("id")

  const [method, setMethod] = useState("mada")
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    if (!orderId) return

    setLoading(true)

    // تحديث حالة الطلب إلى paid (وهمي)
    await fetch(`/api/orders/${orderId}/pay`, {
      method: "POST",
    })

    setTimeout(() => {
      router.push(`/success?id=${orderId}`)
    }, 1000)
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>بوابة الدفع</h1>

      <div style={{ marginTop: 20 }}>
        <label>
          <input
            type="radio"
            value="mada"
            checked={method === "mada"}
            onChange={() => setMethod("mada")}
          />
          مدى
        </label>

        <br />

        <label>
          <input
            type="radio"
            value="visa"
            checked={method === "visa"}
            onChange={() => setMethod("visa")}
          />
          فيزا
        </label>

        <br />

        <label>
          <input
            type="radio"
            value="apple"
            checked={method === "apple"}
            onChange={() => setMethod("apple")}
          />
          Apple Pay
        </label>
      </div>

      <button
        onClick={handlePayment}
        style={{ marginTop: 30, padding: "10px 20px" }}
        disabled={loading}
      >
        {loading ? "جارٍ المعالجة..." : "إتمام الدفع"}
      </button>
    </div>
  )
}