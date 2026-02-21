import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const { identifier, code } = await req.json()

    if (!identifier || !code) {
      return NextResponse.json(
        { error: "Identifier and code required" },
        { status: 400 }
      )
    }

    const otpRecord = await prisma.oTP.findFirst({
      where: { identifier, code }
    })

    if (!otpRecord) {
      return NextResponse.json(
        { error: "Invalid code" },
        { status: 400 }
      )
    }

    if (otpRecord.expiresAt < new Date()) {
      return NextResponse.json(
        { error: "Code expired" },
        { status: 400 }
      )
    }

    // حذف OTP بعد التحقق
    await prisma.oTP.delete({
      where: { id: otpRecord.id }
    })

    // تحديد هل identifier إيميل أو جوال
    const isEmail = identifier.includes("@")

    let user = await prisma.user.findFirst({
      where: isEmail
        ? { email: identifier }
        : { phone: identifier }
    })

    if (!user) {
      user = await prisma.user.create({
        data: isEmail
          ? { email: identifier }
          : { phone: identifier }
      })
    }

    return NextResponse.json({
      message: "Verified",
      userId: user.id
    })

  } catch (error) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}