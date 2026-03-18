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

    // ✅ تحقق من الكود (6 أرقام)
    if (typeof code !== 'string' || !/^\d{6}$/.test(code)) {
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

    const record = globalThis.otpStore.get(contact)

    // ❌ ما فيه كود
    if (!record) {
      return NextResponse.json(
        { success: false, error: 'لم يتم العثور على رمز' },
        { status: 404 }
      )
    }

    // ⏳ انتهت الصلاحية
    if (new Date() > record.expiresAt) {
      globalThis.otpStore.delete(contact)
      return NextResponse.json(
        { success: false, error: 'انتهت صلاحية الرمز' },
        { status: 410 }
      )
    }

    // ❌ كود غلط
    if (record.code !== code) {
      return NextResponse.json(
        { success: false, error: 'رمز غير صحيح' },
        { status: 401 }
      )
    }

    // ✅ نجاح — احذف الكود
    globalThis.otpStore.delete(contact)

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