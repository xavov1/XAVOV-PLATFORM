'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Item = { id: number; name: string; price: number; quantity?: number; emoji?: string; origin?: string; code?: string }

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=Cairo:wght@300;400;500;600;700;900&display=swap');

.xc-root *{margin:0;padding:0;box-sizing:border-box;}
.xc-root{
  --gold:#C9A84C;--gold-b:rgba(201,168,76,0.16);--gold-b2:rgba(201,168,76,0.38);
  --gold-glow:rgba(201,168,76,0.07);
  --bg:#02040A;--bg2:#04060D;
  --surface:#080D18;--surface2:#0B1020;--surface3:#0E1428;
  --text:#EDE5D5;--text2:#B5AC9C;--muted:#524C44;
  --green:#2ECC71;
  background:var(--bg);color:var(--text);font-family:'Cairo',sans-serif;
  min-height:100vh;direction:rtl;
}

/* NAV */
.xc-nav{height:64px;display:flex;align-items:center;justify-content:space-between;padding:0 52px;
  background:rgba(2,4,10,0.96);border-bottom:1px solid var(--gold-b);backdrop-filter:blur(24px);
  position:sticky;top:0;z-index:200;}
.xc-logo{font-family:'Cormorant Garamond',serif;font-size:20px;color:var(--gold);letter-spacing:5px;font-weight:600;}
.xc-nav-right{font-size:10px;letter-spacing:3px;color:var(--muted);font-family:'Cormorant Garamond',serif;}

/* STEP BAR */
.xc-steps{display:flex;align-items:center;border-bottom:1px solid var(--gold-b);background:rgba(2,4,10,0.6);}
.xc-step{flex:1;display:flex;align-items:center;justify-content:center;gap:10px;padding:12px 16px;
  font-size:10px;letter-spacing:2px;color:var(--muted);font-family:'Cormorant Garamond',serif;
  border-left:1px solid var(--gold-b);position:relative;}
.xc-step:last-child{border-left:none;}
.xc-step.active{color:var(--gold);}
.xc-step.active::after{content:'';position:absolute;bottom:0;left:0;right:0;height:1px;background:var(--gold);}
.xc-step-num{width:18px;height:18px;border:1px solid currentColor;border-radius:50%;
  display:flex;align-items:center;justify-content:center;font-size:8px;flex-shrink:0;}

/* LAYOUT */
.xc-content{display:grid;grid-template-columns:1fr 340px;gap:24px;max-width:1100px;
  margin:0 auto;padding:48px 60px;width:100%;}

/* SECTION HEADER */
.xc-sec-ttl{font-size:10px;letter-spacing:5px;color:rgba(201,168,76,0.45);
  font-family:'Cormorant Garamond',serif;margin-bottom:8px;}
.xc-sec-name{font-size:clamp(22px,2.8vw,32px);font-weight:700;margin-bottom:14px;}
.xc-sec-div{height:1px;background:linear-gradient(90deg,var(--gold-b2),transparent);margin-bottom:32px;}

/* CART ITEM */
.xc-item{border:1px solid var(--gold-b);background:var(--surface);margin-bottom:12px;overflow:hidden;
  transition:opacity 0.35s,transform 0.35s;}
.xc-item.removing{opacity:0;transform:translateX(24px);}
.xc-item-top{display:grid;grid-template-columns:80px 1fr auto;align-items:center;}
.xc-item-img{width:80px;height:80px;border-left:1px solid var(--gold-b);background:var(--surface2);
  display:flex;align-items:center;justify-content:center;
  font-family:'Cormorant Garamond',serif;font-size:28px;color:var(--gold);opacity:0.5;}
.xc-item-info{padding:16px 20px;}
.xc-item-name{font-size:15px;font-weight:700;margin-bottom:3px;}
.xc-item-code{font-size:10px;color:var(--muted);letter-spacing:2px;font-family:'Cormorant Garamond',serif;margin-bottom:8px;}
.xc-item-badge{font-size:9px;letter-spacing:2px;color:var(--green);padding:2px 8px;
  border:1px solid rgba(46,204,113,0.25);background:rgba(46,204,113,0.06);display:inline-block;}
.xc-item-price{padding:16px 20px;text-align:left;}
.xc-price-val{font-family:'Cormorant Garamond',serif;font-size:22px;color:var(--gold);font-weight:300;}
.xc-price-cur{font-size:10px;color:var(--muted);letter-spacing:1px;}

/* QTY */
.xc-qty{display:flex;align-items:center;border:1px solid var(--gold-b);margin-top:12px;width:fit-content;}
.xc-qty-btn{width:34px;height:34px;background:var(--surface2);border:none;color:var(--gold);
  font-size:18px;cursor:pointer;transition:background 0.2s;line-height:1;}
.xc-qty-btn:hover{background:var(--surface3);}
.xc-qty-val{width:40px;height:34px;text-align:center;font-family:'Cormorant Garamond',serif;
  font-size:18px;color:var(--text);background:transparent;line-height:34px;
  border-right:1px solid var(--gold-b);border-left:1px solid var(--gold-b);}

/* REMOVE */
.xc-remove{padding:0 12px;background:transparent;border:none;color:var(--muted);
  font-size:16px;cursor:pointer;align-self:stretch;display:flex;align-items:center;
  border-right:1px solid var(--gold-b);transition:color 0.2s;margin-right:auto;}
.xc-remove:hover{color:#C0392B;}

/* SUMMARY */
.xc-summary{border:1px solid var(--gold-b);background:var(--surface);padding:28px;position:sticky;top:80px;}
.xc-sum-ttl{font-size:10px;letter-spacing:4px;color:var(--muted);font-family:'Cormorant Garamond',serif;margin-bottom:20px;}
.xc-sum-row{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid rgba(201,168,76,0.06);}
.xc-sum-k{font-size:12.5px;color:var(--muted);}
.xc-sum-v{font-size:13px;color:var(--text2);font-weight:600;}
.xc-sum-total{border-top:1px solid var(--gold-b);margin-top:12px;padding-top:16px;
  display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;}
.xc-sum-total-k{font-size:14px;font-weight:700;}
.xc-sum-total-v{font-family:'Cormorant Garamond',serif;font-size:32px;color:var(--gold);font-weight:300;}
.xc-sum-total-cur{font-size:10px;color:var(--muted);letter-spacing:1px;text-align:left;margin-top:2px;}

/* BUTTONS */
.xc-btn-gold{width:100%;padding:14px;background:var(--gold);color:var(--bg);
  font-size:13px;font-family:'Cairo',sans-serif;font-weight:700;letter-spacing:0.5px;
  border:none;cursor:pointer;transition:background 0.25s;display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:10px;}
.xc-btn-gold:hover{background:#E8C97A;}
.xc-btn-outline{width:100%;padding:13px;border:1px solid var(--gold);color:var(--gold);
  background:transparent;font-size:13px;font-family:'Cairo',sans-serif;letter-spacing:0.5px;
  cursor:pointer;transition:all 0.25s;display:flex;align-items:center;justify-content:center;gap:10px;}
.xc-btn-outline:hover{background:var(--gold);color:var(--bg);}

/* EMPTY */
.xc-empty{text-align:center;padding:80px 40px;}
.xc-empty-icon{font-size:56px;margin-bottom:20px;opacity:0.4;}
.xc-empty-ttl{font-family:'Cormorant Garamond',serif;font-size:28px;color:var(--muted);letter-spacing:3px;margin-bottom:8px;}
.xc-empty-sub{font-size:12px;color:var(--muted);letter-spacing:1px;margin-bottom:32px;}

@media(max-width:768px){
  .xc-content{grid-template-columns:1fr;padding:24px 20px;}
  .xc-nav{padding:0 20px;}
  .xc-summary{position:static;}
}
`

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
    return () => window.removeEventListener('storage', loadCart)
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
      i.id === id ? { ...i, quantity: Math.max(1, (i.quantity || 1) + delta) } : i
    )
    setCart(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
    window.dispatchEvent(new Event('storage'))
  }

  const total = cart.reduce((s, i) => s + i.price * (i.quantity || 1), 0)
  const count = cart.reduce((s, i) => s + (i.quantity || 1), 0)

  if (!mounted) return null

  return (
    <>
      <style>{CSS}</style>
      <div className="xc-root">

        {/* NAV */}
        <nav className="xc-nav">
          <span className="xc-logo">XAVOV</span>
          <span className="xc-nav-right">XA STORE · السلة</span>
        </nav>

        {/* STEP BAR */}
        <div className="xc-steps">
          <div className="xc-step active"><div className="xc-step-num">1</div>السلة</div>
          <div className="xc-step"><div className="xc-step-num">2</div>التسجيل</div>
          <div className="xc-step"><div className="xc-step-num">3</div>التحقق</div>
          <div className="xc-step"><div className="xc-step-num">4</div>الدفع</div>
          <div className="xc-step"><div className="xc-step-num">5</div>التتبع</div>
        </div>

        {cart.length === 0 ? (
          <div className="xc-empty">
            <div className="xc-empty-icon">🛒</div>
            <div className="xc-empty-ttl">السلة فارغة</div>
            <div className="xc-empty-sub">لا يوجد منتجات في سلتك</div>
            <button className="xc-btn-outline" style={{ width: 'auto', padding: '13px 32px' }} onClick={() => router.push('/store')}>
              تصفح المنتجات ←
            </button>
          </div>
        ) : (
          <div className="xc-content">

            {/* ITEMS */}
            <div>
              <div className="xc-sec-ttl">YOUR CART</div>
              <div className="xc-sec-name">سلة المشتريات</div>
              <div className="xc-sec-div" />

              {cart.map(item => (
                <div
                  key={item.id}
                  className={`xc-item${removing === item.id ? ' removing' : ''}`}
                >
                  <div className="xc-item-top">
                    <div className="xc-item-img">{item.emoji || '◻'}</div>
                    <div className="xc-item-info">
                      <div className="xc-item-name">{item.name}</div>
                      {item.code && <div className="xc-item-code">{item.code}</div>}
                      <div className="xc-item-badge">ORIGINAL · أصلي</div>
                      <div className="xc-qty">
                        <button className="xc-qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                        <span className="xc-qty-val">{item.quantity || 1}</span>
                        <button className="xc-qty-btn" onClick={() => updateQty(item.id, +1)}>+</button>
                      </div>
                    </div>
                    <div className="xc-item-price">
                      <div className="xc-price-val">{(item.price * (item.quantity || 1)).toLocaleString()}</div>
                      <div className="xc-price-cur">SAR</div>
                      <button className="xc-remove" onClick={() => removeItem(item.id)} title="حذف">✕</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* SUMMARY */}
            <div>
              <div className="xc-summary">
                <div className="xc-sum-ttl">ORDER SUMMARY</div>
                <div className="xc-sum-row">
                  <span className="xc-sum-k">المنتجات ({count})</span>
                  <span className="xc-sum-v">{total.toLocaleString()} SAR</span>
                </div>
                <div className="xc-sum-row">
                  <span className="xc-sum-k">الشحن</span>
                  <span className="xc-sum-v" style={{ color: 'var(--green)' }}>مجاني ✓</span>
                </div>
                <div className="xc-sum-row">
                  <span className="xc-sum-k">النقاط المكتسبة</span>
                  <span className="xc-sum-v" style={{ color: 'var(--green)' }}>+2 نقطة</span>
                </div>
                <div className="xc-sum-total">
                  <span className="xc-sum-total-k">الإجمالي</span>
                  <div style={{ textAlign: 'left' }}>
                    <div className="xc-sum-total-v">{total.toLocaleString()}</div>
                    <div className="xc-sum-total-cur">SAR</div>
                  </div>
                </div>
                <button className="xc-btn-gold" onClick={() => router.push('/register')}>
                  تأكيد الطلب ←
                </button>
                <button className="xc-btn-outline" onClick={() => router.push('/store')}>
                  متابعة التسوق
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </>
  )
}
