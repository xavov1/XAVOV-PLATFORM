import { NextResponse } from "next/server"
import prisma from "../../../lib/prisma"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, phone, totalAmount } = body

    if (!email || !phone || totalAmount === undefined || totalAmount === null) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    // ✅ ربط الطلب بالمستخدم بدل تخزين email داخل Order (عشان يختفي الخط الأحمر)
    const user = await prisma.user.upsert({
      where: { email },
      update: { phone },
      create: {
        email,
        phone,
        name: "",
      },
    })

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        totalAmount: Number(totalAmount),
        status: "PENDING",
      },
    })

    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}