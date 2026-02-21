"use client"

import { useParams } from "next/navigation"
import {
  getOrder,
  updateOrderStatus,
  downloadInvoice,
} from "@/lib"

export default function OrderDetailsPage() {
  const { id } = useParams()
  const order = getOrder(id as string)

  if (!order) return <div>الطلب غير موجود</div>

  return (
    <div className="max-w-xl mx-auto mt-20 p-6 border rounded">
      <h1 className="text-lg mb-4">📦 تفاصيل الطلب</h1>

      <div className="mb-2">رقم الطلب: {order.id}</div>
      <div className="mb-2">الحالة: {order.status}</div>

      <div className="mt-4">
        <div className="font-bold mb-2">العناصر</div>
        {order.items.map(i => (
          <div key={i.id}>
            {i.name} — {i.price} SAR
          </div>
        ))}
      </div>

      <div className="mt-4">
        الشحن: {order.shippingCost} SAR
      </div>

      <div className="font-bold mt-2">
        الإجمالي: {order.total} SAR
      </div>

      {/* 🚚 تغيير حالة الشحن (تجريبي) */}
      <div className="flex gap-2 mt-6">
        <button
          className="border px-3 py-1"
          onClick={() => updateOrderStatus(order.id, "processing")}
        >
          تجهيز
        </button>

        <button
          className="border px-3 py-1"
          onClick={() => updateOrderStatus(order.id, "shipped")}
        >
          شحن
        </button>

        <button
          className="border px-3 py-1"
          onClick={() => updateOrderStatus(order.id, "delivered")}
        >
          تم التسليم
        </button>
      </div>

      {/* 🧾 فاتورة */}
      <button
        className="mt-6 w-full bg-yellow-500 p-3 rounded"
        onClick={() => downloadInvoice(order)}
      >
        تحميل الفاتورة PDF
      </button>
    </div>
  )
}
