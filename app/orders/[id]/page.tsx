'use client'

import { useParams } from 'next/navigation'
import { getOrderById } from '@/lib'
import jsPDF from 'jspdf'

export default function OrderDetailsPage() {
  const { id } = useParams()
  const order = getOrderById(id as string)

  if (!order) return <p>الطلب غير موجود</p>

  function downloadPDF() {
    const pdf = new jsPDF()
    pdf.text(`Invoice`, 20, 20)
    pdf.text(`Order ID: ${order.id}`, 20, 40)
    pdf.text(`Total: ${order.total} SAR`, 20, 60)
    pdf.text(`Payment Status: ${order.status}`, 20, 80)
    pdf.text(`Shipping: ${order.shippingStatus}`, 20, 100)
    pdf.save(`invoice-${order.id}.pdf`)
  }

  return (
    <div className="p-10">
      <h1>تفاصيل الطلب</h1>

      <p>رقم الطلب: {order.id}</p>
      <p>الدفع: {order.status}</p>
      <p>حالة الشحن: {order.shippingStatus}</p>

      <button
        onClick={downloadPDF}
        className="mt-4 bg-gray-800 text-white px-6 py-2 rounded"
      >
        تحميل الفاتورة PDF
      </button>
    </div>
  )
}
