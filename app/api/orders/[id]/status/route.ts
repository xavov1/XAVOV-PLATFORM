import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json()
  const status = body.status

  const order = await prisma.order.findFirst({
    where: { id: params.id }
  })

  if (!order) {
    return NextResponse.json({ error: 'Order not found' })
  }

  let data: any = {
    status
  }

  if (status === 'delivered' && !order.pointsGiven) {
    data.points = order.points + 2
    data.pointsGiven = true
    data.delivered = true
  }

  const updated = await prisma.order.update({
    where: { id: order.id },
    data
  })

  return NextResponse.json(updated)
}