'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function PaymentContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')

  return (
    <div className="p-10 text-white">
      <h1 className="text-2xl mb-4">Payment Page</h1>
      <p>Order ID: {orderId}</p>
    </div>
  )
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="p-10 text-white">Loading...</div>}>
      <PaymentContent />
    </Suspense>
  )
}