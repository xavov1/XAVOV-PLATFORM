
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const { trackingCode } = await req.json()

    if (!trackingCode) {
      return NextResponse.json({ error: "trackingCode is required" }, { status: 400 })
    }

    const order = await prisma.order.findFirst({
      where: { trackingCode },
    })

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json({ error: "Tracking failed" }, { status: 500 })
  }
}