"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CheckoutPage() {
  const router = useRouter()
  const [value, setValue] = useState("")
  const [loading, setLoading] = useState(false)

  const handleVerify = async () => {
    if (!value) return

    setLoading(true)

    try {
      // 1️⃣ إنشاء / جلب المستخدم
      const userRes = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: value.includes("@") ? value : undefined,
          phone: value.includes("@") ? undefined : value,
        }),
      })

      const user = await userRes.json()

      if (!userRes.ok) {
        alert("فشل إنشاء المستخدم")
        setLoading(false)
        return
      }

      // 2️⃣ إنشاء الطلب مربوط بالمستخدم
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          total: 1900,
          status: "pending",
        }),
      })

      if (!orderRes.ok) {
        alert("فشل إنشاء الطلب")
        setLoading(false)
        return
      }

      router.push("/orders")

    } catch (err) {
      alert("حدث خطأ")
      setLoading(false)
    }
  }

  return (
    <div className="p-10">
      <h2 className="text-xl mb-4">تسجيل لإتمام الطلب</h2>

      <input
        className="border p-2 w-full"
        placeholder="رقم الجوال أو الإيميل"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button
        onClick={handleVerify}
        disabled={loading}
        className="mt-4 bg-black text-white p-2 w-full"
      >
        {loading ? "جاري التنفيذ..." : "تحقق وأكمل"}
      </button>
    </div>
  )
}
