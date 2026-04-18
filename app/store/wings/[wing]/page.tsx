'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'

// ─── Data ──────────────────────────────────────────────────────────────────────

const WINGS_DATA: Record<string, {
  code: string
  number: string
  nameAr: string
  expertTitle: string
  premium?: boolean
  windows: { code: string; nameAr: string }[]
}> = {
  a: {
    code: 'A', number: '1500', nameAr: 'الأجهزة الذكية', expertTitle: 'Smart Tech Specialist', premium: true,
    windows: [
      { code: 'A1', nameAr: 'الجوالات' },
      { code: 'A2', nameAr: 'اللابتوبات' },
      { code: 'A3', nameAr: 'قطع الكمبيوتر' },
      { code: 'A4', nameAr: 'الطابعات' },
      { code: 'A5', nameAr: 'الشاشات' },
    ],
  },
  b: {
    code: 'B', number: '1600', nameAr: 'الأجهزة المنزلية', expertTitle: 'Home Appliances Expert',
    windows: [
      { code: 'B1', nameAr: 'الثلاجات' },
      { code: 'B2', nameAr: 'الغسالات' },
      { code: 'B3', nameAr: 'المكيفات' },
      { code: 'B4', nameAr: 'الأفران' },
      { code: 'B5', nameAr: 'الأجهزة الصغيرة' },
      { code: 'B6', nameAr: 'القهوة' },
    ],
  },
  c: {
    code: 'C', number: '1700', nameAr: 'الزراعي والصناعي', expertTitle: 'Agro-Industrial Specialist',
    windows: [
      { code: 'C1', nameAr: 'المعدات الزراعية' },
      { code: 'C2', nameAr: 'أنظمة الري' },
      { code: 'C3', nameAr: 'مستلزمات الزراعة' },
      { code: 'C4', nameAr: 'المضخات والخزانات' },
      { code: 'C5', nameAr: 'المعدات الصناعية' },
      { code: 'C6', nameAr: 'الطاقة الشمسية' },
    ],
  },
  d: {
    code: 'D', number: '1800', nameAr: 'الإلكترونيات العامة', expertTitle: 'Electronics Systems Expert',
    windows: [
      { code: 'D1', nameAr: 'التلفزيونات' },
      { code: 'D2', nameAr: 'الكاميرات' },
      { code: 'D3', nameAr: 'الصوتيات' },
      { code: 'D4', nameAr: 'الشبكات' },
      { code: 'D5', nameAr: 'الملحقات' },
    ],
  },
  g: {
    code: 'G', number: '1900', nameAr: 'الألعاب والترفيه', expertTitle: 'Gaming & Entertainment Expert',
    windows: [
      { code: 'G1', nameAr: 'PC' },
      { code: 'G2', nameAr: 'PS' },
      { code: 'G3', nameAr: 'XBOX' },
      { code: 'G4', nameAr: 'البطاقات الرقمية والحزم والنسخ' },
      { code: 'G5', nameAr: 'غرف القيمنج' },
    ],
  },
  f: {
    code: 'F', number: '2000', nameAr: 'قطع السيارات', expertTitle: 'Automotive Parts Specialist',
    windows: [
      { code: 'F1', nameAr: 'تايوتا' },
      { code: 'F2', nameAr: 'هونداي' },
      { code: 'F3', nameAr: 'كيا' },
      { code: 'F4', nameAr: 'ام جي' },
      { code: 'F5', nameAr: 'شانجان' },
    ],
  },
}

// ─── Not Found ────────────────────────────────────────────────────────────────

function WingNotFound() {
  return (
    <div dir="rtl" style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px', color: 'var(--text)' }}>
      <p style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif', fontSize: '10px', letterSpacing: '6px', color: 'rgba(201,168,76,0.4)' }}>404</p>
      <h1 style={{ fontSize: '24px', fontWeight: 700 }}>الجناح غير موجود</h1>
      <Link href="/store" className="nav-back">← العودة للمتجر</Link>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WingPage() {
  const params  = useParams()
  const wingKey = (params?.wing as string)?.toLowerCase()
  const wing    = WINGS_DATA[wingKey]

  if (!wing) return <WingNotFound />

  return (
    <div dir="rtl">

      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav>
        <span className="nav-x">XAVOV</span>
        <Link href="/store" className="nav-back">
          <span className="back-arr">→</span>
          العودة للمتجر
        </Link>
      </nav>

      {/* ── WING HEADER ─────────────────────────────────────── */}
      <div className="wing-header">
        <div className="wh-inner">
          <div className="wh-letter-block">
            <div className="wh-letter">{wing.code}</div>
            <div className="wh-num">WING · {wing.number}</div>
          </div>
          <div className="wh-info">
            {wing.premium && <div className="prem-pill">★ &nbsp;PREMIUM WING</div>}
            <p className="wh-eyebrow">XAVOV · WING {wing.code} · {wing.number}</p>
            <h1 className="wh-name">{wing.nameAr}</h1>
            <p className="wh-expert">{wing.expertTitle}</p>
            <div className="wh-divider" />
            <p className="wh-desc">
              اختر نافذتك وتصفح المنتجات المفحوصة والمصنفة من أفضل الموردين
            </p>
          </div>
        </div>
      </div>

      {/* ── WINDOWS GRID ────────────────────────────────────── */}
      <div className="windows-sec">
        <p className="ws-label">WINDOWS · WING {wing.code}</p>
        <h2 className="ws-title">نوافذ الجناح</h2>
        <div className="ws-orn">
          <div className="wo-l" />
          <div className="wo-d" />
        </div>
        <div className="windows-grid">
          {wing.windows.map((win) => {
            const wingMap: Record<string, string> = {
              a: '1500', b: '1600', c: '1700', d: '1800', e: '1900', f: '2000',
            }
            console.log('WING PARAM:', params.wing)
            const href = `/store/wings/${wingMap[wingKey]}/${win.code}`
            return (
              <Link
                key={win.code}
                href={href}
                style={{ textDecoration: 'none', color: 'inherit', display: 'contents' }}
                onClick={() => console.log('GO TO WINDOW:', href)}
              >
                <div className="win-card">
                  <div className="win-code">{win.code}</div>
                  <div className="win-name">{win.nameAr}</div>
                  <div className="win-div" />
                  <div className="win-btn">تصفح المنتجات ←</div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer>
        <p><span>XAVOV</span> · جناح {wing.code} · {wing.nameAr}</p>
      </footer>

    </div>
  )
}
