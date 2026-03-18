import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { method, contact } = await req.json()

    // ✅ تحقق من البيانات
    if (!method || !contact) {
      return NextResponse.json(
        { success: false, error: 'البيانات ناقصة' },
        { status: 400 }
      )
    }

    if (method !== 'phone' && method !== 'email') {
      return NextResponse.json(
        { success: false, error: 'طريقة الإرسال غير صحيحة' },
        { status: 400 }
      )
    }

    // 🔥 توليد كود OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString()

    // ⏳ مدة الصلاحية (5 دقائق)
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000)

    // 🧠 تخزين مؤقت (للتجربة فقط)
    if (!globalThis.otpStore) {
      globalThis.otpStore = new Map()
    }

    globalThis.otpStore.set(contact, {
      code,
      method,
      expiresAt
    })

    // 👇 يطلع في التيرمنال
    console.log('OTP:', code)

    return NextResponse.json({
      success: true,
      message: 'تم إرسال الرمز'
    })

  } catch (error) {
    console.error('[OTP SEND ERROR]', error)

    return NextResponse.json(
      { success: false, error: 'خطأ في السيرفر' },
      { status: 500 }
    )
  }
}