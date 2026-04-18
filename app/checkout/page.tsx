'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import './checkout.css'

type Payment = 'card' | 'applepay' | 'stc' | 'tamara'

const payMethods = [
  { id: 'card',     label: 'مدى / Visa',  sub: 'بطاقة ائتمانية أو مدى' },
  { id: 'applepay', label: 'Apple Pay',   sub: 'ادفع بلمسة واحدة' },
  { id: 'stc',      label: 'STC Pay',     sub: 'محفظة STC الرقمية' },
  { id: 'tamara',   label: 'تمارا',       sub: 'اشتري الآن وادفع لاحقاً' },
]

export default function CheckoutPage() {
  const router = useRouter()

  const [payment, setPayment] = useState<Payment>('card')
  const [cart,    setCart]    = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('userPhone')) {
      router.replace('/register')
      return
    }
    setCart(JSON.parse(localStorage.getItem('cart') || '[]'))
  }, [])

  const total = cart.reduce((s: number, i: any) => s + i.price * (i.quantity || 1), 0)

  const confirmPayment = async () => {
    if (loading) return
    setLoading(true)
    try {
      const order = {
        id:        `XA-${Date.now()}`,
        items:     cart,
        total,
        payment,
        name:      localStorage.getItem('userName')     || '',
        phone:     localStorage.getItem('userPhone')    || '',
        email:     localStorage.getItem('userEmail')    || '',
        city:      localStorage.getItem('userCity')     || '',
        country:   localStorage.getItem('userCountry')  || '',
        district:  localStorage.getItem('userDistrict') || '',
        status:    'processing',
        createdAt: new Date().toISOString(),
        points:    0,
      }

      localStorage.setItem('currentOrder', JSON.stringify(order))

      const history = JSON.parse(localStorage.getItem('orderHistory') || '[]')
      history.unshift(order)
      localStorage.setItem('orderHistory', JSON.stringify(history))

      // Persist to DB (best effort)
      fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email:       order.email,
          phone:       order.phone,
          totalAmount: order.total,
          items:       order.items,
        }),
      }).catch(() => {})

      localStorage.removeItem('cart')
      window.dispatchEvent(new Event('storage'))

      router.push('/track')
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
        <div className="co-title">طريقة الدفع</div>

        <div style={{ background: '#0c1020', padding: 16, borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontSize: 12, color: '#4A5568' }}>إجمالي الطلب</div>
          <div style={{ fontSize: 22, fontWeight: 900, color: '#D4A853' }}>
            {total.toFixed(2)} ر.س
          </div>
          <div style={{ fontSize: 11, color: '#4A5568', marginTop: 4 }}>شامل الشحن المجاني</div>
        </div>

        <div className="co-card">
          <div className="co-card-body">

            <div className="co-pay-grid">
              {payMethods.map(m => (
                <button
                  key={m.id}
                  className={`co-pay-btn ${payment === m.id ? 'selected' : ''}`}
                  onClick={() => setPayment(m.id as Payment)}
                >
                  <div className="co-pay-check" />
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#F0EDE8', marginBottom: 3 }}>{m.label}</div>
                  <div style={{ fontSize: 10, color: '#6B7280' }}>{m.sub}</div>
                </button>
              ))}
            </div>

            <button className="co-btn" onClick={confirmPayment} disabled={loading}>
              {loading ? 'جارٍ...' : 'تأكيد الدفع ←'}
            </button>

          </div>
        </div>

      </div>
    </div>
  )
}
