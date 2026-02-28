"use client"

import { useSearchParams, useRouter } from "next/navigation"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderId = searchParams.get("id")

  return (
    <div style={{ padding: 40 }}>
      <h1>تم الدفع بنجاح ✅</h1>

      <p>رقم الطلب:</p>
      <strong>{orderId}</strong>

      <br /><br />

      <button
        onClick={() => router.push(`/track?id=${orderId}`)}
        style={{ padding: "10px 20px" }}
      >
        تتبع الطلب
      </button>
    </div>
  )
}