"use client"

import Link from "next/link"
import { getMyOrders } from "@/lib"

export default function OrdersPage() {
  const orders = getMyOrders()

  return (
    <div className="max-w-3xl mx-auto mt-20">
      <h1 className="text-xl mb-6">📦 طلباتي</h1>

      {orders.length === 0 && (
        <div>لا توجد طلبات بعد</div>
      )}

      <div className="space-y-4">
        {orders.map(order => (
          <Link
            key={order.id}
            href={`/orders/${order.id}`}
            className="block p-4 border rounded hover:bg-neutral-900"
          >
            <div className="flex justify-between">
              <span>{order.id}</span>
              <span>{order.total} SAR</span>
            </div>

            <div className="text-sm text-gray-400 mt-1">
              الحالة: {order.status}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
