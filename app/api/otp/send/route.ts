import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { method, contact } = await req.json()

    if (method !== 'phone') {
      return NextResponse.json(
        { success: false, error: 'method must be "phone"' },
        { status: 400 }
      )
    }

    if (!contact || contact.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'contact is required and must be non-empty' },
        { status: 400 }
      )
    }

    const code = Math.floor(1000 + Math.random() * 9000).toString()

    globalThis.otpStore = globalThis.otpStore || {}
    globalThis.otpStore[contact] = code

    console.log("========== OTP ==========")
    console.log("PHONE:", contact)
    console.log("CODE:", code)
    console.log("=========================")

    return NextResponse.json({ success: true, code })

  } catch (error) {
    console.error('[OTP SEND ERROR]', error)

    return NextResponse.json(
      { success: false, error: 'خطأ في السيرفر' },
      { status: 500 }
    )
  }
}