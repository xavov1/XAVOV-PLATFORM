import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { method, contact, code } = await req.json()

    // ✅ تحقق من البيانات
    if (!method || !contact || !code) {
      return NextResponse.json(
        { success: false, error: 'جميع الحقول مطلوبة' },
        { status: 400 }
      )
    }

    // ✅ تحقق من الكود (4 أرقام)
    if (typeof code !== 'string' || !/^\d{4}$/.test(code)) {
      return NextResponse.json(
        { success: false, error: 'رمز غير صحيح' },
        { status: 400 }
      )
    }

    // 🧠 تأكد من وجود store
    if (!globalThis.otpStore) {
      return NextResponse.json(
        { success: false, error: 'لم يتم إرسال رمز' },
        { status: 400 }
      )
    }

    const stored = globalThis.otpStore[contact]

    // ❌ ما فيه كود
    if (!stored) {
      return NextResponse.json(
        { success: false, error: 'لم يتم العثور على رمز' },
        { status: 404 }
      )
    }

    // ❌ كود غلط
    if (stored !== code) {
      return NextResponse.json(
        { success: false, error: 'رمز غير صحيح' },
        { status: 401 }
      )
    }

    // ✅ نجاح — احذف الكود
    delete globalThis.otpStore[contact]

    return NextResponse.json({
      success: true,
      message: 'تم التحقق بنجاح'
    })

  } catch (error) {
    console.error('[OTP VERIFY ERROR]', error)

    return NextResponse.json(
      { success: false, error: 'خطأ في السيرفر' },
      { status: 500 }
    )
  }
}