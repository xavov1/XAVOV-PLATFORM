'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Order = {
  id: string
  name?: string
  email?: string
  phone?: string
  address?: string
  paymentMethod?: string
  totalAmount: number
  status: string
  createdAt: string
  items?: any[]
}

const payIcons: Record<string, string> = {
  card: '💳',
  applepay: '🍎',
  stc: '📱',
  tamara: '🟢',
}

const payLabels: Record<string, string> = {
  card: 'بطاقة بنكية',
  applepay: 'Apple Pay',
  stc: 'STC Pay',
  tamara: 'تمارا',
}

const statusCfg: Record<string, { bg: string; color: string; label: string }> = {
  processing: { bg: 'rgba(212,168,83,.12)', color: '#D4A853', label: '⏳ قيد المعالجة' },
  paid: { bg: 'rgba(39,174,96,.12)', color: '#27AE60', label: '✅ تم الدفع' },
  shipped: { bg: 'rgba(41,128,185,.12)', color: '#2980B9', label: '✈️ في الطريق' },
  delivered: { bg: 'rgba(39,174,96,.14)', color: '#2ECC71', label: '📦 تم التسليم' },
  cancelled: { bg: 'rgba(192,57,43,.12)', color: '#E57373', label: '❌ ملغي' },
}

const TRACK = ['تأكيد', 'التجهيز', 'الشحن', 'الجمارك', 'التسليم']

const trackIdx = (s: string) =>
  ({ processing: 1, paid: 2, shipped: 3, delivered: 4 } as Record<string, number>)[s] ?? 0

export default function DashboardPage() {
  const router = useRouter()

  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [points, setPoints] = useState(0)
  const [open, setOpen] = useState<string | null>(null)
  const [received, setReceived] = useState<Record<string, boolean>>({})
  const [feedback, setFeedback] = useState<Record<string, string>>({})
  const [reason, setReason] = useState<Record<string, string>>({})
  const [toast, setToast] = useState('')

  useEffect(() => {
    fetch('/api/orders')
      .then(r => r.json())
      .then(d => {
        setOrders(Array.isArray(d) ? d : [])
        setLoading(false)
      })
      .catch(() => setLoading(false))

    const savedPoints = localStorage.getItem('points')
    if (savedPoints) setPoints(Number(savedPoints))

    const savedReceived = localStorage.getItem('received')
    if (savedReceived) setReceived(JSON.parse(savedReceived))

    const savedFeedback = localStorage.getItem('feedback')
    if (savedFeedback) setFeedback(JSON.parse(savedFeedback))

    const savedReason = localStorage.getItem('feedback_reason')
    if (savedReason) setReason(JSON.parse(savedReason))
  }, [])

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2800)
  }

  const addPoints = (n: number) => {
    const next = points + n
    setPoints(next)
    localStorage.setItem('points', String(next))
  }

  const handleReceived = (id: string) => {
    if (received[id]) return
    const next = { ...received, [id]: true }
    setReceived(next)
    localStorage.setItem('received', JSON.stringify(next))
    addPoints(2)
    showToast('🎁 تم إضافة 2 نقطة عند الاستلام')
  }

  const handleFeedback = (id: string, type: string) => {
    if (feedback[id]) return

    const next = { ...feedback, [id]: type }
    setFeedback(next)
    localStorage.setItem('feedback', JSON.stringify(next))

    if (type === 'good') {
      addPoints(3)
      showToast('⭐ تم إضافة 3 نقاط بعد التقييم')
    } else {
      showToast('✍️ تم تسجيل ملاحظتك')
    }
  }

  const handleReasonChange = (id: string, value: string) => {
    const next = { ...reason, [id]: value }
    setReason(next)
    localStorage.setItem('feedback_reason', JSON.stringify(next))
  }

  const total = orders.reduce((s, o) => s + o.totalAmount, 0)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&family=Tajawal:wght@700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

        .db{
          font-family:'Cairo',sans-serif;direction:rtl;min-height:100vh;color:#F0EDE8;padding:32px 24px;
          background:
            radial-gradient(ellipse 60% 50% at 15% 20%,rgba(212,168,83,.06) 0%,transparent 55%),
            radial-gradient(ellipse 50% 40% at 85% 80%,rgba(192,57,43,.04) 0%,transparent 55%),
            #050810;
        }

        .db-wrap{max-width:980px;margin:0 auto;display:flex;flex-direction:column;gap:24px}

        @keyframes dbUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
        .db-up{animation:dbUp .5s cubic-bezier(.16,1,.3,1) both}

        .db-header{
          display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:14px
        }

        .db-logo{
          font-family:'Tajawal',sans-serif;font-size:13px;letter-spacing:3px;
          background:linear-gradient(135deg,#D4A853,#F5D78E,#D4A853);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
          margin-bottom:6px
        }

        .db-title{font-size:30px;font-weight:900;color:#F0EDE8;margin-bottom:4px}
        .db-sub{font-size:13px;color:#4A5568}
        .db-sub strong{color:#D4A853}

        .db-shop-btn{
          padding:11px 20px;background:rgba(212,168,83,.08);
          border:1px solid rgba(212,168,83,.22);border-radius:12px;color:#D4A853;
          font-family:'Cairo',sans-serif;font-size:13px;font-weight:700;cursor:pointer;transition:.2s
        }
        .db-shop-btn:hover{background:rgba(212,168,83,.14);transform:translateY(-1px)}

        .db-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
        @media(max-width:760px){.db-stats{grid-template-columns:1fr 1fr}}
        @media(max-width:520px){.db-stats{grid-template-columns:1fr}}

        .db-stat{
          background:#0c1020;border:1px solid rgba(255,255,255,.06);border-radius:18px;
          padding:20px;position:relative;overflow:hidden;transition:transform .2s,border-color .2s
        }
        .db-stat:hover{transform:translateY(-2px);border-color:rgba(255,255,255,.1)}
        .db-stat::after{content:'';position:absolute;top:0;left:0;right:0;height:2px}
        .db-stat.gold::after{background:linear-gradient(90deg,#D4A853,transparent)}
        .db-stat.green::after{background:linear-gradient(90deg,#27AE60,transparent)}
        .db-stat.blue::after{background:linear-gradient(90deg,#2980B9,transparent)}
        .db-stat.purple::after{background:linear-gradient(90deg,#9B59B6,transparent)}
        .db-stat-icon{font-size:22px;margin-bottom:10px}
        .db-stat-val{font-size:26px;font-weight:900;color:#F0EDE8;line-height:1;margin-bottom:4px}
        .db-stat-label{font-size:11px;color:#4A5568}

        .db-points{
          background:#0c1020;border:1px solid rgba(212,168,83,.18);border-radius:20px;
          overflow:hidden;position:relative
        }
        .db-points::before{
          content:'';position:absolute;top:0;left:0;right:0;height:2px;
          background:linear-gradient(90deg,transparent,#D4A853,#F5D78E,#D4A853,transparent)
        }
        .db-points-body{padding:22px 26px;display:flex;align-items:center;gap:20px}
        .db-points-icon{
          width:58px;height:58px;border-radius:16px;background:rgba(212,168,83,.1);
          border:1px solid rgba(212,168,83,.2);display:flex;align-items:center;justify-content:center;
          font-size:28px;flex-shrink:0
        }
        .db-points-label{font-size:14px;font-weight:700;color:#F0EDE8;margin-bottom:2px}
        .db-points-val{font-size:34px;font-weight:900;color:#D4A853;line-height:1;margin-bottom:4px}
        .db-points-sub{font-size:11px;color:#4A5568}
        .db-points-bar-wrap{
          flex:1;background:rgba(255,255,255,.04);border-radius:999px;height:7px;overflow:hidden;margin-top:10px
        }
        .db-points-bar{
          height:100%;background:linear-gradient(90deg,#D4A853,#F5D78E);border-radius:999px;transition:width .6s
        }

        .db-section-title{font-size:16px;font-weight:700;color:#F0EDE8}

        .db-order{
          background:#0c1020;border:1px solid rgba(255,255,255,.07);
          border-radius:20px;overflow:hidden;transition:border-color .2s
        }
        .db-order:hover{border-color:rgba(212,168,83,.2)}

        .db-order-head{
          padding:18px 22px;display:flex;align-items:center;gap:14px;cursor:pointer;user-select:none
        }
        .db-order-pay{
          width:46px;height:46px;border-radius:13px;background:rgba(212,168,83,.08);
          border:1px solid rgba(212,168,83,.12);display:flex;align-items:center;
          justify-content:center;font-size:21px;flex-shrink:0
        }
        .db-order-info{flex:1;min-width:0}
        .db-order-id{
          font-size:10px;color:#2D3748;font-family:'Tajawal',sans-serif;letter-spacing:1px;margin-bottom:4px
        }
        .db-order-name{
          font-size:14px;font-weight:700;color:#F0EDE8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:2px
        }
        .db-order-date{font-size:11px;color:#2D3748}
        .db-order-right{display:flex;flex-direction:column;align-items:flex-end;gap:6px;flex-shrink:0}
        .db-order-amount{font-size:20px;font-weight:900;color:#D4A853}
        .db-order-amount small{font-size:11px;font-weight:400;color:#4A5568;margin-right:3px}
        .db-status{display:inline-flex;align-items:center;padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700}
        .db-chevron{font-size:11px;color:#2D3748;transition:transform .25s;flex-shrink:0}
        .db-chevron.open{transform:rotate(180deg)}

        .db-order-body{border-top:1px solid rgba(255,255,255,.04);padding:0 22px 20px}

        .db-track{display:flex;align-items:center;padding:18px 0 14px;gap:0}
        .db-track-step{display:flex;flex-direction:column;align-items:center;flex:1;position:relative}
        .db-track-step::before{
          content:'';position:absolute;top:14px;right:50%;width:100%;height:2px;background:rgba(255,255,255,.06);z-index:0
        }
        .db-track-step:last-child::before{display:none}
        .db-track-step.done::before{background:#27AE60}
        .db-track-dot{
          width:28px;height:28px;border-radius:50%;background:#0c1020;border:2px solid rgba(255,255,255,.08);
          display:flex;align-items:center;justify-content:center;font-size:11px;z-index:1;margin-bottom:7px;transition:.3s
        }
        .db-track-step.done .db-track-dot{background:#27AE60;border-color:#27AE60;color:#fff}
        .db-track-step.current .db-track-dot{
          background:#D4A853;border-color:#D4A853;color:#050810;box-shadow:0 0 12px rgba(212,168,83,.4)
        }
        .db-track-label{font-size:9px;color:#2D3748;text-align:center}
        .db-track-step.done .db-track-label,.db-track-step.current .db-track-label{color:#7A8499}

        .db-detail{
          display:flex;justify-content:space-between;gap:16px;padding:10px 0;font-size:13px;
          border-bottom:1px solid rgba(255,255,255,.03)
        }
        .db-detail:last-child{border-bottom:none}
        .db-detail-label{color:#4A5568}
        .db-detail-val{color:#F0EDE8;font-weight:600;text-align:left;word-break:break-word}

        .db-points-note{
          margin-top:14px;padding:12px 14px;border-radius:12px;
          background:rgba(212,168,83,.06);border:1px solid rgba(212,168,83,.12);
          color:#D4A853;font-size:12px;font-weight:600
        }

        .db-actions{display:flex;gap:10px;margin-top:14px;flex-wrap:wrap}

        .db-btn-received{
          flex:1;padding:12px;border-radius:12px;border:none;
          background:linear-gradient(135deg,#B8862E,#D4A853,#F5D78E,#D4A853,#B8862E);
          background-size:200% 100%;font-family:'Cairo',sans-serif;
          font-size:13px;font-weight:700;color:#050810;cursor:pointer;transition:.3s
        }
        .db-btn-received:hover{background-position:100% 0;box-shadow:0 6px 20px rgba(212,168,83,.3)}
        .db-btn-received:disabled{opacity:.45;cursor:default}

        .db-feedback-row{display:flex;gap:8px;margin-top:12px}
        .db-btn-good,.db-btn-bad{
          flex:1;padding:10px;border-radius:10px;font-family:'Cairo',sans-serif;
          font-size:13px;font-weight:700;cursor:pointer;transition:.2s
        }
        .db-btn-good{background:rgba(39,174,96,.08);border:1px solid rgba(39,174,96,.2);color:#27AE60}
        .db-btn-good:hover{background:rgba(39,174,96,.15)}
        .db-btn-good.active{background:rgba(39,174,96,.2);border-color:#27AE60}
        .db-btn-bad{background:rgba(192,57,43,.08);border:1px solid rgba(192,57,43,.2);color:#E57373}
        .db-btn-bad:hover{background:rgba(192,57,43,.15)}
        .db-btn-bad.active{background:rgba(192,57,43,.2);border-color:#E57373}
        .db-btn-good:disabled,.db-btn-bad:disabled{opacity:.4;cursor:default}

        .db-reason{
          width:100%;margin-top:10px;padding:12px 14px;background:rgba(255,255,255,.03);
          border:1px solid rgba(255,255,255,.08);border-radius:10px;font-family:'Cairo',sans-serif;
          font-size:13px;color:#F0EDE8;outline:none;direction:rtl;resize:none;transition:border-color .2s
        }
        .db-reason:focus{border-color:rgba(212,168,83,.4)}
        .db-reason::placeholder{color:#2D3748}

        .db-empty{
          display:flex;flex-direction:column;align-items:center;gap:16px;padding:80px 32px;
          background:#0c1020;border:1px solid rgba(255,255,255,.06);border-radius:24px
        }
        .db-empty-icon{font-size:64px;opacity:.35;animation:dbFloat 3s ease-in-out infinite}
        @keyframes dbFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        .db-empty-title{font-size:20px;font-weight:700;color:#4A5568}
        .db-empty-btn{
          padding:12px 28px;background:rgba(212,168,83,.1);border:1px solid rgba(212,168,83,.3);
          border-radius:12px;color:#D4A853;font-family:'Cairo',sans-serif;font-size:13px;font-weight:700;
          cursor:pointer;transition:.2s
        }
        .db-empty-btn:hover{background:rgba(212,168,83,.18);transform:translateY(-1px)}

        .db-loading{display:flex;align-items:center;justify-content:center;gap:12px;padding:60px;color:#4A5568;font-size:14px}
        .db-spinner{
          width:24px;height:24px;border:2px solid rgba(212,168,83,.2);border-top-color:#D4A853;
          border-radius:50%;animation:dbSpin .7s linear infinite
        }
        @keyframes dbSpin{to{transform:rotate(360deg)}}

        .db-toast{
          position:fixed;bottom:28px;right:50%;transform:translateX(50%);
          background:#0c1020;border:1px solid rgba(212,168,83,.3);border-radius:14px;
          padding:14px 22px;font-size:14px;font-weight:700;color:#D4A853;
          box-shadow:0 8px 32px rgba(0,0,0,.5);animation:dbToast .3s cubic-bezier(.16,1,.3,1) both;z-index:999
        }
        @keyframes dbToast{
          from{opacity:0;transform:translateX(50%) translateY(10px)}
          to{opacity:1;transform:translateX(50%) translateY(0)}
        }
      `}</style>

      <div className="db">
        <div className="db-wrap">

          <div className="db-header db-up">
            <div>
              <div className="db-logo">XAVOV DASHBOARD</div>
              <div className="db-title">طلباتي 📦</div>
              <div className="db-sub">
                {orders.length > 0
                  ? <><strong>{orders.length}</strong> طلب · إجمالي <strong>{total.toLocaleString()} ر.س</strong></>
                  : 'لا يوجد طلبات بعد'}
              </div>
            </div>

            <button className="db-shop-btn" onClick={() => router.push('/marketplace')}>
              تسوق الآن ←
            </button>
          </div>

          {orders.length > 0 && (
            <div className="db-stats">
              {[
                { cls: 'gold', icon: '💰', val: `${total.toLocaleString()} ر.س`, label: 'إجمالي الإنفاق', delay: 0 },
                { cls: 'green', icon: '📦', val: orders.length, label: 'إجمالي الطلبات', delay: .06 },
                { cls: 'blue', icon: '✅', val: orders.filter(o => o.status === 'delivered').length, label: 'طلبات مكتملة', delay: .12 },
                { cls: 'purple', icon: '⭐', val: points, label: 'نقاط المكافآت', delay: .18 },
              ].map((s, i) => (
                <div key={i} className={`db-stat ${s.cls} db-up`} style={{ animationDelay: `${s.delay}s` }}>
                  <div className="db-stat-icon">{s.icon}</div>
                  <div className="db-stat-val">{s.val}</div>
                  <div className="db-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          )}

          <div className="db-points db-up" style={{ animationDelay: '.2s' }}>
            <div className="db-points-body">
              <div className="db-points-icon">🎁</div>
              <div style={{ flex: 1 }}>
                <div className="db-points-label">نقاط المكافآت</div>
                <div className="db-points-val">
                  {points} <span style={{ fontSize: 16, color: '#7A8499', fontWeight: 400 }}>نقطة</span>
                </div>
                <div className="db-points-sub">
                  +2 عند استلام الطلب · +3 عند التقييم الإيجابي
                </div>
                <div className="db-points-bar-wrap">
                  <div className="db-points-bar" style={{ width: `${Math.min((points / 100) * 100, 100)}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="db-section-title">سجل الطلبات</div>

          {loading && (
            <div className="db-loading">
              <div className="db-spinner" />
              <span>جارٍ التحميل...</span>
            </div>
          )}

          {!loading && orders.length === 0 && (
            <div className="db-empty">
              <div className="db-empty-icon">📭</div>
              <div className="db-empty-title">لا يوجد طلبات بعد</div>
              <button className="db-empty-btn" onClick={() => router.push('/marketplace')}>
                تسوق الآن ←
              </button>
            </div>
          )}

          {orders.map((order, i) => {
            const isOpen = open === order.id
            const cfg = statusCfg[order.status] || statusCfg.processing
            const ti = trackIdx(order.status)

            return (
              <div key={order.id} className="db-order db-up" style={{ animationDelay: `${i * .07}s` }}>
                <div className="db-order-head" onClick={() => setOpen(isOpen ? null : order.id)}>
                  <div className="db-order-pay">{payIcons[order.paymentMethod || 'card'] || '💳'}</div>

                  <div className="db-order-info">
                    <div className="db-order-id">#{order.id.slice(-12).toUpperCase()}</div>
                    <div className="db-order-name">{order.name || order.email || order.phone || 'طلب XAVOV'}</div>
                    <div className="db-order-date">
                      {new Date(order.createdAt).toLocaleDateString('ar-SA', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>

                  <div className="db-order-right">
                    <div className="db-order-amount">
                      {order.totalAmount.toLocaleString()}<small>ر.س</small>
                    </div>
                    <div className="db-status" style={{ background: cfg.bg, color: cfg.color }}>
                      {cfg.label}
                    </div>
                  </div>

                  <div className={`db-chevron ${isOpen ? 'open' : ''}`}>▼</div>
                </div>

                {isOpen && (
                  <div className="db-order-body">
                    <div className="db-track">
                      {TRACK.map((s, idx) => (
                        <div key={idx} className={`db-track-step ${idx < ti ? 'done' : idx === ti ? 'current' : ''}`}>
                          <div className="db-track-dot">{idx < ti ? '✓' : idx === ti ? '●' : ''}</div>
                          <div className="db-track-label">{s}</div>
                        </div>
                      ))}
                    </div>

                    {order.address && (
                      <div className="db-detail">
                        <span className="db-detail-label">العنوان</span>
                        <span className="db-detail-val">{order.address}</span>
                      </div>
                    )}

                    <div className="db-detail">
                      <span className="db-detail-label">طريقة الدفع</span>
                      <span className="db-detail-val">{payLabels[order.paymentMethod || ''] || '—'}</span>
                    </div>

                    <div className="db-detail">
                      <span className="db-detail-label">المبلغ</span>
                      <span className="db-detail-val" style={{ color: '#D4A853' }}>
                        {order.totalAmount.toLocaleString()} ر.س
                      </span>
                    </div>

                    <div className="db-detail">
                      <span className="db-detail-label">تاريخ الطلب</span>
                      <span className="db-detail-val">{new Date(order.createdAt).toLocaleString('ar-SA')}</span>
                    </div>

                    <div className="db-points-note">
                      تستخدم النقاط المكتسبة كخصم على مشترياتك القادمة داخل XAVOV
                    </div>

                    <div className="db-actions">
                      <button
                        className="db-btn-received"
                        disabled={!!received[order.id]}
                        onClick={() => handleReceived(order.id)}
                      >
                        {received[order.id] ? '✓ تم الاستلام' : 'تأكيد الاستلام (+2 نقطة)'}
                      </button>
                    </div>

                    <div className="db-feedback-row">
                      <button
                        className={`db-btn-good ${feedback[order.id] === 'good' ? 'active' : ''}`}
                        disabled={!!feedback[order.id]}
                        onClick={() => handleFeedback(order.id, 'good')}
                      >
                        👍 راضي (+3 نقاط)
                      </button>

                      <button
                        className={`db-btn-bad ${feedback[order.id] === 'bad' ? 'active' : ''}`}
                        disabled={!!feedback[order.id]}
                        onClick={() => handleFeedback(order.id, 'bad')}
                      >
                        👎 غير راضي
                      </button>
                    </div>

                    {feedback[order.id] === 'bad' && (
                      <textarea
                        className="db-reason"
                        rows={3}
                        placeholder="اذكر سبب عدم رضاك..."
                        value={reason[order.id] || ''}
                        onChange={e => handleReasonChange(order.id, e.target.value)}
                      />
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {toast && <div className="db-toast">{toast}</div>}
    </>
  )
}