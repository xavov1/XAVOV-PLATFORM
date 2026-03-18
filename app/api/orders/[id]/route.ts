import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function getOrderIdFromUrl(req: Request) {
  const url = new URL(req.url)
  const parts = url.pathname.split('/').filter(Boolean)
  return parts[parts.length - 1]
}

// GET /api/orders/:id
export async function GET(req: Request) {
  try {
    const id = getOrderIdFromUrl(req)

    if (!id) {
      return NextResponse.json(
        { error: 'Order id is missing' },
        { status: 400 }
      )
    }

    const order = await prisma.order.findFirst({
      where: { id }
    })

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error('GET /api/orders/[id] error:', error)
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}

// POST /api/orders/:id
export async function POST(req: Request) {
  try {
    const id = getOrderIdFromUrl(req)
    const body = await req.json()

    if (!id) {
      return NextResponse.json(
        { error: 'Order id is missing' },
        { status: 400 }
      )
    }

    const existingOrder = await prisma.order.findFirst({
      where: { id }
    })

    if (!existingOrder) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    const updatedOrder = await prisma.order.update({
      where: { id: existingOrder.id },
      data: {
        status: body.status ?? existingOrder.status
      }
    })

    return NextResponse.json(updatedOrder)
  } catch (error) {
    console.error('POST /api/orders/[id] error:', error)
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}