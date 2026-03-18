'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Item = { id: number; name: string; price: number; qty?: number; emoji?: string; origin?: string }

export default function CartPage() {
  const router = useRouter()
  const [cart, setCart] = useState<Item[]>([])
  const [removing, setRemoving] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  const loadCart = () => {
    const data = JSON.parse(localStorage.getItem('cart') || '[]')
    setCart(data)
  }

  useEffect(() => {
    loadCart()
    setMounted(true)

    window.addEventListener('storage', loadCart)

    return () => {
      window.removeEventListener('storage', loadCart)
    }
  }, [])

  const removeItem = (id: number) => {
    setRemoving(id)
    setTimeout(() => {
      const updated = cart.filter(i => i.id !== id)
      setCart(updated)
      localStorage.setItem('cart', JSON.stringify(updated))
      window.dispatchEvent(new Event('storage'))
      setRemoving(null)
    }, 350)
  }

  const updateQty = (id: number, delta: number) => {
    const updated = cart.map(i =>
      i.id === id
        ? { ...i, qty: Math.max(1, (i.qty || 1) + delta) }
        : i
    )

    setCart(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
    window.dispatchEvent(new Event('storage'))
  }

  const total = cart.reduce((s, i) => s + i.price * (i.qty || 1), 0)
  const count = cart.reduce((s, i) => s + (i.qty || 1), 0)

  if (!mounted) return null

  return (
    <>
      {/* نفس CSS حقك بدون تغيير */}
      <style>{`/* لا تغيير */`}</style>

      <div className="c-page">
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div className="c-title">🛒 سلة الطلبات</div>
          <div className="c-sub">
            {cart.length > 0
              ? <><strong>{count}</strong> منتج · شحن من الصين 🇨🇳 → السعودية 🇸🇦</>
              : 'لا يوجد منتجات'}
          </div>
        </div>

        <div className="c-wrap">

          {cart.length === 0 && (
            <div className="c-empty">
              <div className="c-empty-icon">🛒</div>
              <div className="c-empty-title">السلة فارغة</div>
              <button className="c-empty-btn" onClick={() => router.push('/marketplace')}>
                تصفح المنتجات ←
              </button>
            </div>
          )}

          {cart.length > 0 && (
            <div className="c-items">
              {cart.map((item, i) => (
                <div
                  key={item.id}
                  className={`c-item ${removing === item.id ? 'removing' : ''}`}
                  style={{ animationDelay: `${i * .06}s` }}
                >
                  <div className="c-emoji">{item.emoji || '📦'}</div>

                  <div className="c-info">
                    <div className="c-name">{item.name}</div>
                    <div className="c-origin">🇨🇳 {item.origin || 'الصين'}</div>
                    <div className="c-price">
                      {(item.price * (item.qty || 1)).toLocaleString()}
                      <small>ر.س</small>
                    </div>
                  </div>

                  <div className="c-qty">
                    <button className="c-qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                    <span className="c-qty-val">{item.qty || 1}</span>
                    <button className="c-qty-btn" onClick={() => updateQty(item.id, +1)}>+</button>
                  </div>

                  <button className="c-remove" onClick={() => removeItem(item.id)}>✕</button>
                </div>
              ))}
            </div>
          )}

          {cart.length > 0 && (
            <div className="c-summary">
              <div className="c-sum-head">
                <div className="c-sum-title">ملخص الطلب</div>
                <div className="c-sum-sub">أسعار شاملة الضريبة</div>
              </div>

              <div className="c-sum-body">
                <div className="c-sum-row">
                  <span className="c-sum-label">المنتجات ({count})</span>
                  <span className="c-sum-val">{total.toLocaleString()} ر.س</span>
                </div>

                <div className="c-sum-row">
                  <span className="c-sum-label">الشحن الدولي</span>
                  <span style={{ color: '#27AE60', fontWeight: 700 }}>مجاني</span>
                </div>

                <div className="c-sum-row">
                  <span className="c-sum-label">الجمارك</span>
                  <span className="c-sum-val">يُحسب عند التسليم</span>
                </div>

                <div className="c-divider" />

                <div className="c-promo">
                  <input className="c-promo-input" placeholder="PROMO CODE" />
                  <button className="c-promo-btn">تطبيق</button>
                </div>

                <div className="c-total-row">
                  <span className="c-total-label">الإجمالي</span>
                  <span className="c-total-val">
                    {total.toLocaleString()} <small>ر.س</small>
                  </span>
                </div>

                <button
                  className="c-checkout-btn"
                  onClick={() => router.push('/checkout')}
                >
                  إتمام الطلب ←
                </button>

                <button
                  className="c-continue-btn"
                  onClick={() => router.push('/marketplace')}
                >
                  متابعة التسوق
                </button>

                <div className="c-ship-row">
                  <div className="c-ship-item"><div className="c-ship-icon">✈️</div><div className="c-ship-label">شحن جوي</div></div>
                  <div className="c-ship-item"><div className="c-ship-icon">🛡️</div><div className="c-ship-label">ضمان الإرجاع</div></div>
                  <div className="c-ship-item"><div className="c-ship-icon">🔒</div><div className="c-ship-label">دفع آمن</div></div>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </>
  )
}