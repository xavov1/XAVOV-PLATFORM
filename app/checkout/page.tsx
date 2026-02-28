"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    latitude: "",
    longitude: "",
  })

  const total = 100

  const handleLocation = () => {
    if (!navigator.geolocation) {
      alert("المتصفح لا يدعم تحديد الموقع")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setForm({
          ...form,
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
        })
      },
      () => {
        alert("فشل في تحديد الموقع")
      }
    )
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        items: [{ name: "Test Product", qty: 1 }],
        total,
      }),
    })

    const data = await res.json()

    if (data.id) {
      router.push(`/payment?id=${data.id}`)
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>إتمام الطلب</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>

        <input
          placeholder="الاسم الكامل"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        />

        <input
          placeholder="رقم الجوال"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <input
          placeholder="العنوان"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <button type="button" onClick={handleLocation}>
          📍 تحديد موقعي
        </button>

        {form.latitude && (
          <div style={{ fontSize: 12 }}>
            <p>Lat: {form.latitude}</p>
            <p>Lng: {form.longitude}</p>
          </div>
        )}

        <button type="submit">
          تأكيد الطلب
        </button>

      </form>
    </div>
  )
}