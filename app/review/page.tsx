'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=Cairo:wght@300;400;500;600;700;900&display=swap');

.xv-root *{margin:0;padding:0;box-sizing:border-box;}
.xv-root{
  --gold:#C9A84C;--gold-b:rgba(201,168,76,0.16);--gold-b2:rgba(201,168,76,0.38);
  --gold-glow:rgba(201,168,76,0.07);
  --bg:#02040A;--surface:#080D18;--surface2:#0B1020;
  --text:#EDE5D5;--text2:#B5AC9C;--muted:#524C44;
  --green:#2ECC71;--red:#C0392B;
  background:var(--bg);color:var(--text);font-family:'Cairo',sans-serif;min-height:100vh;direction:rtl;
}
.xv-nav{height:64px;display:flex;align-items:center;justify-content:space-between;padding:0 52px;
  background:rgba(2,4,10,0.96);border-bottom:1px solid var(--gold-b);backdrop-filter:blur(24px);
  position:sticky;top:0;z-index:200;}
.xv-logo{font-family:'Cormorant Garamond',serif;font-size:20px;color:var(--gold);letter-spacing:5px;font-weight:600;}
.xv-back{font-size:11.5px;color:var(--muted);cursor:pointer;display:flex;align-items:center;gap:6px;
  transition:color 0.2s;letter-spacing:1px;background:none;border:none;font-family:'Cairo',sans-serif;}
.xv-back:hover{color:var(--text);}

.xv-content{max-width:560px;margin:0 auto;padding:80px 48px;text-align:center;}
.xv-sec-ttl{font-size:10px;letter-spacing:5px;color:rgba(201,168,76,0.45);
  font-family:'Cormorant Garamond',serif;margin-bottom:8px;}
.xv-sec-name{font-size:clamp(22px,2.8vw,32px);font-weight:700;margin-bottom:14px;}
.xv-sec-div{height:1px;background:linear-gradient(90deg,var(--gold-b2),transparent);margin-bottom:32px;}

.xv-product{border:1px solid var(--gold-b);background:var(--surface);padding:20px 24px;
  margin-bottom:36px;display:flex;align-items:center;gap:16px;text-align:right;}
.xv-product-ico{width:48px;height:48px;border:1px solid var(--gold-b);background:var(--surface2);
  display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;
  font-size:20px;color:var(--gold);opacity:0.4;flex-shrink:0;}
.xv-product-name{font-size:14px;font-weight:700;margin-bottom:2px;}
.xv-product-code{font-size:10px;color:var(--muted);letter-spacing:2px;font-family:'Cormorant Garamond',serif;}

.xv-q{font-size:18px;font-weight:700;margin-bottom:8px;}
.xv-sub{font-size:13px;color:var(--muted);margin-bottom:36px;}

.xv-btns{display:flex;gap:16px;justify-content:center;margin-bottom:32px;}
.xv-btn{width:120px;height:120px;border:1px solid var(--gold-b);background:var(--surface);
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;
  cursor:pointer;transition:all 0.3s;font-size:11px;letter-spacing:1px;color:var(--muted);
  font-family:'Cairo',sans-serif;}
.xv-btn:hover{border-color:var(--gold-b2);}
.xv-btn.happy:hover,.xv-btn.happy.selected{border-color:var(--green);background:rgba(46,204,113,0.05);color:var(--green);}
.xv-btn.sad:hover,.xv-btn.sad.selected{border-color:var(--red);background:rgba(192,57,43,0.05);color:var(--red);}
.xv-btn-ico{font-size:40px;line-height:1;}
.xv-btn:disabled{pointer-events:none;}

.xv-reason{margin-bottom:24px;}
.xv-reason textarea{width:100%;background:var(--surface2);border:1px solid var(--gold-b);
  padding:14px 16px;font-size:13px;color:var(--text);font-family:'Cairo',sans-serif;
  outline:none;resize:none;height:100px;transition:border-color 0.25s;}
.xv-reason textarea:focus{border-color:var(--gold-b2);}
.xv-reason textarea::placeholder{color:var(--muted);}

.xv-pts-earned{border:1px solid var(--gold-b2);background:var(--gold-glow);
  padding:14px 20px;margin-bottom:20px;display:flex;align-items:center;gap:10px;}
.xv-pts-ico{color:var(--gold);font-size:18px;}
.xv-pts-txt{font-size:13px;color:var(--text2);}

.xv-btn-gold{width:100%;padding:14px;background:var(--gold);color:var(--bg);
  font-size:13px;font-family:'Cairo',sans-serif;font-weight:700;letter-spacing:0.5px;
  border:none;cursor:pointer;transition:background 0.25s;display:flex;align-items:center;
  justify-content:center;gap:10px;margin-bottom:10px;}
.xv-btn-gold:hover{background:#E8C97A;}
.xv-btn-muted{width:100%;padding:12px;border:1px solid var(--gold-b);color:var(--muted);
  background:transparent;font-size:12px;font-family:'Cairo',sans-serif;letter-spacing:0.5px;
  cursor:pointer;transition:all 0.25s;display:flex;align-items:center;justify-content:center;gap:8px;}
.xv-btn-muted:hover{border-color:var(--gold-b2);color:var(--text2);}

@media(max-width:640px){
  .xv-nav{padding:0 20px;}
  .xv-content{padding:48px 20px;}
}
`

const REVIEW_POINTS = 3

function ReviewPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const trackKey = orderId
  const [order,     setOrder]     = useState<any>(null)
  const [selected,  setSelected]  = useState<'happy' | 'sad' | null>(null)
  const [reason,    setReason]    = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [points,    setPoints]    = useState(0)
  const [loading,   setLoading]   = useState(false)

  useEffect(() => {
    console.log('ORDER ID:', orderId)
    console.log('TRACK KEY:', trackKey)

    if (!trackKey) { router.replace('/store'); return }

    const history = JSON.parse(localStorage.getItem('orderHistory') || '[]')
    let data = history.find((o: any) => String(o.id) === String(trackKey))

    if (!data) {
      const raw = localStorage.getItem('currentOrder')
      if (!raw) { router.replace('/store'); return }
      const parsed = JSON.parse(raw)
      if (String(parsed.id) !== String(trackKey)) { router.replace('/store'); return }
      data = parsed
    }

    if (data.reviewGiven) { router.replace(`/track?orderId=${trackKey}`); return }

    setOrder(data)
    setPoints(Number(localStorage.getItem('points') || 0))
  }, [trackKey, router])

  async function submitReview() {
    if (!selected || submitted || loading || !order) return
    setLoading(true)

    try {
      if (order.id) {
        await fetch(`/api/orders/${order.id}/review`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ rating: selected, reason: reason.trim() || undefined }),
        })
      }
    } catch {
      // non-blocking — persist locally regardless
    }

    const before = Number(localStorage.getItem('points') || 0)
    console.log('POINTS BEFORE:', before)
    console.log('REVIEW GIVEN:', order.reviewGiven ?? false)
    const newTotal = before + REVIEW_POINTS
    console.log('POINTS AFTER:', newTotal)
    localStorage.setItem('points', String(newTotal))

    const updated = { ...order, reviewGiven: true }
    localStorage.setItem('currentOrder', JSON.stringify(updated))

    const history = JSON.parse(localStorage.getItem('orderHistory') || '[]')
    localStorage.setItem(
      'orderHistory',
      JSON.stringify(history.map((o: any) => o.id === order.id ? { ...o, reviewGiven: true } : o))
    )

    setPoints(newTotal)
    setSubmitted(true)
    setLoading(false)
  }

  const firstItem = order?.items?.[0]
  const productName = firstItem?.name || 'طلبك'
  const productCode = order?.id ? `#${order.id}` : 'XAVOV · ORIGINAL'

  return (
    <>
      <style>{CSS}</style>
      <div className="xv-root">

        <nav className="xv-nav">
          <span className="xv-logo">XAVOV</span>
          <button className="xv-back" onClick={() => router.push(`/track?orderId=${trackKey}`)}>→ العودة للتتبع</button>
        </nav>

        <div className="xv-content">
          <div className="xv-sec-ttl">REVIEW</div>
          <div className="xv-sec-name">تقييم طلبك</div>
          <div className="xv-sec-div" />

          <div className="xv-product">
            <div className="xv-product-ico">◻</div>
            <div>
              <div className="xv-product-name">{productName}</div>
              <div className="xv-product-code">{productCode}</div>
            </div>
          </div>

          <div className="xv-q">كيف كانت تجربتك؟</div>
          <div className="xv-sub">تقييمك يساعدنا على تحسين الخدمة</div>

          <div className="xv-btns">
            <button
              className={`xv-btn happy${selected === 'happy' ? ' selected' : ''}`}
              onClick={() => !submitted && setSelected('happy')}
              disabled={submitted}
            >
              <div className="xv-btn-ico">👍🏻</div>
              <span>راضي</span>
            </button>
            <button
              className={`xv-btn sad${selected === 'sad' ? ' selected' : ''}`}
              onClick={() => !submitted && setSelected('sad')}
              disabled={submitted}
            >
              <div className="xv-btn-ico">👎🏻</div>
              <span>غير راضي</span>
            </button>
          </div>

          {selected === 'sad' && !submitted && (
            <div className="xv-reason">
              <textarea
                placeholder="أخبرنا بسبب عدم رضاك — سنعمل على التحسين..."
                value={reason}
                onChange={e => setReason(e.target.value)}
              />
            </div>
          )}

          {submitted && (
            <div className="xv-pts-earned">
              <div className="xv-pts-ico">✦</div>
              <div className="xv-pts-txt">
                ربحت {REVIEW_POINTS} نقاط إضافية — رصيدك الحالي:{' '}
                <strong style={{ color: 'var(--gold)' }}>{points} نقاط</strong>
              </div>
            </div>
          )}

          {selected && !submitted && (
            <button className="xv-btn-gold" onClick={submitReview} disabled={loading}>
              {loading ? '...' : 'إرسال التقييم ←'}
            </button>
          )}

          {submitted && (
            <button className="xv-btn-gold" onClick={() => router.push('/store')}>
              العودة للمتجر ←
            </button>
          )}

          <button className="xv-btn-muted" onClick={() => router.push('/store')}>
            {submitted ? 'تصفح المنتجات' : 'تخطي'}
          </button>
        </div>

      </div>
    </>
  )
}

export default function ReviewPage() {
  return (
    <Suspense fallback={null}>
      <ReviewPageInner />
    </Suspense>
  )
}
