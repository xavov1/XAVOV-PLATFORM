import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/* ===== CREATE ORDER ===== */
export async function POST(req: Request) {
  try {
    const body = await req.json()

    const email = body?.email ?? null
    const phone = body?.phone ?? null

    if (!email && !phone) {
      return NextResponse.json(
        { error: 'أدخل رقم أو إيميل' },
        { status: 400 }
      )
    }

    const order = await prisma.order.create({
      data: {
        email,
        phone,
        totalAmount: 150,
      },
    })

    return NextResponse.json(order)

  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'خطأ في السيرفر' },
      { status: 500 }
    )
  }
}

/* ===== GET ORDERS ===== */
export async function GET(req: Request) {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(orders)

  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'خطأ في الخادم' },
      { status: 500 }
    )
  }
}