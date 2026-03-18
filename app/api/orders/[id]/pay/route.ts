import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const order = await prisma.order.findFirst({
    where: { id: params.id }
  })

  if (!order) {
    return NextResponse.json({ error: 'Order not found' })
  }

  const updated = await prisma.order.update({
    where: { id: order.id },
    data: {
      status: 'paid'
    }
  })

  return NextResponse.json({
    message: 'تم الدفع بنجاح',
    order: updated
  })
}