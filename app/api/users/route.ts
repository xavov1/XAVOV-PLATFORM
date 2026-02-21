import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"



// 🔹 GET - جلب جميع المستخدمين
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc"
      }
    })

    return NextResponse.json(users)

  } catch (error) {
    console.error("USER GET ERROR:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}



// 🔹 POST - إنشاء مستخدم جديد
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, phone } = body

    if (!email && !phone) {
      return NextResponse.json(
        { error: "Email or phone required" },
        { status: 400 }
      )
    }

    const existing = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email || undefined },
          { phone: phone || undefined }
        ]
      }
    })

    if (existing) {
      return NextResponse.json(existing)
    }

    const user = await prisma.user.create({
      data: {
        email,
        phone
      }
    })

    return NextResponse.json(user, { status: 201 })

  } catch (error) {
    console.error("USER POST ERROR:", error)
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}
