'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef, Fragment } from 'react'

// ─── Data ──────────────────────────────────────────────────────────────────────

const PRICE = 4299

const SPECS_PRIMARY = [
  { key: 'المعالج',        val: 'Apple M3 — 8 Core' },
  { key: 'الذاكرة',        val: '16GB Unified RAM' },
  { key: 'التخزين',        val: '512GB SSD NVMe' },
  { key: 'الشاشة',         val: '14.2" Liquid Retina XDR' },
  { key: 'البطارية',       val: 'حتى 18 ساعة' },
  { key: 'نظام التشغيل',  val: 'macOS Sonoma' },
]

const SPECS_EXTRA = [
  { key: 'اللون',      val: 'Space Black' },
  { key: 'الوزن',      val: '1.61 كيلوغرام' },
  { key: 'المنافذ',    val: '3× Thunderbolt 4 · HDMI · MagSafe' },
  { key: 'الكاميرا',   val: '1080p FaceTime HD' },
  { key: 'الاتصال',    val: 'Wi-Fi 6E · Bluetooth 5.3' },
  { key: 'رقم الموديل', val: 'MRX33AB/A' },
]

const METERS = [
  { key: 'حالة الهيكل',  val: 95 },
  { key: 'حالة الشاشة',  val: 98 },
  { key: 'صحة البطارية', val: 91 },
  { key: 'أداء المعالج', val: 100 },
]

const THUMBS = ['FRONT', 'BACK', 'SIDE', 'PORT', 'OPEN']
const VIEWS  = ['حقيقي', 'X-Ray', 'تفكيك', 'الحالة']

const PHASES = [
  { num: '01', name: 'الهوية' },
  { num: '02', name: 'العرض البصري' },
  { num: '03', name: 'الفحص التقني' },
  { num: '04', name: 'الثقة والتحقق' },
  { num: '05', name: 'الشراء' },
]

const LAYER_LABELS = ['IDENTITY', 'VISUAL', 'INSPECTION', 'TRUST', 'PURCHASE']

// ─── Layer 2 data ──────────────────────────────────────────────────────────────

const THUMB_AR: Record<string, string> = {
  FRONT: 'الواجهة الأمامية',
  BACK:  'الواجهة الخلفية',
  SIDE:  'الجانب',
  PORT:  'المنافذ',
  OPEN:  'مفتوح',
}

const VIEW_INFO = [
  { typeAr: 'المنظر الحقيقي', typeEn: 'Real View',      countAr: '12 صورة',  countEn: 'High Resolution',  statusAr: 'موثق ✓',  statusEn: 'XA Verified'      },
  { typeAr: 'مسح X-Ray',       typeEn: 'X-Ray Scan',    countAr: '6 طبقات',  countEn: 'Internal Layers',  statusAr: 'مفعّل ✓', statusEn: 'Scan Active'      },
  { typeAr: 'تفكيك كامل',      typeEn: 'Full Teardown',  countAr: '9 مكونات', countEn: 'Component Parts',  statusAr: 'موثق ✓',  statusEn: 'XA Verified'      },
  { typeAr: 'فحص الحالة',      typeEn: 'Condition Check', countAr: '5 معايير', countEn: 'Quality Metrics', statusAr: 'أصلي ✓',  statusEn: 'Verified Original' },
]

// Condition badge: 'original' | 'premium' | 'used'
const PRODUCT_CONDITION = { type: 'original', label: 'أصلي', en: 'ORIGINAL' } as const

const CONDITION_ITEMS = [
  { label: 'الهيكل',   labelEn: 'Body',        score: 95 },
  { label: 'الشاشة',   labelEn: 'Display',     score: 98 },
  { label: 'البطارية', labelEn: 'Battery',     score: 91 },
  { label: 'الأداء',   labelEn: 'Performance', score: 100 },
  { label: 'المنافذ',  labelEn: 'Ports',       score: 100 },
]

const XRAY_COMPONENTS = [
  { id: 'cpu',  name: 'Apple M3',    val: '8-Core CPU', side: 'right', row: 'top' },
  { id: 'ram',  name: 'Unified RAM', val: '16 GB',      side: 'left',  row: 'top' },
  { id: 'ssd',  name: 'NVMe SSD',    val: '512 GB',     side: 'right', row: 'mid' },
  { id: 'bat',  name: 'Battery',     val: '72.4 Whr',   side: 'left',  row: 'mid' },
  { id: 'cam',  name: 'FaceTime HD', val: '1080p',      side: 'right', row: 'bot' },
  { id: 'wifi', name: 'Wi-Fi 6E',    val: 'BT 5.3',     side: 'left',  row: 'bot' },
]

const TEARDOWN_PARTS = [
  { id: '01', name: 'M3 SoC',      ar: 'المعالج الرئيسي' },
  { id: '02', name: 'Logic Board', ar: 'اللوحة الأم'      },
  { id: '03', name: 'Battery',     ar: 'البطارية'          },
  { id: '04', name: 'Display',     ar: 'الشاشة'            },
  { id: '05', name: 'Top Case',    ar: 'الغطاء العلوي'    },
  { id: '06', name: 'Bottom Case', ar: 'الغطاء السفلي'    },
  { id: '07', name: 'Fans ×2',     ar: 'مراوح التبريد'    },
  { id: '08', name: 'I/O Board',   ar: 'لوحة المنافذ'     },
  { id: '09', name: 'Speakers',    ar: 'السماعات'          },
]

// ─── Page ──────────────────────────────────────────────────────────────────────

const PRODUCT_ITEM = {
  id:    'A2-1500-K2376H-01',
  name:  'MacBook Pro M3 14"',
  price: PRICE,
  image: '',
  sku:   'MRX33AB/A',
}

export default function ProductPage() {
  const router = useRouter()

  const [qty,         setQty]         = useState(1)
  const [activeLayer, setActiveLayer] = useState(1)
  const [activeThumb, setActiveThumb] = useState(0)
  const [activeView,  setActiveView]  = useState(0)

  const layerRefs = useRef<(HTMLDivElement | null)[]>(Array(5).fill(null))

  function saveToCart(quantity: number) {
    const raw  = localStorage.getItem('cart')
    const cart: any[] = raw ? JSON.parse(raw) : []
    const idx  = cart.findIndex((i: any) => i.id === PRODUCT_ITEM.id)
    if (idx >= 0) {
      cart[idx].quantity = cart[idx].quantity + quantity
    } else {
      cart.push({ ...PRODUCT_ITEM, quantity })
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('storage'))
  }

  function handleAddToCart() {
    saveToCart(qty)
    router.push('/cart')
  }

  function handleBuyNow() {
    saveToCart(qty)
    router.push('/cart')
  }

  function scrollToLayer(n: number) {
    layerRefs.current[n - 1]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActiveLayer(n)
  }

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const idx = layerRefs.current.indexOf(e.target as HTMLDivElement)
            if (idx >= 0) setActiveLayer(idx + 1)
          }
        })
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    )
    layerRefs.current.forEach(r => r && obs.observe(r))
    return () => obs.disconnect()
  }, [])

  const total = qty * PRICE

  return (
    <div dir="rtl">
      {/* ── Embedded product-page styles ─────────────────────── */}
      <style dangerouslySetInnerHTML={{ __html: PRODUCT_CSS }} />

      {/* ── NAV ──────────────────────────────────────────────── */}
      <nav className="prod-nav">
        <span className="prod-logo">XAVOV</span>
        <div className="prod-nav-path">
          <span>المتجر</span>
          <span className="prod-nav-sep">·</span>
          <span>جناح A</span>
          <span className="prod-nav-sep">·</span>
          <span>اللابتوبات</span>
          <span className="prod-nav-sep">·</span>
          <span className="prod-nav-cur">عرض المنتج</span>
        </div>
        <Link href="/store" className="prod-nav-back">→ العودة للمتجر</Link>
      </nav>

      {/* ── LAYER INDICATOR ──────────────────────────────────── */}
      <div className="layer-indicator">
        {[1, 2, 3, 4, 5].map((n, i) => (
          <Fragment key={n}>
            {i > 0 && <div className="layer-line" />}
            <div
              className={`layer-dot${activeLayer === n ? ' active' : ''}`}
              data-label={LAYER_LABELS[i]}
              onClick={() => scrollToLayer(n)}
            />
          </Fragment>
        ))}
      </div>

      {/* ── PRODUCT PAGE ─────────────────────────────────────── */}
      <div className="product-page">

        {/* PHASE BAR */}
        <div style={{ padding: '80px 80px 0' }}>
          <div className="phase-bar">
            {PHASES.map((p, i) => (
              <div
                key={p.num}
                className={`phase-item${activeLayer === i + 1 ? ' active' : ''}`}
                onClick={() => scrollToLayer(i + 1)}
              >
                <div className="phase-num">{p.num}</div>
                <div className="phase-name">{p.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ LAYER 1 — IDENTITY ═══ */}
        <div
          className="layer layer-1"
          id="layer-1"
          ref={el => { layerRefs.current[0] = el }}
        >
          <div className="layer-num">01</div>
          <div className="layer-tag">هوية المنتج</div>
          <div className="l1-grid">
            <div className="l1-left">
              <div className="l1-codes">
                <div className="l1-code">A2 · 1500</div>
                <div className="l1-type type-original">أصلي · ORIGINAL</div>
              </div>
              <h1 className="l1-name">لابتوب MacBook Pro M3</h1>
              <p className="l1-name-en">Apple MacBook Pro M3 — 14 inch</p>
              <div className="l1-divider" />
              <p className="l1-summary">
                لابتوب احترافي من Apple بمعالج M3 الجديد — مفحوص ومعتمد من قِبل XAVOV. أداء استثنائي مع بطارية تدوم حتى 18 ساعة. متوفر بضمان سنة كاملة.
              </p>
            </div>
            <div className="l1-right">
              <div className="l1-price-lbl">السعر الإجمالي</div>
              <div className="l1-price">4,299</div>
              <div className="l1-price-cur">ريال سعودي · SAR</div>
              <div className="l1-price-compare">
                <span className="l1-compare-lbl">السعر الأصلي</span>
                <span className="l1-compare-val">5,800 SAR</span>
                <span className="l1-compare-save">وفّر 26%</span>
              </div>
              <div className="l1-status-row">
                <div className="status-dot" />
                <span className="l1-status-txt">متاح — 3 وحدات متبقية</span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ LAYER 2 — VISUAL ═══ */}
        <div
          className="layer layer-2"
          id="layer-2"
          ref={el => { layerRefs.current[1] = el }}
        >
          <div className="layer-num">02</div>
          <div className="layer-tag">العرض البصري</div>
          <div className="l2-grid">

            {/* ── Thumbnail strip ──────────────────────────────── */}
            <div className="l2-thumbs">
              {THUMBS.map((t, i) => (
                <div
                  key={t}
                  className={`l2-thumb${activeThumb === i ? ' active' : ''}`}
                  onClick={() => setActiveThumb(i)}
                >
                  <div className="l2-thumb-inner">
                    <span className="l2-thumb-lbl">{t}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Main image — mode-dependent ──────────────────── */}
            <div className={`l2-main${
              activeView === 1 ? ' l2-mode-xray'
              : activeView === 2 ? ' l2-mode-teardown'
              : activeView === 3 ? ' l2-mode-condition'
              : ''
            }`}>
              <div className="l2-main-bg" />
              <div className="l2-corner tl" />
              <div className="l2-corner tr" />
              <div className="l2-corner bl" />
              <div className="l2-corner br" />

              {/* Zoom / inspect hint — visible on hover for non-condition modes */}
              {activeView < 3 && (
                <div className="l2-zoom-hint">
                  <span className="l2-zoom-hint-dot" />
                  <span className="l2-zoom-hint-lbl">INSPECT</span>
                </div>
              )}

              {/* Real View */}
              {activeView === 0 && (
                <div className="l2-main-placeholder">
                  <span className="l2-view-thumb-lbl">{THUMB_AR[THUMBS[activeThumb]]}</span>
                  <div className="l2-main-ico">◻</div>
                  <div className="l2-main-lbl">PRODUCT IMAGE AREA</div>
                </div>
              )}

              {/* X-Ray */}
              {activeView === 1 && (
                <div className="l2-xray-wrap">
                  <div className="l2-xray-grid" />
                  <div className="l2-xray-scan" />
                  <div className="l2-xray-core">
                    <span className="l2-xray-core-ico">⬡</span>
                    <span className="l2-xray-core-lbl">M3 · SoC</span>
                  </div>
                  {XRAY_COMPONENTS.map(c => (
                    <div key={c.id} className={`l2-xray-label xr-${c.side}-${c.row}`}>
                      <span className="l2-xray-dot" />
                      <span className="l2-xray-name">{c.name}</span>
                      <span className="l2-xray-val">{c.val}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Teardown */}
              {activeView === 2 && (
                <div className="l2-teardown-wrap">
                  {TEARDOWN_PARTS.map(p => (
                    <div key={p.id} className="l2-part-chip">
                      <span className="l2-part-id">{p.id}</span>
                      <span className="l2-part-name">{p.name}</span>
                      <span className="l2-part-ar">{p.ar}</span>
                      <span className="l2-part-ok">✓</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Condition */}
              {activeView === 3 && (
                <div className="l2-condition-wrap">
                  <div className={`l2-cond-badge l2-cond-${PRODUCT_CONDITION.type}`}>
                    <div className="l2-cond-pulse" />
                    <div className="l2-cond-pulse l2-cond-pulse-2" />
                    <span className="l2-cond-label">{PRODUCT_CONDITION.label}</span>
                    <span className="l2-cond-label-en">{PRODUCT_CONDITION.en}</span>
                  </div>
                  <div className="l2-cond-items">
                    {CONDITION_ITEMS.map(c => (
                      <div key={c.label} className="l2-cond-item">
                        <span className="l2-cond-item-lbl">{c.label}</span>
                        <div className="l2-cond-bar-wrap">
                          <div className="l2-cond-bar-fill" style={{ width: `${c.score}%` }} />
                        </div>
                        <span className="l2-cond-item-val">{c.score}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dynamic badge */}
              <div className="l2-view-badge">
                {activeView === 0 ? 'REAL VIEW · المنظر الحقيقي'
                  : activeView === 1 ? 'X-RAY SCAN · مسح أشعة إكس'
                  : activeView === 2 ? 'TEARDOWN · تفكيك المنتج'
                  : 'CONDITION · فحص الحالة'}
              </div>
            </div>

            {/* ── Right info panel — updates per mode ──────────── */}
            <div className="l2-info">
              <div className="l2-info-card">
                <div className="l2-info-lbl">نوع العرض</div>
                <div className="l2-info-val">{VIEW_INFO[activeView].typeAr}</div>
                <div className="l2-info-sub">{VIEW_INFO[activeView].typeEn}</div>
              </div>
              <div className="l2-info-card">
                <div className="l2-info-lbl">المحتوى</div>
                <div className="l2-info-val">{VIEW_INFO[activeView].countAr}</div>
                <div className="l2-info-sub">{VIEW_INFO[activeView].countEn}</div>
              </div>
              <div className="l2-info-card">
                <div className="l2-info-lbl">حالة التوثيق</div>
                <div className="l2-info-val" style={{ color: '#2ECC71' }}>{VIEW_INFO[activeView].statusAr}</div>
                <div className="l2-info-sub">{VIEW_INFO[activeView].statusEn}</div>
              </div>
              <div className="l2-views-row">
                {VIEWS.map((v, i) => (
                  <div
                    key={v}
                    className={`l2-view-btn${activeView === i ? ' active' : ''}`}
                    onClick={() => setActiveView(i)}
                  >
                    {v}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ═══ LAYER 3 — INSPECTION ═══ */}
        <div
          className="layer layer-3"
          id="layer-3"
          ref={el => { layerRefs.current[2] = el }}
        >
          <div className="layer-num">03</div>
          <div className="layer-tag">الفحص التقني</div>
          <div className="l3-grid">
            <div className="l3-card">
              <div className="l3-card-title">المواصفات الأساسية</div>
              {SPECS_PRIMARY.map(s => (
                <div key={s.key} className="l3-spec">
                  <span className="l3-spec-key">{s.key}</span>
                  <span className="l3-spec-val">{s.val}</span>
                </div>
              ))}
            </div>
            <div className="l3-card">
              <div className="l3-card-title">تفاصيل إضافية</div>
              {SPECS_EXTRA.map(s => (
                <div key={s.key} className="l3-spec">
                  <span className="l3-spec-key">{s.key}</span>
                  <span className="l3-spec-val">{s.val}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="l3-condition">
            <div className="l3-condition-title">تقرير الحالة</div>
            {METERS.map(m => (
              <div key={m.key} className="l3-meter">
                <div className="l3-meter-lbl">
                  <span className="l3-meter-key">{m.key}</span>
                  <span className="l3-meter-val">{m.val}%</span>
                </div>
                <div className="l3-meter-bar">
                  <div className="l3-meter-fill" style={{ width: `${m.val}%` }} />
                </div>
              </div>
            ))}
            <div className="l3-note">
              <div className="l3-note-lbl">ملاحظة الفاحص</div>
              <div className="l3-note-txt">
                الجهاز في حالة ممتازة — لا يوجد أي خدوش ظاهرة. تم الفحص الكامل بتاريخ 10/10/1447 وأُقر للبيع داخل XAVOV.
              </div>
            </div>
          </div>
        </div>

        {/* ═══ LAYER 4 — TRUST ═══ */}
        <div
          className="layer layer-4"
          id="layer-4"
          ref={el => { layerRefs.current[3] = el }}
        >
          <div className="layer-num">04</div>
          <div className="layer-tag">الثقة والتحقق</div>
          <div className="l4-grid">
            <div className="trust-card">
              <span className="trust-ico">✓</span>
              <div className="trust-status trust-verified">معتمد XAVOV</div>
              <div className="trust-title">فحص XAVOV</div>
              <div className="trust-sub">فُحص هذا المنتج وأُقر من فريق XAVOV قبل النشر</div>
            </div>
            <div className="trust-card">
              <span className="trust-ico">⬡</span>
              <div className="trust-status trust-active">ساري المفعول</div>
              <div className="trust-title">ضمان المنتج</div>
              <div className="trust-sub">ضمان سنة كاملة — قابل للتمديد</div>
            </div>
            <div className="trust-card">
              <span className="trust-ico">◎</span>
              <div className="trust-status trust-verified">موثق</div>
              <div className="trust-title">توثيق XAVOV</div>
              <div className="trust-sub">مورد معتمد ومُدقق من فريق XAVOV</div>
            </div>
          </div>
          <div className="l4-serial">
            <div className="l4-serial-title">الكود التسلسلي الداخلي · INTERNAL REFERENCE</div>
            <div className="l4-serial-code">A-A2-1500-K2376H-01</div>
            <div className="l4-serial-note">
              <div className="l4-serial-dot" />
              هذا الكود خاص بهذه الوحدة فقط — يُستخدم في حالات الإرجاع والضمان
            </div>
          </div>
        </div>

        {/* ═══ LAYER 5 — PURCHASE ═══ */}
        <div
          className="layer layer-5"
          id="layer-5"
          ref={el => { layerRefs.current[4] = el }}
        >
          <div className="layer-num">05</div>
          <div className="layer-tag">الشراء</div>
          <div className="l5-grid">

            <div className="l5-left">
              <div className="l5-summary-title">ملخص الطلب · ORDER SUMMARY</div>
              <div className="l5-summary-items">
                <div className="l5-sum-item"><span className="l5-sum-key">المنتج</span><span className="l5-sum-val">MacBook Pro M3 14"</span></div>
                <div className="l5-sum-item"><span className="l5-sum-key">الجناح · النافذة</span><span className="l5-sum-val">A · A2</span></div>
                <div className="l5-sum-item"><span className="l5-sum-key">النوع</span><span className="l5-sum-val">أصلي · ORIGINAL</span></div>
                <div className="l5-sum-item"><span className="l5-sum-key">الحالة</span><span className="l5-sum-val">ممتازة — 95%+</span></div>
                <div className="l5-sum-item"><span className="l5-sum-key">الضمان</span><span className="l5-sum-val">12 شهر</span></div>
                <div className="l5-sum-item"><span className="l5-sum-key">سعر الوحدة</span><span className="l5-sum-val gold">4,299 SAR</span></div>
              </div>
              <div className="l5-action-row">
                <div className="l5-action-btn">⬡ &nbsp; حفظ للمقارنة</div>
                <div className="l5-action-btn">◎ &nbsp; إضافة للمفضلة</div>
                <div className="l5-action-btn">⊹ &nbsp; مشاركة</div>
              </div>
            </div>

            <div className="l5-right">
              <div className="l5-buy-card">
                <div className="l5-buy-accent" />
                <div className="l5-qty-lbl">الكمية · QUANTITY</div>
                <div className="l5-qty-row">
                  <button className="l5-qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                  <input className="l5-qty-val" value={qty} readOnly />
                  <button className="l5-qty-btn" onClick={() => setQty(q => Math.min(10, q + 1))}>+</button>
                </div>
                <div className="l5-total-lbl">الإجمالي · TOTAL</div>
                <div className="l5-total">{total.toLocaleString('ar-SA')}</div>
                <div className="l5-total-cur">ريال سعودي · SAR</div>
                <button className="l5-cart-btn" onClick={handleAddToCart}>إضافة للسلة ← Add to Cart</button>
                <button className="l5-save-btn" onClick={handleBuyNow}>⬡ &nbsp; شراء الآن · Buy Now</button>
                <div className="l5-guarantee">
                  <span className="l5-guarantee-ico">✓</span>
                  <span className="l5-guarantee-txt">مضمون بواسطة XAVOV — حق الإرجاع خلال 5 أيام من الاستلام</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="prod-footer">
        <span className="foot-logo">XAVOV</span>
        <span className="foot-r">عرض المنتج · Five-Layer Display · XA STORE</span>
      </footer>
    </div>
  )
}

// ─── Styles (scoped to product page, copied faithfully from xa-product.html) ──

const PRODUCT_CSS = `
:root { --gold-light: #E8C97A; }

/* NAV override */
.prod-nav {
  position:fixed;top:0;left:0;right:0;z-index:999;height:64px;
  display:flex;align-items:center;justify-content:space-between;padding:0 48px;
  background:rgba(2,4,10,0.94);border-bottom:1px solid var(--gold-b);backdrop-filter:blur(24px);
}
.prod-logo { font-family:'Cormorant Garamond',serif;font-size:20px;color:var(--gold);letter-spacing:5px;font-weight:600; }
.prod-nav-path { display:flex;align-items:center;gap:8px;font-size:11px;color:var(--muted);letter-spacing:0.5px; }
.prod-nav-sep  { color:var(--gold-b2);font-size:10px; }
.prod-nav-cur  { color:var(--text2); }
.prod-nav-back { font-size:11.5px;color:var(--muted);letter-spacing:1px;transition:color 0.2s;display:flex;align-items:center;gap:6px;text-decoration:none; }
.prod-nav-back:hover { color:var(--text); }

/* LAYER INDICATOR */
.layer-indicator {
  position:fixed;left:28px;top:50%;transform:translateY(-50%);
  z-index:100;display:flex;flex-direction:column;gap:16px;align-items:center;
}
.layer-dot { width:6px;height:6px;border-radius:50%;background:var(--muted);cursor:pointer;transition:all 0.3s;position:relative; }
.layer-dot.active { background:var(--gold);box-shadow:0 0 8px rgba(201,168,76,0.5); }
.layer-dot::after {
  content:attr(data-label);
  position:absolute;right:16px;top:50%;transform:translateY(-50%);
  font-size:9px;letter-spacing:2px;color:var(--muted);white-space:nowrap;
  opacity:0;transition:opacity 0.2s;font-family:'Cormorant Garamond',serif;
}
.layer-dot:hover::after { opacity:1; }
.layer-dot.active::after { opacity:1;color:var(--gold); }
.layer-line { width:1px;height:20px;background:var(--gold-b); }

/* MAIN LAYOUT */
.product-page { padding:64px 0 80px;position:relative;z-index:1; }

/* LAYER COMMONS */
.layer {
  padding:56px 80px;
  border-bottom:1px solid var(--gold-b);
  position:relative;
}
.layer-num {
  position:absolute;top:52px;left:48px;
  font-family:'Cormorant Garamond',serif;
  font-size:80px;color:var(--gold);font-weight:300;
  line-height:1;opacity:0.06;user-select:none;
}
.layer-tag {
  display:inline-flex;align-items:center;gap:8px;
  padding:4px 14px;border:1px solid var(--gold-b);
  font-family:'Cormorant Garamond',serif;font-size:9px;
  letter-spacing:4px;color:rgba(201,168,76,0.5);
  margin-bottom:36px;
}
.layer-tag-dot { width:3px;height:3px;background:var(--gold);border-radius:50%;opacity:0.5; }

/* LAYER 1 — IDENTITY */
.layer-1 {
  background:
    radial-gradient(ellipse 70% 80% at 70% 50%,rgba(201,168,76,0.04) 0%,transparent 65%),
    var(--bg2);
}
.l1-grid { display:grid;grid-template-columns:1fr 360px;gap:56px;align-items:start; }
.l1-codes { display:flex;align-items:center;gap:16px;margin-bottom:20px; }
.l1-code {
  font-family:'Cormorant Garamond',serif;font-size:11px;letter-spacing:3px;
  color:var(--muted);padding:4px 12px;border:1px solid var(--gold-b);
}
.l1-type { font-size:10px;letter-spacing:3px;padding:4px 12px;font-family:'Cormorant Garamond',serif; }
.type-original { background:rgba(46,204,113,0.08);color:#2ECC71;border:1px solid rgba(46,204,113,0.25); }
.type-alt      { background:rgba(201,168,76,0.08);color:var(--gold);border:1px solid var(--gold-b); }
.type-refurb   { background:rgba(52,152,219,0.08);color:#5DADE2;border:1px solid rgba(52,152,219,0.25); }
.l1-name       { font-size:clamp(28px,3.5vw,44px);font-weight:700;letter-spacing:0.3px;margin-bottom:8px;line-height:1.15; }
.l1-name-en    { font-family:'Cormorant Garamond',serif;font-size:16px;color:var(--muted);font-style:italic;letter-spacing:2px;margin-bottom:24px; }
.l1-divider    { height:1px;background:linear-gradient(90deg,var(--gold-b2),transparent);margin-bottom:24px; }
.l1-summary    { font-size:14px;color:var(--text2);line-height:1.85;max-width:560px; }
.l1-right {
  border:1px solid var(--gold-b);background:var(--surface);padding:32px;
  position:sticky;top:80px;
}
.l1-price-lbl    { font-size:10px;letter-spacing:3px;color:var(--muted);margin-bottom:8px;font-family:'Cormorant Garamond',serif; }
.l1-price        { font-family:'Cormorant Garamond',serif;font-size:52px;color:var(--gold);font-weight:300;line-height:1;margin-bottom:4px; }
.l1-price-cur    { font-size:14px;color:var(--muted);letter-spacing:2px;margin-bottom:20px; }
.l1-price-compare { display:flex;align-items:center;gap:8px;margin-bottom:24px; }
.l1-compare-lbl  { font-size:10px;color:var(--muted);letter-spacing:1px; }
.l1-compare-val  { font-size:13px;color:var(--muted);text-decoration:line-through;opacity:0.6; }
.l1-compare-save { font-size:10px;color:#2ECC71;letter-spacing:1px;padding:2px 8px;background:rgba(46,204,113,0.08);border:1px solid rgba(46,204,113,0.2); }
.l1-status-row   { display:flex;align-items:center;gap:8px;padding:10px 0;border-top:1px solid var(--gold-b); }
.status-dot      { width:5px;height:5px;border-radius:50%;background:#2ECC71;flex-shrink:0; }
.l1-status-txt   { font-size:12px;color:var(--text2); }

/* LAYER 2 — VISUAL */
.layer-2 { background:var(--bg); }
.l2-grid { display:grid;grid-template-columns:80px 1fr 280px;gap:20px;align-items:start; }
.l2-thumbs { display:flex;flex-direction:column;gap:10px; }
.l2-thumb {
  width:80px;height:80px;border:1px solid var(--gold-b);
  background:var(--surface);cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  transition:border-color 0.25s;position:relative;overflow:hidden;
}
.l2-thumb.active { border-color:var(--gold); }
.l2-thumb:hover  { border-color:var(--gold-b2); }
.l2-thumb-inner  { width:100%;height:100%;background:linear-gradient(135deg,var(--surface2),var(--surface3));display:flex;align-items:center;justify-content:center; }
.l2-thumb-lbl    { font-family:'Cormorant Garamond',serif;font-size:9px;letter-spacing:2px;color:var(--muted); }
.l2-main {
  border:1px solid var(--gold-b);background:var(--surface);
  aspect-ratio:4/3;display:flex;align-items:center;justify-content:center;
  position:relative;overflow:hidden;
}
.l2-main-bg {
  position:absolute;inset:0;
  background:radial-gradient(ellipse 60% 60% at 50% 50%,rgba(201,168,76,0.04) 0%,transparent 70%);
}
.l2-main-placeholder { display:flex;flex-direction:column;align-items:center;gap:16px;position:relative;z-index:1; }
.l2-main-ico  { font-family:'Cormorant Garamond',serif;font-size:72px;color:var(--gold);opacity:0.15;line-height:1; }
.l2-main-lbl  { font-family:'Cormorant Garamond',serif;font-size:10px;letter-spacing:4px;color:var(--muted); }
.l2-corner    { position:absolute;width:20px;height:20px;border-color:var(--gold);border-style:solid;opacity:0.4; }
.l2-corner.tl { top:16px;right:16px;border-width:1px 1px 0 0; }
.l2-corner.tr { top:16px;left:16px;border-width:1px 0 0 1px; }
.l2-corner.bl { bottom:16px;right:16px;border-width:0 1px 1px 0; }
.l2-corner.br { bottom:16px;left:16px;border-width:0 0 1px 1px; }
.l2-view-badge {
  position:absolute;bottom:16px;right:16px;
  background:rgba(2,4,10,0.8);border:1px solid var(--gold-b);
  padding:4px 12px;font-size:9px;letter-spacing:3px;color:var(--gold);
  font-family:'Cormorant Garamond',serif;backdrop-filter:blur(8px);
}
.l2-info      { display:flex;flex-direction:column;gap:10px; }
.l2-info-card { border:1px solid var(--gold-b);background:var(--surface);padding:18px 20px; }
.l2-info-lbl  { font-size:9px;letter-spacing:3px;color:var(--muted);margin-bottom:6px;font-family:'Cormorant Garamond',serif; }
.l2-info-val  { font-size:14px;font-weight:600;color:var(--text); }
.l2-info-sub  { font-size:11px;color:var(--muted);margin-top:2px; }
.l2-views-row { display:flex;gap:8px;margin-top:20px; }
.l2-view-btn  {
  flex:1;padding:10px 8px;border:1px solid var(--gold-b);
  background:transparent;font-size:10px;letter-spacing:1.5px;
  color:var(--muted);font-family:'Cormorant Garamond',serif;
  cursor:pointer;transition:all 0.25s;text-align:center;
}
.l2-view-btn:hover  { border-color:var(--gold-b2);color:var(--gold); }
.l2-view-btn.active { border-color:var(--gold);color:var(--gold);background:var(--gold-glow); }

/* LAYER 3 — INSPECTION */
.layer-3 { background:var(--surface); }
.l3-grid { display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:24px; }
.l3-card { border:1px solid var(--gold-b);background:var(--bg2);padding:28px; }
.l3-card-title { font-size:11px;letter-spacing:3px;color:var(--gold);font-family:'Cormorant Garamond',serif;margin-bottom:20px;display:flex;align-items:center;gap:8px; }
.l3-card-title::after { content:'';flex:1;height:1px;background:var(--gold-b); }
.l3-spec        { display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid rgba(201,168,76,0.06); }
.l3-spec:last-child { border-bottom:none; }
.l3-spec-key    { font-size:12px;color:var(--muted); }
.l3-spec-val    { font-size:12.5px;color:var(--text2);font-weight:600;text-align:left; }
.l3-condition   { border:1px solid var(--gold-b);background:var(--bg2);padding:28px; }
.l3-condition-title { font-size:11px;letter-spacing:3px;color:var(--gold);font-family:'Cormorant Garamond',serif;margin-bottom:20px;display:flex;align-items:center;gap:8px; }
.l3-condition-title::after { content:'';flex:1;height:1px;background:var(--gold-b); }
.l3-meter       { margin-bottom:16px; }
.l3-meter-lbl   { display:flex;align-items:center;justify-content:space-between;margin-bottom:6px; }
.l3-meter-key   { font-size:12px;color:var(--muted); }
.l3-meter-val   { font-size:12px;color:var(--gold); }
.l3-meter-bar   { height:3px;background:var(--surface2);border-radius:0;overflow:hidden; }
.l3-meter-fill  { height:100%;background:linear-gradient(90deg,var(--gold),var(--gold-light));transition:width 0.5s; }
.l3-note        { border-right:2px solid var(--gold);padding:12px 16px;background:var(--gold-glow);margin-top:20px; }
.l3-note-lbl    { font-size:9px;letter-spacing:3px;color:var(--gold);margin-bottom:4px;font-family:'Cormorant Garamond',serif; }
.l3-note-txt    { font-size:12.5px;color:var(--text2);line-height:1.7; }

/* LAYER 4 — TRUST */
.layer-4   { background:var(--bg2); }
.l4-grid   { display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:24px; }
.trust-card {
  border:1px solid var(--gold-b);background:var(--surface);padding:28px 24px;
  text-align:center;position:relative;overflow:hidden;transition:border-color 0.3s;
}
.trust-card:hover { border-color:var(--gold-b2); }
.trust-card::before { content:'';position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 50% 0%,rgba(201,168,76,0.04) 0%,transparent 70%);pointer-events:none; }
.trust-ico      { font-family:'Cormorant Garamond',serif;font-size:32px;color:var(--gold);margin-bottom:14px;display:block;line-height:1;opacity:0.7; }
.trust-status   { font-size:10px;letter-spacing:3px;margin-bottom:8px;padding:3px 12px;display:inline-block; }
.trust-verified { background:rgba(46,204,113,0.08);color:#2ECC71;border:1px solid rgba(46,204,113,0.22); }
.trust-active   { background:rgba(201,168,76,0.08);color:var(--gold);border:1px solid var(--gold-b); }
.trust-title    { font-size:15px;font-weight:700;margin-bottom:4px; }
.trust-sub      { font-size:11px;color:var(--muted);line-height:1.6; }
.l4-serial      { border:1px solid var(--gold-b);background:var(--surface);padding:28px 32px; }
.l4-serial-title { font-size:10px;letter-spacing:4px;color:var(--muted);font-family:'Cormorant Garamond',serif;margin-bottom:16px; }
.l4-serial-code {
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(18px,2.5vw,26px);color:var(--gold);
  letter-spacing:6px;font-weight:300;
  border:1px solid var(--gold-b);background:var(--bg2);
  padding:16px 24px;display:inline-block;margin-bottom:12px;
}
.l4-serial-note { font-size:11px;color:var(--muted);display:flex;align-items:center;gap:6px; }
.l4-serial-dot  { width:3px;height:3px;background:var(--gold);border-radius:50%;opacity:0.4;flex-shrink:0; }

/* LAYER 5 — PURCHASE */
.layer-5 {
  background:linear-gradient(180deg,var(--surface) 0%,var(--bg) 100%);
  border-bottom:none;
}
.l5-grid { display:grid;grid-template-columns:1fr 400px;gap:48px;align-items:start; }
.l5-summary-title { font-size:14px;letter-spacing:2px;color:var(--muted);font-family:'Cormorant Garamond',serif;margin-bottom:20px; }
.l5-summary-items { display:flex;flex-direction:column;gap:0;margin-bottom:32px; }
.l5-sum-item { display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid rgba(201,168,76,0.06); }
.l5-sum-item:last-child { border-bottom:none; }
.l5-sum-key  { font-size:13px;color:var(--muted); }
.l5-sum-val  { font-size:13px;color:var(--text2);font-weight:600; }
.l5-sum-val.gold { color:var(--gold); }
.l5-action-row { display:flex;gap:8px; }
.l5-action-btn {
  flex:1;display:flex;align-items:center;justify-content:center;gap:8px;
  padding:11px 16px;font-size:12px;font-family:'Cairo',sans-serif;
  letter-spacing:0.5px;cursor:pointer;transition:all 0.25s;border:1px solid var(--gold-b);
  background:transparent;color:var(--muted);
}
.l5-action-btn:hover { border-color:var(--gold-b2);color:var(--text2); }
.l5-right    { position:sticky;top:80px; }
.l5-buy-card { border:1px solid var(--gold-b2);background:var(--surface);padding:36px;position:relative;overflow:hidden; }
.l5-buy-card::before { content:'';position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 50% 0%,rgba(201,168,76,0.05) 0%,transparent 65%);pointer-events:none; }
.l5-buy-accent { position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--gold),transparent); }
.l5-qty-lbl  { font-size:10px;letter-spacing:3px;color:var(--muted);font-family:'Cormorant Garamond',serif;margin-bottom:10px; }
.l5-qty-row  { display:flex;align-items:center;gap:0;margin-bottom:24px;border:1px solid var(--gold-b); }
.l5-qty-btn  { width:44px;height:44px;display:flex;align-items:center;justify-content:center;background:var(--surface2);color:var(--gold);font-size:18px;cursor:pointer;transition:background 0.2s;border:none;outline:none;font-family:'Cairo',sans-serif; }
.l5-qty-btn:hover { background:var(--surface3); }
.l5-qty-val  { flex:1;text-align:center;font-family:'Cormorant Garamond',serif;font-size:22px;color:var(--text);font-weight:300;background:transparent;border:none;outline:none;border-right:1px solid var(--gold-b);border-left:1px solid var(--gold-b); }
.l5-total-lbl { font-size:10px;letter-spacing:3px;color:var(--muted);font-family:'Cormorant Garamond',serif;margin-bottom:6px; }
.l5-total     { font-family:'Cormorant Garamond',serif;font-size:44px;color:var(--gold);font-weight:300;line-height:1;margin-bottom:4px; }
.l5-total-cur { font-size:12px;color:var(--muted);letter-spacing:2px;margin-bottom:24px; }
.l5-cart-btn {
  width:100%;padding:16px;
  background:var(--gold);color:var(--bg);
  font-size:14px;font-family:'Cairo',sans-serif;font-weight:700;
  letter-spacing:0.5px;cursor:pointer;
  border:none;transition:background 0.25s;margin-bottom:10px;
  display:flex;align-items:center;justify-content:center;gap:10px;
}
.l5-cart-btn:hover { background:var(--gold-light); }
.l5-save-btn {
  width:100%;padding:13px;
  background:transparent;color:var(--muted);
  font-size:13px;font-family:'Cairo',sans-serif;
  letter-spacing:0.5px;cursor:pointer;
  border:1px solid rgba(201,168,76,0.18);transition:all 0.25s;
  display:flex;align-items:center;justify-content:center;gap:8px;
}
.l5-save-btn:hover { border-color:var(--gold-b2);color:var(--text2); }
.l5-guarantee     { display:flex;align-items:center;gap:10px;margin-top:20px;padding:12px;border:1px solid rgba(46,204,113,0.15);background:rgba(46,204,113,0.04); }
.l5-guarantee-ico { font-size:16px;color:#2ECC71;flex-shrink:0; }
.l5-guarantee-txt { font-size:11px;color:var(--muted);line-height:1.5; }

/* PHASE BAR */
.phase-bar {
  display:flex;align-items:center;gap:0;
  max-width:900px;margin:0 auto 48px;
  border:1px solid var(--gold-b);background:var(--surface);
}
.phase-item {
  flex:1;padding:14px 12px;text-align:center;
  border-left:1px solid var(--gold-b);cursor:pointer;
  transition:background 0.25s;position:relative;
}
.phase-item:last-child { border-left:none; }
.phase-item:hover      { background:var(--surface2); }
.phase-item.active     { background:var(--gold-glow); }
.phase-item.active::after { content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:var(--gold); }
.phase-num             { font-family:'Cormorant Garamond',serif;font-size:11px;color:var(--muted);margin-bottom:3px;letter-spacing:1px; }
.phase-name            { font-size:11px;font-weight:600;color:var(--text2); }
.phase-item.active .phase-name { color:var(--gold); }
.phase-item.active .phase-num  { color:rgba(201,168,76,0.5); }

/* FOOTER override */
.prod-footer {
  border-top:1px solid var(--gold-b) !important;
  padding:28px 48px !important;
  display:flex !important;
  align-items:center !important;
  justify-content:space-between !important;
  text-align:unset !important;
  position:relative;z-index:1;
}
.foot-logo { font-family:'Cormorant Garamond',serif;font-size:16px;color:var(--gold);letter-spacing:4px; }
.foot-r    { font-size:10px;color:var(--muted);letter-spacing:1px; }

/* ════ LAYER 2 — VISUAL MODES ════ */

/* Background overrides per mode */
.l2-mode-xray     { background:#02080F; }
.l2-mode-teardown { background:var(--bg); }

/* ── Real View: Arabic thumb label ── */
.l2-view-thumb-lbl {
  font-family:'Cormorant Garamond',serif;
  font-size:9px;letter-spacing:4px;color:rgba(201,168,76,0.4);
  margin-bottom:16px;display:block;
}

/* ── X-Ray ── */
.l2-xray-wrap {
  position:absolute;inset:0;z-index:2;
  display:flex;align-items:center;justify-content:center;
}
.l2-xray-grid {
  position:absolute;inset:0;
  background-image:
    linear-gradient(rgba(0,180,160,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,180,160,0.04) 1px, transparent 1px);
  background-size:44px 44px;
}
.l2-xray-scan {
  position:absolute;left:0;right:0;height:1px;z-index:3;pointer-events:none;
  background:linear-gradient(90deg,transparent 0%,rgba(0,200,180,0.55) 25%,rgba(0,200,180,1) 50%,rgba(0,200,180,0.55) 75%,transparent 100%);
  animation:xray-scan 3.6s ease-in-out infinite;
}
@keyframes xray-scan {
  0%   { top:8%;  opacity:0; }
  6%   { opacity:1; }
  92%  { opacity:1; }
  100% { top:92%; opacity:0; }
}
.l2-xray-core {
  position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
  width:72px;height:72px;z-index:4;
  border:1px solid rgba(0,200,180,0.2);
  background:radial-gradient(ellipse 80% 80% at 50% 50%,rgba(0,200,180,0.05) 0%,transparent 70%);
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;
}
.l2-xray-core-ico {
  font-family:'Cormorant Garamond',serif;
  font-size:22px;color:rgba(0,200,180,0.3);line-height:1;
}
.l2-xray-core-lbl {
  font-family:'Cormorant Garamond',serif;
  font-size:8px;letter-spacing:3px;color:rgba(0,200,180,0.3);
}
.l2-xray-label {
  position:absolute;z-index:5;
  display:flex;flex-direction:column;gap:3px;pointer-events:none;
}
.l2-xray-dot {
  width:4px;height:4px;border-radius:50%;
  background:rgba(0,200,180,0.6);
  box-shadow:0 0 6px rgba(0,200,180,0.35);
  display:block;margin-bottom:2px;
}
.l2-xray-name {
  font-family:'Cormorant Garamond',serif;
  font-size:9px;letter-spacing:2px;color:rgba(0,200,180,0.5);white-space:nowrap;
}
.l2-xray-val {
  font-size:10.5px;font-weight:600;color:rgba(0,200,180,0.85);white-space:nowrap;
}
/* Label positions */
.xr-right-top { right:6%;top:14%;text-align:right; }
.xr-left-top  { left:6%; top:14%; }
.xr-right-mid { right:6%;top:50%;transform:translateY(-50%);text-align:right; }
.xr-left-mid  { left:6%; top:50%;transform:translateY(-50%); }
.xr-right-bot { right:6%;bottom:14%;text-align:right; }
.xr-left-bot  { left:6%; bottom:14%; }
/* Flip dot to right-align for right-side labels */
.xr-right-top .l2-xray-dot,
.xr-right-mid .l2-xray-dot,
.xr-right-bot .l2-xray-dot { margin-left:auto;margin-right:0; }

/* ── Teardown ── */
.l2-teardown-wrap {
  position:absolute;inset:0;z-index:2;
  display:grid;grid-template-columns:repeat(3,1fr);
  gap:1px;background:var(--gold-b);
}
.l2-part-chip {
  background:var(--bg2);padding:14px 16px;
  display:flex;flex-direction:column;gap:3px;
  transition:background 0.25s;cursor:default;
}
.l2-part-chip:hover { background:var(--surface2); }
.l2-part-id   { font-family:'Cormorant Garamond',serif;font-size:9px;letter-spacing:3px;color:rgba(201,168,76,0.32); }
.l2-part-name { font-size:11px;font-weight:600;color:var(--text2);letter-spacing:0.3px; }
.l2-part-ar   { font-size:11px;color:var(--muted); }
.l2-part-ok   { font-size:9px;color:#2ECC71;letter-spacing:1px;margin-top:2px; }

/* ════ INSPECT MODE — hover zoom ════ */

/* Cursor */
.l2-main                { cursor:zoom-in; }
.l2-mode-condition      { cursor:default; }

/* Scale targets get a smooth transition */
.l2-main-placeholder,
.l2-xray-wrap,
.l2-teardown-wrap {
  transition:transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94);
}
/* Scale amounts per mode */
.l2-main:hover .l2-main-placeholder { transform:scale(1.06); }
.l2-main:hover .l2-xray-wrap        { transform:scale(1.04); }
.l2-main:hover .l2-teardown-wrap    { transform:scale(1.03); }

/* Zoom hint chip — fades in on hover */
.l2-zoom-hint {
  position:absolute;top:14px;left:14px;z-index:20;
  display:flex;align-items:center;gap:5px;
  opacity:0;transition:opacity 0.3s;pointer-events:none;
}
.l2-zoom-hint-dot {
  width:4px;height:4px;border-radius:50%;
  background:rgba(201,168,76,0.55);
  box-shadow:0 0 6px rgba(201,168,76,0.35);
}
.l2-zoom-hint-lbl {
  font-family:'Cormorant Garamond',serif;
  font-size:9px;letter-spacing:3px;color:rgba(201,168,76,0.45);
}
.l2-main:hover .l2-zoom-hint { opacity:1; }

/* Ensure corners and badge always render above mode content */
.l2-corner    { z-index:8; }
.l2-view-badge { z-index:10; }

/* ════ CONDITION MODE ════ */

.l2-mode-condition { background:#020508;cursor:default; }

.l2-condition-wrap {
  position:absolute;inset:0;z-index:2;
  display:flex;flex-direction:column;
  align-items:center;justify-content:center;gap:36px;
}

/* Badge circle */
.l2-cond-badge {
  position:relative;
  width:128px;height:128px;border-radius:50%;
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;
  border:1px solid;
}

/* Condition color variants */
.l2-cond-original {
  background:radial-gradient(ellipse 70% 70% at 50% 50%,rgba(46,204,113,0.1) 0%,transparent 70%);
  border-color:rgba(46,204,113,0.35);
  box-shadow:0 0 40px rgba(46,204,113,0.06),inset 0 0 30px rgba(46,204,113,0.04);
}
.l2-cond-premium {
  background:radial-gradient(ellipse 70% 70% at 50% 50%,rgba(201,168,76,0.1) 0%,transparent 70%);
  border-color:rgba(201,168,76,0.35);
  box-shadow:0 0 40px rgba(201,168,76,0.06),inset 0 0 30px rgba(201,168,76,0.04);
}
.l2-cond-used {
  background:radial-gradient(ellipse 70% 70% at 50% 50%,rgba(192,57,43,0.1) 0%,transparent 70%);
  border-color:rgba(192,57,43,0.35);
  box-shadow:0 0 40px rgba(192,57,43,0.06),inset 0 0 30px rgba(192,57,43,0.04);
}

/* Pulse rings */
.l2-cond-pulse {
  position:absolute;inset:-14px;border-radius:50%;
  border:1px solid;animation:cond-pulse 2.6s ease-out infinite;
}
.l2-cond-pulse-2 { inset:-28px;animation-delay:1.3s; }

.l2-cond-original .l2-cond-pulse { border-color:rgba(46,204,113,0.3); }
.l2-cond-premium  .l2-cond-pulse { border-color:rgba(201,168,76,0.3); }
.l2-cond-used     .l2-cond-pulse { border-color:rgba(192,57,43,0.3); }

@keyframes cond-pulse {
  0%   { transform:scale(0.9);opacity:0.55; }
  100% { transform:scale(1.7);opacity:0; }
}

/* Badge text */
.l2-cond-label {
  font-size:19px;font-weight:700;letter-spacing:0.5px;line-height:1;
}
.l2-cond-label-en {
  font-family:'Cormorant Garamond',serif;
  font-size:8px;letter-spacing:4px;
}
.l2-cond-original .l2-cond-label    { color:#2ECC71; }
.l2-cond-original .l2-cond-label-en { color:rgba(46,204,113,0.55); }
.l2-cond-premium  .l2-cond-label    { color:var(--gold); }
.l2-cond-premium  .l2-cond-label-en { color:rgba(201,168,76,0.55); }
.l2-cond-used     .l2-cond-label    { color:#C0392B; }
.l2-cond-used     .l2-cond-label-en { color:rgba(192,57,43,0.55); }

/* Condition metric rows */
.l2-cond-items {
  display:flex;flex-direction:column;gap:11px;
  width:min(260px,55%);
}
.l2-cond-item {
  display:grid;grid-template-columns:76px 1fr 38px;
  align-items:center;gap:10px;
}
.l2-cond-item-lbl {
  font-size:11px;color:var(--muted);letter-spacing:0.3px;
}
.l2-cond-bar-wrap {
  height:2px;background:rgba(201,168,76,0.08);overflow:hidden;
}
.l2-cond-bar-fill {
  height:100%;
  background:linear-gradient(90deg,rgba(46,204,113,0.5),rgba(46,204,113,0.9));
  transition:width 0.7s cubic-bezier(0.25,0.46,0.45,0.94);
}
.l2-cond-item-val {
  font-family:'Cormorant Garamond',serif;
  font-size:10px;color:rgba(46,204,113,0.65);letter-spacing:1px;text-align:left;
}

/* ════ LUXURY REFINEMENT — system UI → cinematic experience ════ */

/* Phase bar: navigation whisper, not system widget */
.phase-bar {
  background:transparent;
  border:none;
  border-top:1px solid rgba(201,168,76,0.05);
  max-width:600px;
  margin-bottom:64px;
  padding-top:14px;
}
.phase-item {
  padding:0 12px 14px;
  border-left:none;
}
.phase-item:hover  { background:transparent; }
.phase-item.active { background:transparent; }
.phase-item.active::after { height:1px; background:rgba(201,168,76,0.28); }
.phase-num {
  font-size:8px;letter-spacing:2px;
  color:rgba(201,168,76,0.15);margin-bottom:5px;
}
.phase-name {
  font-size:10px;font-weight:400;letter-spacing:0.8px;
  color:rgba(234,226,210,0.18);
}
.phase-item.active .phase-name { color:rgba(201,168,76,0.5); }
.phase-item.active .phase-num  { color:rgba(201,168,76,0.25); }

/* Layer concept tags: ambient label, not system header */
.layer-tag {
  border:none;background:none;
  padding:0;margin-bottom:44px;
  font-size:8px;letter-spacing:7px;
  color:rgba(201,168,76,0.22);
  opacity:1;
}
.layer-tag-dot { display:none; }

/* Ghost layer numbers: barely visible depth cue */
.layer-num { opacity:0.03; }

/* Layer separators: whisper lines */
.layer { border-bottom-color:rgba(201,168,76,0.05); }

/* ── Layer 2: product dominates, UI recedes ── */

/* Main image: open border, room to breathe */
.l2-main {
  border-color:rgba(201,168,76,0.07);
  transition:border-color 0.6s ease;
}
.l2-main:hover { border-color:rgba(201,168,76,0.16); }

/* Corner brackets: delicate, not structural */
.l2-corner { opacity:0.18;width:14px;height:14px; }

/* Thumbnails: present but not competing */
.l2-thumb        { border-color:rgba(201,168,76,0.07);width:72px;height:72px; }
.l2-thumb.active { border-color:rgba(201,168,76,0.32); }
.l2-thumb:hover  { border-color:rgba(201,168,76,0.16); }
.l2-thumb-inner  { background:var(--bg2); }
.l2-thumb-lbl    { font-size:8px;color:rgba(88,82,74,0.45); }

/* Info panel: data as ambient context, not UI */
.l2-info-card {
  border:none;
  border-bottom:1px solid rgba(201,168,76,0.05);
  background:transparent;
  padding:14px 2px;
}
.l2-info-lbl {
  font-size:8px;letter-spacing:3px;
  color:rgba(201,168,76,0.2);margin-bottom:5px;
}
.l2-info-val { font-size:13px;color:rgba(234,226,210,0.5);font-weight:400; }
.l2-info-sub { font-size:10px;color:rgba(88,82,74,0.55); }

/* View mode selectors: text toggles, not widget buttons */
.l2-views-row { margin-top:20px;gap:0;border:none;background:transparent; }
.l2-view-btn {
  border:none;
  border-bottom:1px solid transparent;
  background:transparent;
  font-size:9px;letter-spacing:2px;
  padding:8px 10px;
  color:rgba(88,82,74,0.55);
  transition:color 0.3s,border-color 0.3s;
}
.l2-view-btn:hover  { color:rgba(201,168,76,0.4);border-color:transparent; }
.l2-view-btn.active {
  color:rgba(201,168,76,0.65);
  border-bottom-color:rgba(201,168,76,0.28);
  background:transparent;
}

/* View badge: present but quiet */
.l2-view-badge {
  background:rgba(2,4,10,0.45);
  border-color:rgba(201,168,76,0.08);
  letter-spacing:2.5px;font-size:8px;
  color:rgba(201,168,76,0.35);
}
`
