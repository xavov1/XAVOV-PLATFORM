'use client'

import Link from 'next/link'

// ─── Data ──────────────────────────────────────────────────────────────────────

const WINGS = [
  { code: 'A', number: '1500', nameAr: 'الأجهزة الذكية',     expertTitle: 'Smart Tech Specialist',        premium: true,  href: '/store/wings/a' },
  { code: 'B', number: '1600', nameAr: 'الأجهزة المنزلية',   expertTitle: 'Home Appliances Expert',        premium: false, href: '/store/wings/b' },
  { code: 'C', number: '1700', nameAr: 'الزراعي والصناعي',    expertTitle: 'Agro-Industrial Specialist',    premium: false, href: '/store/wings/c' },
  { code: 'D', number: '1800', nameAr: 'الإلكترونيات العامة', expertTitle: 'Electronics Systems Expert',   premium: false, href: '/store/wings/d' },
  { code: 'G', number: '1900', nameAr: 'الألعاب والترفيه',   expertTitle: 'Gaming & Entertainment Expert', premium: false, href: '/store/wings/g' },
  { code: 'F', number: '2000', nameAr: 'قطع السيارات',       expertTitle: 'Automotive Parts Specialist',  premium: false, href: '/store/wings/f' },
]

const MEMBERSHIPS = [
  { id: 'standard', title: 'Standard', titleAr: 'القياسية',       ico: '◎', badge: 'مجاني',                  badgeCls: 'bg-free', desc: 'وصول عام للمنصة وجميع الأجنحة والتصفح الحر',                                           elite: false },
  { id: 'premium',  title: 'Premium',  titleAr: 'المميزة',         ico: '✦', badge: 'مدفوع',                  badgeCls: 'bg-paid', desc: 'أولوية في المزادات ومزايا إضافية وخدمة متقدمة',                                       elite: false },
  { id: 'elite',    title: 'Elite / Gold', titleAr: 'النخبة الذهبية', ico: '♛', badge: 'بدعوة من المؤسس فقط', badgeCls: 'bg-inv',  desc: 'النقاط = نقود — وصول حصري لـ E-XA-2030 وأعلى مستوى في المنصة', elite: true  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SecOrn() {
  return (
    <div className="sec-orn">
      <div className="so-l" />
      <div className="so-d" />
      <div className="so-l r" />
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function StorePage() {
  return (
    <div dir="rtl">

      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav>
        <div className="nav-brand">
          <span className="nav-x">XAVOV</span>
          <span className="nav-sep">·</span>
          <span className="nav-s">XA STORE</span>
        </div>
        <div className="nav-links">
          <Link href="/store/wings">الأجنحة</Link>
          <a href="#auctions"><span className="dot-live" />المزادات</a>
          <a href="#memberships">العضويات</a>
          <span className="nav-soon">البورصة</span>
          <span className="nav-soon">الحراج</span>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────── */}
      <div className="hero">
        <p className="hero-eye">XAVOV PLATFORM · XA STORE</p>
        <h1 className="hero-title">XA STORE</h1>
        <p className="hero-ar">تسوّق في أجنحة XAVOV</p>
        <p className="hero-sub">حيث كل جناح عالَم مختلف</p>
        <div className="hero-orn">
          <div className="orn-l" />
          <div className="orn-d" />
          <div className="orn-l r" />
        </div>
        <div className="scroll-ind">
          <div className="scroll-line" />
        </div>
      </div>

      {/* ── WINGS ───────────────────────────────────────────── */}
      <section className="sec wings-sec" id="wings">
        <p className="sec-lbl">THE SIX WINGS</p>
        <h2 className="sec-ttl">الأجنحة</h2>
        <SecOrn />
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Link href="/store/wings" className="auc-btn">
            تصفح جميع الأجنحة &nbsp;←
          </Link>
        </div>

        <div className="wings-grid">

          {/* A — PREMIUM (spans full width, split layout) */}
          <Link href="/store/wings/a" className="wing-card wing-prem">
            <div className="wp-vis">
              <div className="wing-ltr">A</div>
              <div className="wing-num">WING · 1500</div>
            </div>
            <div className="wp-info">
              <div className="prem-badge">★ &nbsp;PREMIUM WING</div>
              <div className="wing-name">الأجهزة الذكية</div>
              <div className="wing-exp">Smart Tech Specialist</div>
              <div className="wing-div" />
              <div className="wing-btn">
                تصفح الجناح &nbsp;<span className="wing-btn-arr">←</span>
              </div>
            </div>
          </Link>

          {/* B–F */}
          {WINGS.slice(1).map((wing) => (
            <Link key={wing.code} href={wing.href} className="wing-card">
              <div className="wc-top">
                <div className="wing-ltr">{wing.code}</div>
                <div className="wing-num">WING · {wing.number}</div>
              </div>
              <div className="wing-name">{wing.nameAr}</div>
              <div className="wing-exp">{wing.expertTitle}</div>
              <div className="wing-div" />
              <div className="wing-btn">
                تصفح الجناح &nbsp;<span className="wing-btn-arr">←</span>
              </div>
            </Link>
          ))}

        </div>
      </section>

      {/* ── MEMBERSHIPS ─────────────────────────────────────── */}
      <section className="sec mem-sec" id="memberships">
        <p className="sec-lbl">MEMBERSHIPS</p>
        <h2 className="sec-ttl">العضويات</h2>
        <SecOrn />
        <div className="mem-grid">
          {MEMBERSHIPS.map((m) => (
            <div key={m.id} className={`mem-card${m.elite ? ' mem-elite' : ''}`}>
              <span className="mem-ico" style={m.elite ? { color: 'var(--gold)' } : {}}>{m.ico}</span>
              <div className="mem-ttl" style={m.elite ? { color: 'var(--gold)' } : {}}>{m.title}</div>
              <div className="mem-ar">{m.titleAr}</div>
              <span className={`mem-badge ${m.badgeCls}`}>{m.badge}</span>
              <p className="mem-desc">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── AUCTIONS ────────────────────────────────────────── */}
      <section className="auc-sec" id="auctions">
        <div className="auc-top">
          <span className="auc-lbl">XA AUCTIONS</span>
          <span className="live-badge"><span className="dot-live" />&nbsp;LIVE</span>
        </div>
        <h2 className="auc-ttl">المزادات الحية</h2>
        <p className="auc-desc">مزادات حية لمدة 60 دقيقة — منتجات حصرية بكميات محدودة</p>
        <Link href="/auctions" className="auc-btn">دخول المزاد &nbsp;←</Link>
      </section>

      {/* ── HARAJ (locked) ──────────────────────────────────── */}
      <section className="locked-sec" id="haraj" style={{ paddingTop: '40px' }}>
        <p className="sec-lbl" style={{ textAlign: 'center', marginBottom: '10px' }}>MARKETPLACE</p>
        <h2 className="sec-ttl" style={{ textAlign: 'center', marginBottom: '14px' }}>الحراج</h2>
        <SecOrn />
        <div className="locked-wrap">
          <div className="locked-inner">
            <div>
              <div className="locked-ttl">الحراج</div>
              <p className="locked-desc">تسوّق منتجات مستعملة ومجددة بأسعار تنافسية — سوق مفتوح داخل XAVOV</p>
            </div>
            <div className="locked-tag">HARAJ · MARKETPLACE</div>
          </div>
          <div className="locked-ov">
            <div className="lock-ico">◈</div>
            <div className="locked-st">قريباً</div>
            <div className="locked-so">XAVOV Marketplace</div>
          </div>
        </div>
      </section>

      {/* ── BOURSE (locked) ─────────────────────────────────── */}
      <section className="locked-sec" id="bourse" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
        <p className="sec-lbl" style={{ textAlign: 'center', marginBottom: '10px' }}>WINGS EXCHANGE</p>
        <h2 className="sec-ttl" style={{ textAlign: 'center', marginBottom: '14px' }}>بورصة الأجنحة</h2>
        <SecOrn />
        <div className="locked-wrap">
          <div className="locked-inner">
            <div>
              <div className="locked-ttl">بورصة الأجنحة</div>
              <p className="locked-desc">سوق تداول حصص الأجنحة بين المستثمرين — منظومة مالية حصرية داخل XAVOV</p>
            </div>
            <div className="locked-tag">WINGS EXCHANGE</div>
          </div>
          <div className="locked-ov">
            <div className="lock-ico">⬡</div>
            <div className="locked-st">مغلقة حالياً</div>
            <div className="locked-so">الإطلاق قريباً</div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer>
        <p><span>XAVOV</span> &nbsp;·&nbsp; XA STORE &nbsp;·&nbsp; جميع الحقوق محفوظة © 2025</p>
      </footer>

    </div>
  )
}
