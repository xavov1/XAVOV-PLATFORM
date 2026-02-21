import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const { userId, totalAmount, location, latitude, longitude } = await req.json()

    if (!userId || !totalAmount || !location) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const order = await prisma.order.create({
      data: {
        userId: Number(userId),
        totalAmount: Number(totalAmount),
        status: "PENDING_PAYMENT",
        location,
        latitude: latitude ? Number(latitude) : null,
        longitude: longitude ? Number(longitude) : null
      }
    })

    return NextResponse.json(order)

  } catch (error) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}