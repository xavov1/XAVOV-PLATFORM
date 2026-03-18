import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json([
    {
      name: 'ثلاجة',
      nameEn: 'REFRIGERATOR',
      modelName: 'fridge',
      price: 2499,
      glow: '30,144,255',
    },
    {
      name: 'تلفزيون',
      nameEn: 'TELEVISION',
      modelName: 'tv',
      price: 3199,
      glow: '180,100,255',
    },
  ])
}