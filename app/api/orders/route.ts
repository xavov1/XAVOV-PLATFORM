import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/* ===== CREATE ORDER ===== */
export async function POST(req: Request) {
  try {
    const body = await req.json()

    console.log('ORDER API RECEIVED BODY:', body)
    const email = body?.email ?? null
    const phone = body?.phone ?? null
    const items = body?.items ?? []
    const totalAmount = body?.totalAmount ?? 0

    if (!email && !phone) {
      return NextResponse.json(
        { error: 'أدخل رقم أو إيميل' },
        { status: 400 }
      )
    }

    if (!items.length) {
      return NextResponse.json(
        { error: 'السلة فارغة' },
        { status: 400 }
      )
    }

    const order = await prisma.order.create({
      data: {
        email,
        phone,
        totalAmount,
        items: {
          create: items.map((item: any) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          }))
        }
      },
      include: {
        items: true
      }
    })

    return NextResponse.json(order)

  } catch (error) {
    console.error('ORDER CREATE ERROR:', error)
    return NextResponse.json(
      { error: 'خطأ في السيرفر', detail: String(error) },
      { status: 500 }
    )
  }
}

/* ===== GET ORDERS ===== */
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        items: true
      }
    })

    return NextResponse.json(orders)

  } catch (error) {
    return NextResponse.json(
      { error: 'خطأ في الخادم' },
      { status: 500 }
    )
  }
}