import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const order = await prisma.order.findUnique({
    where: { id: params.id }
  })

  if (!order) {
    return NextResponse.json({ error: 'Order not found' })
  }

  // 🚫 منع التكرار
  if (order.reviewGiven) {
    return NextResponse.json({
      message: 'تم التقييم مسبقاً'
    })
  }

  const updated = await prisma.order.update({
    where: { id: params.id },
    data: {
      reviewGiven: true,
      points: order.points + 3
    }
  })

  return NextResponse.json({
    message: 'تم التقييم +3 نقاط',
    order: updated
  })
}