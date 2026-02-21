import { NextResponse } from "next/server"
import prisma from "../../../../../lib/prisma"

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params
  const id = Number(resolvedParams.id)

  if (!id) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
  }

  const order = await prisma.order.findUnique({
    where: { id }
  })

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 })
  }

  const updated = await prisma.order.update({
    where: { id },
    data: { status: "PAID" }
  })

  return NextResponse.json(updated)
}