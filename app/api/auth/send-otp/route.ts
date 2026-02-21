import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { identifier } = body

    if (!identifier) {
      return NextResponse.json(
        { error: "Identifier required" },
        { status: 400 }
      )
    }

    const code = generateOTP()
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000)

    await prisma.OTP.create({
      data: {
        identifier,
        code,
        expiresAt
      }
    })

    return NextResponse.json({
      message: "OTP sent",
      code
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}