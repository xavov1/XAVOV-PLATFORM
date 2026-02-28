import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.order.update({
      where: { id: params.id },
      data: {
        paymentStatus: "paid",
        orderStatus: "processing",
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 })
  }
}