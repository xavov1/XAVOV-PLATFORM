import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { identifier, code } = await req.json()

  const expiresAt = new Date(Date.now() + 5 * 60 * 1000)

  await prisma.oTP.create({
    data: {
      identifier,
      code,
      expiresAt,
    },
  })

  return NextResponse.json({ success: true })
}