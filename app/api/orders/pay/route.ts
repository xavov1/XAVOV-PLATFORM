import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

function generateTrackingCode() {
  return "XAV-" + Math.random().toString(36).substring(2, 10).toUpperCase()
}

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json()

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID required" },
        { status: 400 }
      )
    }

    const order = await prisma.order.findUnique({
      where: { id: Number(orderId) }
    })

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      )
    }

    if (order.status !== "PENDING_PAYMENT") {
      return NextResponse.json(
        { error: "Order already paid or invalid status" },
        { status: 400 }
      )
    }

    const trackingCode = generateTrackingCode()

    const updatedOrder = await prisma.order.update({
      where: { id: Number(orderId) },
      data: {
        status: "PAID",
        trackingCode
      }
    })

    return NextResponse.json(updatedOrder)

  } catch (error) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}