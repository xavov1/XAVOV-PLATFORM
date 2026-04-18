import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
    })
    if (!product) {
      return NextResponse.json({ error: 'المنتج غير موجود' }, { status: 404 })
    }
    return NextResponse.json(product)
  } catch (error) {
    console.error('PRODUCT API ERROR:', error)
    return NextResponse.json({ error: 'خطأ في جلب المنتج', detail: String(error) }, { status: 500 })
  }
}
