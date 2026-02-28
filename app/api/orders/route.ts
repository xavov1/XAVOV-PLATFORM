import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const lat =
      body.latitude === undefined || body.latitude === null || body.latitude === ""
        ? null
        : Number(body.latitude)

    const lng =
      body.longitude === undefined || body.longitude === null || body.longitude === ""
        ? null
        : Number(body.longitude)

    const order = await prisma.order.create({
      data: {
        fullName: String(body.fullName || ""),
        phone: String(body.phone || ""),
        address: String(body.address || ""),
        items: body.items ?? [],
        total: Number(body.total || 0),

        // ✅ الأهم: لازم تكون أرقام أو null
        latitude: Number.isFinite(lat as any) ? lat : null,
        longitude: Number.isFinite(lng as any) ? lng : null,
      },
    })

    return NextResponse.json({ id: order.id })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}