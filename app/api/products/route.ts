import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, price: true, image: true },
    })
    return NextResponse.json(products)
  } catch (error) {
    console.error('PRODUCTS API ERROR:', error)
    return NextResponse.json({ error: 'خطأ في جلب المنتجات', detail: String(error) }, { status: 500 })
  }
}
