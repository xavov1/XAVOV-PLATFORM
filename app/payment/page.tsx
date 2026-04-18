'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=Cairo:wght@300;400;500;600;700;900&display=swap');

.xp-root *{margin:0;padding:0;box-sizing:border-box;}
.xp-root{
  --gold:#C9A84C;--gold-b:rgba(201,168,76,0.16);--gold-b2:rgba(201,168,76,0.38);
  --gold-glow:rgba(201,168,76,0.07);
  --bg:#02040A;--surface:#080D18;--surface2:#0B1020;--surface3:#0E1428;
  --text:#EDE5D5;--text2:#B5AC9C;--muted:#524C44;--green:#2ECC71;
  background:var(--bg);color:var(--text);font-family:'Cairo',sans-serif;min-height:100vh;direction:rtl;
}
.xp-nav{height:64px;display:flex;align-items:center;justify-content:space-between;padding:0 52px;
  background:rgba(2,4,10,0.96);border-bottom:1px solid var(--gold-b);backdrop-filter:blur(24px);
  position:sticky;top:0;z-index:200;}
.xp-logo{font-family:'Cormorant Garamond',serif;font-size:20px;color:var(--gold);letter-spacing:5px;font-weight:600;}
.xp-back{font-size:11.5px;color:var(--muted);cursor:pointer;display:flex;align-items:center;gap:6px;
  transition:color 0.2s;letter-spacing:1px;background:none;border:none;font-family:'Cairo',sans-serif;}
.xp-back:hover{color:var(--text);}

.xp-steps{display:flex;align-items:center;border-bottom:1px solid var(--gold-b);background:rgba(2,4,10,0.6);}
.xp-step{flex:1;display:flex;align-items:center;justify-content:center;gap:10px;padding:12px 16px;
  font-size:10px;letter-spacing:2px;color:var(--muted);font-family:'Cormorant Garamond',serif;
  border-left:1px solid var(--gold-b);position:relative;}
.xp-step:last-child{border-left:none;}
.xp-step.active{color:var(--gold);}
.xp-step.active::after{content:'';position:absolute;bottom:0;left:0;right:0;height:1px;background:var(--gold);}
.xp-step.done{color:var(--green);}
.xp-step-num{width:18px;height:18px;border:1px solid currentColor;border-radius:50%;
  display:flex;align-items:center;justify-content:center;font-size:8px;flex-shrink:0;}

.xp-content{max-width:700px;margin:0 auto;padding:56px 48px;}
.xp-sec-ttl{font-size:10px;letter-spacing:5px;color:rgba(201,168,76,0.45);
  font-family:'Cormorant Garamond',serif;margin-bottom:8px;}
.xp-sec-name{font-size:clamp(22px,2.8vw,32px);font-weight:700;margin-bottom:14px;}
.xp-sec-div{height:1px;background:linear-gradient(90deg,var(--gold-b2),transparent);margin-bottom:32px;}

.xp-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:24px;}
.xp-card{border:1px solid var(--gold-b);background:var(--surface2);padding:22px 24px;
  cursor:pointer;transition:all 0.25s;display:flex;align-items:center;gap:14px;position:relative;}
.xp-card:hover{border-color:var(--gold-b2);background:var(--surface3);}
.xp-card.selected{border-color:var(--gold);background:var(--gold-glow);}
.xp-card.selected::after{content:'✓';position:absolute;top:10px;left:10px;font-size:10px;color:var(--gold);}
.xp-ico{width:40px;height:40px;border:1px solid var(--gold-b);display:flex;align-items:center;justify-content:center;
  font-family:'Cormorant Garamond',serif;font-size:16px;color:var(--gold);opacity:0.6;flex-shrink:0;}
.xp-card-name{font-size:14px;font-weight:700;margin-bottom:2px;}
.xp-card-sub{font-size:10px;color:var(--muted);letter-spacing:1px;}

.xp-summary{border:1px solid var(--gold-b);background:var(--surface);padding:20px 24px;
  margin-bottom:20px;display:flex;justify-content:space-between;align-items:center;}
.xp-sum-lbl{font-size:11px;color:var(--muted);letter-spacing:2px;font-family:'Cormorant Garamond',serif;}
.xp-sum-sub{font-size:12px;color:var(--muted);margin-top:2px;}
.xp-sum-val{font-family:'Cormorant Garamond',serif;font-size:28px;color:var(--gold);font-weight:300;}
.xp-sum-cur{font-size:10px;color:var(--muted);letter-spacing:1px;text-align:left;margin-top:2px;}

.xp-btn-gold{width:100%;padding:14px;background:var(--gold);color:var(--bg);
  font-size:13px;font-family:'Cairo',sans-serif;font-weight:700;letter-spacing:0.5px;
  border:none;cursor:pointer;transition:background 0.25s;display:flex;align-items:center;justify-content:center;gap:10px;}
.xp-btn-gold:hover{background:#E8C97A;}

@media(max-width:640px){
  .xp-nav{padding:0 20px;}
  .xp-content{padding:32px 20px;}
  .xp-grid{grid-template-columns:1fr;}
}
`

const METHODS = [
  { id: 'card',    ico: '▣', name: 'مدى / Visa',     sub: 'بطاقة ائتمانية أو مدفوعة مسبقاً' },
  { id: 'applepay',ico: '⬡', name: 'Apple Pay',      sub: 'ادفع بلمسة واحدة' },
  { id: 'tabby',  ico: '◈', name: 'تابي · Tabby',   sub: '4 أقساط بدون فوائد' },
  { id: 'tamara', ico: '◎', name: 'تمارا · Tamara', sub: 'اشتري الآن وادفع لاحقاً' },
]

export default function PaymentPage() {
  const router = useRouter()
  const [cart, setCart]       = useState<any[]>([])
  const [method, setMethod]   = useState('card')
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('userPhone')) {
      router.replace('/register')
      return
    }
    const data = JSON.parse(localStorage.getItem('cart') || '[]')
    setCart(data)
    setMounted(true)
  }, [])

  const total = cart.reduce((s: number, i: any) => s + Number(i.price ?? 0) * Math.max(1, Math.round(Number(i.qty ?? i.quantity ?? 1))), 0)

  async function payNow() {
    if (loading) return

    if (cart.length === 0) {
      alert('السلة فارغة')
      return
    }
    if (total <= 0) {
      alert('المبلغ الإجمالي غير صحيح')
      return
    }

    setLoading(true)

    const mappedItems = cart.map((i: any) => ({
      name:     String(i.name  ?? ''),
      price:    Number(i.price ?? 0),
      quantity: Math.max(1, Math.round(Number(i.qty ?? i.quantity ?? 1))),
    }))

    const totalAmount = mappedItems.reduce((s, i) => s + i.price * i.quantity, 0)

    const payload = {
      email:       localStorage.getItem('userEmail') || '',
      phone:       localStorage.getItem('userPhone') || '',
      totalAmount,
      items:       mappedItems,
    }
    console.log('PAYLOAD TO /api/orders:', payload)

    try {
      const res  = await fetch('/api/orders', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      })
      const data = await res.json()
      console.log('ORDER API RESPONSE:', data)

      if (!data?.id) {
        console.error('ORDER API ERROR: no id in response', data)
        setLoading(false)
        return
      }

      const finalOrder = {
        ...data,
        total:     totalAmount,
        payment:   method,
        name:      localStorage.getItem('userName')     || '',
        city:      localStorage.getItem('userCity')     || '',
        country:   localStorage.getItem('userCountry')  || '',
        district:  localStorage.getItem('userDistrict') || '',
        points:    0,
      }

      localStorage.setItem('currentOrder', JSON.stringify(finalOrder))

      const history = JSON.parse(localStorage.getItem('orderHistory') || '[]')
      history.unshift(finalOrder)
      localStorage.setItem('orderHistory', JSON.stringify(history))

      localStorage.removeItem('cart')
      window.dispatchEvent(new Event('storage'))

      router.push(`/track?orderId=${data.id}`)
    } catch (err) {
      console.error('ORDER API ERROR:', err)
      setLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <>
      <style>{CSS}</style>
      <div className="xp-root">

        <nav className="xp-nav">
          <span className="xp-logo">XAVOV</span>
          <button className="xp-back" onClick={() => router.push('/otp')}>→ العودة</button>
        </nav>

        <div className="xp-steps">
          <div className="xp-step done"><div className="xp-step-num">✓</div>السلة</div>
          <div className="xp-step done"><div className="xp-step-num">✓</div>التسجيل</div>
          <div className="xp-step done"><div className="xp-step-num">✓</div>التحقق</div>
          <div className="xp-step active"><div className="xp-step-num">4</div>الدفع</div>
          <div className="xp-step"><div className="xp-step-num">5</div>التتبع</div>
        </div>

        <div className="xp-content">
          <div className="xp-sec-ttl">PAYMENT METHOD</div>
          <div className="xp-sec-name">طريقة الدفع</div>
          <div className="xp-sec-div" />

          <div className="xp-grid">
            {METHODS.map(m => (
              <div
                key={m.id}
                className={`xp-card${method === m.id ? ' selected' : ''}`}
                onClick={() => setMethod(m.id)}
              >
                <div className="xp-ico">{m.ico}</div>
                <div>
                  <div className="xp-card-name">{m.name}</div>
                  <div className="xp-card-sub">{m.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="xp-summary">
            <div>
              <div className="xp-sum-lbl">إجمالي الطلب</div>
              <div className="xp-sum-sub">شامل الشحن المجاني</div>
            </div>
            <div style={{ textAlign: 'left' }}>
              <div className="xp-sum-val">{total.toLocaleString()}</div>
              <div className="xp-sum-cur">SAR</div>
            </div>
          </div>

          <button className="xp-btn-gold" onClick={payNow} disabled={loading}>
            {loading ? '…جارٍ المعالجة' : 'تأكيد الدفع ←'}
          </button>
        </div>

      </div>
    </>
  )
}
