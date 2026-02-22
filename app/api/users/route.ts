import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const users = await prisma.user.findMany()
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { name, phone, email } = await req.json()

    if (!name || (!phone && !email)) {
      return NextResponse.json(
        { error: "Name and phone or email are required" },
        { status: 400 }
      )
    }

    const user = await prisma.user.create({
      data: {
        name,
        phone,
        email,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}