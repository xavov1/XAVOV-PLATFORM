import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  const { total } = await request.json()

  const order = await prisma.order.create({
    data: {
      total: Number(total), // 👈 الاسم الصحيح
      status: "PENDING_PAYMENT",
    },
  })

  return NextResponse.json(order)
}