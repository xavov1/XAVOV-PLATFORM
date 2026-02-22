"use client"

import { useSearchParams } from "next/navigation"

export default function SuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")

  return (
    <div>
      <h1>Payment Success</h1>
      <p>Order ID: {orderId}</p>
    </div>
  )
}