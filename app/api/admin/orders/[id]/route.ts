import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json()

  await prisma.order.update({
    where: { id: params.id },
    data: {
      orderStatus: body.status,
    },
  })

  return NextResponse.json({ success: true })
}