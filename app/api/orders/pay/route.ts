import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

function generateTrackingCode() {
  return "XAV-" + Math.random().toString(36).substring(2, 10).toUpperCase()
}

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json()

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    })

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: "PAID",
        trackingCode: generateTrackingCode(),
      },
    })

    return NextResponse.json(updatedOrder)
  } catch (error) {
    return NextResponse.json({ error: "Payment failed" }, { status: 500 })
  }
}