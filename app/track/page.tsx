'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=Cairo:wght@300;400;500;600;700;900&display=swap');

.xt-root *{margin:0;padding:0;box-sizing:border-box;}
.xt-root{
  --gold:#C9A84C;--gold-b:rgba(201,168,76,0.16);--gold-b2:rgba(201,168,76,0.38);
  --bg:#02040A;--surface:#080D18;--surface2:#0B1020;
  --text:#EDE5D5;--text2:#B5AC9C;--muted:#524C44;--green:#2ECC71;
  background:var(--bg);color:var(--text);font-family:'Cairo',sans-serif;min-height:100vh;direction:rtl;
}
.xt-nav{height:64px;display:flex;align-items:center;justify-content:space-between;padding:0 52px;
  background:rgba(2,4,10,0.96);border-bottom:1px solid var(--gold-b);backdrop-filter:blur(24px);
  position:sticky;top:0;z-index:200;}
.xt-logo{font-family:'Cormorant Garamond',serif;font-size:20px;color:var(--gold);letter-spacing:5px;font-weight:600;}
.xt-nav-right{font-size:10px;letter-spacing:3px;color:var(--muted);font-family:'Cormorant Garamond',serif;}

.xt-steps{display:flex;align-items:center;border-bottom:1px solid var(--gold-b);background:rgba(2,4,10,0.6);}
.xt-step{flex:1;display:flex;align-items:center;justify-content:center;gap:10px;padding:12px 16px;
  font-size:10px;letter-spacing:2px;color:var(--muted);font-family:'Cormorant Garamond',serif;
  border-left:1px solid var(--gold-b);position:relative;}
.xt-step:last-child{border-left:none;}
.xt-step.active{color:var(--gold);}
.xt-step.active::after{content:'';position:absolute;bottom:0;left:0;right:0;height:1px;background:var(--gold);}
.xt-step.done{color:var(--green);}
.xt-step-num{width:18px;height:18px;border:1px solid currentColor;border-radius:50%;
  display:flex;align-items:center;justify-content:center;font-size:8px;flex-shrink:0;}

.xt-content{max-width:700px;margin:0 auto;padding:56px 48px;}

.xt-order-header{border:1px solid var(--gold-b);background:var(--surface);padding:24px 32px;
  margin-bottom:28px;display:flex;justify-content:space-between;align-items:center;}
.xt-order-id-lbl{font-size:9px;letter-spacing:4px;color:var(--muted);
  font-family:'Cormorant Garamond',serif;margin-bottom:6px;}
.xt-order-id-val{font-family:'Cormorant Garamond',serif;font-size:20px;color:var(--gold);letter-spacing:4px;}
.xt-badge{padding:6px 16px;background:rgba(201,168,76,0.08);border:1px solid var(--gold-b);
  font-size:9px;letter-spacing:3px;color:var(--gold);font-family:'Cormorant Garamond',serif;}
.xt-badge.delivered{color:var(--green);border-color:rgba(46,204,113,0.3);background:rgba(46,204,113,0.05);}

.xt-points-banner{border:1px solid var(--gold-b2);
  background:linear-gradient(135deg,var(--surface),#0C1008);
  padding:24px 28px;position:relative;overflow:hidden;margin-bottom:24px;}
.xt-points-banner::before{content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 70% 60% at 50% 0%,rgba(201,168,76,0.06) 0%,transparent 70%);
  pointer-events:none;}
.xt-pts-accent{position:absolute;top:0;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent,var(--gold),transparent);}
.xt-pts-row{display:flex;align-items:center;justify-content:space-between;}
.xt-pts-ico{font-size:22px;color:var(--gold);margin-bottom:6px;}
.xt-pts-title{font-size:15px;font-weight:700;margin-bottom:3px;}
.xt-pts-sub{font-size:12px;color:var(--muted);}
.xt-pts-num{font-family:'Cormorant Garamond',serif;font-size:48px;color:var(--gold);
  font-weight:300;line-height:1;text-align:center;}
.xt-pts-num-lbl{font-size:9px;letter-spacing:3px;color:var(--muted);text-align:center;margin-top:2px;}

.xt-timeline{border:1px solid var(--gold-b);background:var(--surface);
  padding:32px;margin-bottom:20px;}
.xt-tl-row{display:grid;grid-template-columns:16px 1fr;gap:16px;}
.xt-tl-left{display:flex;flex-direction:column;align-items:center;}
.xt-tl-dot{width:12px;height:12px;border-radius:50%;border:1px solid var(--muted);
  background:var(--surface2);flex-shrink:0;transition:all 0.5s;}
.xt-tl-dot.active{background:var(--gold);border-color:var(--gold);
  box-shadow:0 0 10px rgba(201,168,76,0.4);}
.xt-tl-dot.done{background:var(--green);border-color:var(--green);}
.xt-tl-line{width:1px;flex:1;background:var(--gold-b);margin:4px 0;min-height:20px;}
.xt-tl-body{padding-bottom:24px;}
.xt-tl-row:last-child .xt-tl-body{padding-bottom:0;}
.xt-tl-row:last-child .xt-tl-line{display:none;}
.xt-tl-step{font-size:14px;font-weight:600;margin-bottom:3px;}
.xt-tl-step.active{color:var(--gold);}
.xt-tl-step.done{color:var(--green);}
.xt-tl-step.dim{color:var(--muted);}
.xt-tl-sub{font-size:11px;color:var(--muted);letter-spacing:1px;}

.xt-btn-gold{width:100%;padding:14px;background:var(--gold);color:var(--bg);
  font-size:13px;font-family:'Cairo',sans-serif;font-weight:700;letter-spacing:0.5px;
  border:none;cursor:pointer;transition:background 0.25s;display:flex;align-items:center;
  justify-content:center;gap:10px;margin-bottom:10px;}
.xt-btn-gold:hover{background:#E8C97A;}
.xt-btn-outline{width:100%;padding:13px;border:1px solid var(--gold);color:var(--gold);
  background:transparent;font-size:13px;font-family:'Cairo',sans-serif;letter-spacing:0.5px;
  cursor:pointer;transition:all 0.25s;display:flex;align-items:center;justify-content:center;gap:10px;}
.xt-btn-outline:hover{background:var(--gold);color:var(--bg);}

.xt-empty{text-align:center;padding:80px 40px;color:var(--muted);}

@media(max-width:640px){
  .xt-nav{padding:0 20px;}
  .xt-content{padding:32px 20px;}
  .xt-order-header{flex-direction:column;align-items:flex-start;gap:12px;}
}
`

const STATUS_FLOW = ['processing', 'preparing', 'onway', 'delivered']

const STATUS_LABELS: Record<string, { ar: string; en: string }> = {
  processing: { ar: 'قيد المعالجة',     en: 'Processing · الآن' },
  preparing:  { ar: 'جاري التجهيز',     en: 'Preparing' },
  onway:      { ar: 'في الطريق إليك',   en: 'On the Way' },
  delivered:  { ar: 'تم التوصيل',       en: 'Delivered' },
}

const STEPS = [
  { key: 'processing', ar: 'قيد المعالجة', en: 'Processing · الآن' },
  { key: 'preparing',  ar: 'جاري التجهيز', en: 'Preparing' },
  { key: 'onway',      ar: 'في الطريق إليك', en: 'On the Way' },
  { key: 'delivered',  ar: 'تم التوصيل',  en: 'Delivered' },
]

function TrackPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const trackKey = orderId
  const [order, setOrder] = useState<any>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    console.log('TRACK ID:', orderId)

    if (!trackKey) {
      setMounted(true)
      return
    }

    const history = JSON.parse(localStorage.getItem('orderHistory') || '[]')
    const found = history.find((o: any) => String(o.id) === String(trackKey))

    if (found) {
      console.log('REVIEW GIVEN:', found.reviewGiven ?? false)
      setOrder(found)
    } else {
      const raw = localStorage.getItem('currentOrder')
      if (raw) {
        const parsed = JSON.parse(raw)
        if (String(parsed.id) === String(trackKey)) {
          console.log('REVIEW GIVEN:', parsed.reviewGiven ?? false)
          setOrder(parsed)
        }
      }
    }

    setMounted(true)
  }, [trackKey])

  const saveOrder = (updated: any) => {
    setOrder(updated)
    localStorage.setItem('currentOrder', JSON.stringify(updated))
    const history = JSON.parse(localStorage.getItem('orderHistory') || '[]')
    const newHistory = history.map((o: any) => o.id === updated.id ? updated : o)
    localStorage.setItem('orderHistory', JSON.stringify(newHistory))
  }

  const nextStatus = () => {
    if (!order) return
    const idx = STATUS_FLOW.indexOf(order.status)
    if (idx < STATUS_FLOW.length - 1) {
      saveOrder({ ...order, status: STATUS_FLOW[idx + 1] })
    }
  }

  const confirmDelivery = () => {
    if (!order || order.pointsGiven) return
    const prev = Number(localStorage.getItem('points') || 0)
    console.log('POINTS BEFORE:', prev)
    const newPoints = prev + 2
    localStorage.setItem('points', String(newPoints))
    console.log('POINTS AFTER:', newPoints)
    saveOrder({ ...order, pointsGiven: true, points: (order.points || 0) + 2, delivered: true })
  }

  const statusIdx  = order ? STATUS_FLOW.indexOf(order.status) : 0
  const totalPoints = order?.points     || 0
  const pointsGiven = order?.pointsGiven  || false
  const reviewGiven = order?.reviewGiven  || false

  if (!mounted) return null

  if (!order) {
    return (
      <>
        <style>{CSS}</style>
        <div className="xt-root">
          <nav className="xt-nav">
            <span className="xt-logo">XAVOV</span>
            <span className="xt-nav-right">XA TRACK</span>
          </nav>
          <div className="xt-content">
            <div className="xt-empty">لا يوجد طلبات حالياً</div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <style>{CSS}</style>
      <div className="xt-root">

        <nav className="xt-nav">
          <span className="xt-logo">XAVOV</span>
          <span className="xt-nav-right">XA TRACK</span>
        </nav>

        <div className="xt-steps">
          <div className="xt-step done"><div className="xt-step-num">✓</div>السلة</div>
          <div className="xt-step done"><div className="xt-step-num">✓</div>التسجيل</div>
          <div className="xt-step done"><div className="xt-step-num">✓</div>التحقق</div>
          <div className="xt-step done"><div className="xt-step-num">✓</div>الدفع</div>
          <div className="xt-step active"><div className="xt-step-num">5</div>التتبع</div>
        </div>

        <div className="xt-content">

          <div className="xt-order-header">
            <div>
              <div className="xt-order-id-lbl">رقم الطلب · ORDER ID</div>
              <div className="xt-order-id-val">{order.id}</div>
            </div>
            <div className={`xt-badge${order.status === 'delivered' ? ' delivered' : ''}`}>
              {STATUS_LABELS[order.status]?.ar || order.status}
            </div>
          </div>

          {pointsGiven && (
            <div className="xt-points-banner" style={{ marginBottom: '24px' }}>
              <div className="xt-pts-accent" />
              <div className="xt-pts-row">
                <div>
                  <div className="xt-pts-ico">✦</div>
                  <div className="xt-pts-title">ربحت 2 نقطة</div>
                  <div className="xt-pts-sub">من تأكيد استلامك — اترك تقييماً واكسب 3 نقاط إضافية</div>
                </div>
                <div>
                  <div className="xt-pts-num">{totalPoints}</div>
                  <div className="xt-pts-num-lbl">نقطة</div>
                </div>
              </div>
            </div>
          )}

          <div className="xt-timeline">
            {STEPS.map((step, i) => {
              const isDone   = i < statusIdx
              const isActive = i === statusIdx
              return (
                <div className="xt-tl-row" key={step.key}>
                  <div className="xt-tl-left">
                    <div className={`xt-tl-dot${isDone ? ' done' : isActive ? ' active' : ''}`} />
                    {i < STEPS.length - 1 && <div className="xt-tl-line" />}
                  </div>
                  <div className="xt-tl-body">
                    <div className={`xt-tl-step${isDone ? ' done' : isActive ? ' active' : ' dim'}`}>
                      {step.ar}
                    </div>
                    <div className="xt-tl-sub">{step.en}</div>
                  </div>
                </div>
              )
            })}
          </div>

          {order.status !== 'delivered' && (
            <button className="xt-btn-gold" onClick={nextStatus} style={{ marginBottom: '10px' }}>
              تحديث الحالة ←
            </button>
          )}

          {order.status === 'delivered' && !pointsGiven && (
            <button className="xt-btn-gold" onClick={confirmDelivery} style={{ marginBottom: '10px' }}>
              تأكيد الاستلام (+2 نقطة) ←
            </button>
          )}

          {(pointsGiven || order.status === 'delivered') && !reviewGiven && (
            <button className="xt-btn-outline" onClick={() => router.push(`/review?orderId=${order.id}`)}>
              اترك تقييمك واكسب 3 نقاط ←
            </button>
          )}

          {reviewGiven && (
            <div style={{
              border: '1px solid rgba(46,204,113,0.3)', background: 'rgba(46,204,113,0.05)',
              padding: '13px 20px', textAlign: 'center', fontSize: '12px',
              color: 'var(--green)', letterSpacing: '1px',
            }}>
              ✓ تم إرسال تقييمك — شكراً لك
            </div>
          )}

        </div>
      </div>
    </>
  )
}

export default function TrackPage() {
  return (
    <Suspense fallback={null}>
      <TrackPageInner />
    </Suspense>
  )
}
