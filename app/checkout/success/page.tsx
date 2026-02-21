'use client'

import { useSearchParams, useRouter } from 'next/navigation'

export default function SuccessPage() {
  const params = useSearchParams()
  const router = useRouter()
  const orderId = params.get('orderId')

  if (!orderId) return <p>لا يوجد طلب</p>

  return (
    <div className="p-10">
      <h1>تم تأكيد الطلب ✅</h1>
      <p>رقم الطلب: {orderId}</p>

      <button
        onClick={() => router.push('/orders')}
        className="mt-4 bg-green-600 text-white px-6 py-3 rounded"
      >
        الذهاب إلى طلباتي
      </button>
    </div>
  )
}
