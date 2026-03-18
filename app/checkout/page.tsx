'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import './checkout.css'

type Payment = 'card' | 'applepay' | 'stc' | 'tamara'
type Step = 'personal' | 'address' | 'payment'

const payMethods = [
  { id: 'card',     icon: '💳', label: 'بطاقة بنكية',  sub: 'مدى · فيزا · ماستركارد' },
  { id: 'applepay', icon: '🍎', label: 'Apple Pay',    sub: 'ادفع بلمسة واحدة' },
  { id: 'stc',      icon: '📱', label: 'STC Pay',      sub: 'محفظة STC الرقمية' },
  { id: 'tamara',   icon: '🟢', label: 'تمارا',        sub: 'اشتر الآن وادفع بعد 30 يوم' },
]

const steps = [
  { key: 'personal', label: 'البيانات' },
  { key: 'address',  label: 'العنوان' },
  { key: 'payment',  label: 'الدفع' },
]

export default function CheckoutPage() {
  const router = useRouter()

  const [step, setStep] = useState<Step>('personal')
  const [loading, setLoading] = useState(false)
  const [payment, setPayment] = useState<Payment>('card')

  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    country: 'المملكة العربية السعودية',
    city: '', district: '', street: '', building: '',
  })

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  // ===== 🧠 TOTAL FROM CART =====
  const cart = JSON.parse(typeof window !== 'undefined' ? localStorage.getItem('cart') || '[]' : '[]')
  const total = cart.reduce((s: number, i: any) => s + i.price * (i.qty || 1), 0)

  // ===== 🎁 POINTS SYSTEM =====
  const savedPoints = Number(typeof window !== 'undefined' ? localStorage.getItem('points') || 0 : 0)

  const usablePoints = Math.floor(savedPoints / 5) * 5
  const discount = (usablePoints / 5) * 1.5
  const maxDiscount = total * 0.2
  const finalDiscount = Math.min(discount, maxDiscount)
  const finalTotal = total - finalDiscount

  // ===== 🚀 SUBMIT =====
  const handleSubmit = async () => {
    setLoading(true)

    try {
      const contact = form.phone || form.email
      const method  = form.phone ? 'phone' : 'email'

      const res = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method, contact }),
      })

      if (!res.ok) {
        alert('فشل إرسال رمز التحقق')
        return
      }

      localStorage.setItem('checkout', JSON.stringify({
        form,
        payment,
        total: finalTotal,
      }))

      localStorage.setItem('contact', contact)
      localStorage.setItem('method', method)

      // 🧨 خصم النقاط
      localStorage.setItem('points', String(savedPoints - usablePoints))

      router.push('/otp')

    } catch {
      alert('خطأ، حاول مجدداً')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="co-page">
      <div className="co-wrap">

        <div className="co-logo">XAVOV</div>
        <div className="co-title">إتمام الطلب</div>

        {/* السعر */}
        <div style={{
          background: '#0c1020',
          padding: 16,
          borderRadius: 16,
          border: '1px solid rgba(255,255,255,0.06)'
        }}>
          <div style={{fontSize:12,color:'#4A5568'}}>الإجمالي</div>
          <div style={{fontSize:22,fontWeight:900,color:'#D4A853'}}>
            {finalTotal.toFixed(2)} ر.س
          </div>

          {finalDiscount > 0 && (
            <div style={{fontSize:11,color:'#27AE60'}}>
              تم خصم {finalDiscount.toFixed(2)} ر.س من النقاط
            </div>
          )}
        </div>

        {/* PERSONAL */}
        {step === 'personal' && (
          <div className="co-card">
            <div className="co-card-body">

              <input className="co-input" name="name" placeholder="الاسم"
                value={form.name} onChange={handleChange} />

              <input className="co-input" name="phone" placeholder="الجوال"
                value={form.phone} onChange={handleChange} />

              <input className="co-input" name="email" placeholder="الإيميل"
                value={form.email} onChange={handleChange} />

              <button className="co-btn" onClick={() => setStep('address')}>
                التالي
              </button>

            </div>
          </div>
        )}

        {/* ADDRESS */}
        {step === 'address' && (
          <div className="co-card">
            <div className="co-card-body">

              <input className="co-input" name="city" placeholder="المدينة"
                value={form.city} onChange={handleChange} />

              <input className="co-input" name="district" placeholder="الحي"
                value={form.district} onChange={handleChange} />

              <button className="co-btn" onClick={() => setStep('payment')}>
                التالي
              </button>

            </div>
          </div>
        )}

        {/* PAYMENT */}
        {step === 'payment' && (
          <div className="co-card">
            <div className="co-card-body">

              {payMethods.map(m => (
                <button
                  key={m.id}
                  className={`co-pay-btn ${payment === m.id ? 'selected' : ''}`}
                  onClick={() => setPayment(m.id as Payment)}
                >
                  {m.label}
                </button>
              ))}

              <button className="co-btn" onClick={handleSubmit} disabled={loading}>
                {loading ? 'جارٍ...' : 'تأكيد الطلب'}
              </button>

            </div>
          </div>
        )}

      </div>
    </div>
  )
}