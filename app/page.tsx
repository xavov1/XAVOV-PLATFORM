import Link from 'next/link'

export default function HomePage() {
  return (
    <div dir="rtl">

      {/* NAV */}
      <nav>
        <div className="nav-logo">
          <span className="nav-logo-main">XAVOV</span>
          <span className="nav-logo-sub">GLOBAL COMMERCE PLATFORM</span>
        </div>
        <div className="nav-links">
          <a href="#about">من نحن</a>
          <a href="#contact">تواصل</a>
        </div>
        <div className="nav-lang">▼ AR 🇸🇦</div>
      </nav>

      {/* HERO */}
      <div className="hero">
        <div className="hero-bg" />
        <div className="hero-vline l" />
        <div className="hero-vline r" />
        <div className="hero-content">
          <p className="hero-eye">XAVOV · GLOBAL DIGITAL COMMERCE PLATFORM</p>

          <div className="hero-mascot">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="50" cy="38" rx="22" ry="24" stroke="#C9A84C" strokeWidth="1.5" fill="none" />
              <circle cx="43" cy="34" r="3.5" stroke="#C9A84C" strokeWidth="1.2" fill="none" />
              <circle cx="57" cy="34" r="3.5" stroke="#C9A84C" strokeWidth="1.2" fill="none" />
              <circle cx="43" cy="34" r="1.2" fill="#C9A84C" opacity="0.7" />
              <circle cx="57" cy="34" r="1.2" fill="#C9A84C" opacity="0.7" />
              <path d="M32 56 Q28 68 30 78 Q32 86 28 92" stroke="#C9A84C" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              <path d="M38 60 Q36 72 38 82 Q40 90 37 96" stroke="#C9A84C" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              <path d="M44 62 Q44 74 46 84 Q47 92 45 98" stroke="#C9A84C" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              <path d="M50 63 Q50 75 52 85 Q53 93 51 99" stroke="#C9A84C" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              <path d="M56 62 Q58 74 56 84 Q55 92 57 98" stroke="#C9A84C" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              <path d="M62 60 Q64 72 62 82 Q60 90 63 96" stroke="#C9A84C" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              <path d="M68 56 Q72 68 70 78 Q68 86 72 92" stroke="#C9A84C" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            </svg>
          </div>

          <h1 className="hero-title">XAVOV</h1>
          <p className="hero-domain">xavov.com</p>

          <div className="hero-orn">
            <div className="orn-l" /><div className="orn-d" /><div className="orn-l r" />
          </div>

          <p className="hero-tagline-ar">حيث التسوق يصبح تجربة</p>
          <p className="hero-tagline-en">Where shopping becomes an experience</p>

          <div className="hero-features">
            <div className="hero-feat">أسعار مكسورة</div>
            <div className="hero-feat">عرض ثلاثي الأبعاد</div>
            <div className="hero-feat">مزادات</div>
            <div className="hero-feat">بورصة</div>
            <div className="hero-feat">عضويات حصرية</div>
          </div>
        </div>
        <div className="hero-scroll"><div className="scroll-line" /></div>
      </div>

      {/* PORTALS */}
      <section className="sec portals-sec" id="portals">
        <p className="sec-lbl">THE PORTALS</p>
        <h2 className="sec-ttl">بوابات المنصة</h2>
        <div className="sec-orn">
          <div className="so-l" /><div className="so-d" /><div className="so-l r" />
        </div>

        <div className="portals-grid">

          {/* XA STORE */}
          <div className="portal">
            <div className="portal-accent" />
            <div className="portal-inner">
              <div className="portal-hdr">
                <span className="portal-id">PORTAL · 01</span>
                <div className="portal-ico">⊹</div>
              </div>
              <div className="portal-name">XA STORE</div>
              <div className="portal-name-ar">المتجر</div>
              <div className="portal-name-en">Store Portal</div>
              <div className="portal-div" />
              <p className="portal-desc">تسوّق في أجنحة XAVOV — منتجات مفحوصة ومصنفة من أفضل الموردين حول العالم</p>

              <div style={{border:'1px solid var(--gold-b)',background:'var(--surface2)',padding:'60px 36px',textAlign:'center',marginBottom:'36px',position:'relative',overflow:'hidden'}}>
                <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 70% 60% at 50% 50%,rgba(201,168,76,0.05) 0%,transparent 70%)',pointerEvents:'none'}} />
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'56px',color:'var(--gold)',fontWeight:300,lineHeight:1,opacity:0.18,letterSpacing:'10px',marginBottom:'18px'}}>XA STORE</div>
                <div style={{fontSize:'9px',letterSpacing:'6px',color:'var(--muted)',fontFamily:"'Cormorant Garamond',serif"}}>ENTER TO EXPLORE</div>
              </div>

              <Link href="/store" className="portal-btn">
                دخول المتجر — Enter <span className="portal-btn-arr">←</span>
              </Link>
            </div>
          </div>

          {/* XA-A-B-C */}
          <div className="portal">
            <div className="portal-accent" />
            <div className="portal-inner">
              <div className="portal-hdr">
                <span className="portal-id">PORTAL · 02</span>
                <div className="portal-ico">⬡</div>
              </div>
              <div className="portal-name">XA-A-B-C</div>
              <div className="portal-name-ar">بوابة الشركاء</div>
              <div className="portal-name-en">Partners Portal</div>
              <div className="portal-div" />
              <p className="portal-desc">بوابة مخصصة للشركاء المعتمدين من قِبل XAVOV — للدخول أو التسجيل انتقل للبوابة</p>

              <div style={{border:'1px solid var(--gold-b)',background:'var(--surface2)',padding:'52px 36px',textAlign:'center',marginBottom:'36px',position:'relative',overflow:'hidden'}}>
                <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 70% 60% at 50% 50%,rgba(201,168,76,0.04) 0%,transparent 70%)',pointerEvents:'none'}} />
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'52px',color:'var(--gold)',fontWeight:300,lineHeight:1,opacity:0.25,letterSpacing:'8px',marginBottom:'16px'}}>XA-A-B-C</div>
                <div style={{fontSize:'10px',letterSpacing:'5px',color:'var(--muted)',fontFamily:"'Cormorant Garamond',serif"}}>AUTHORIZED ACCESS ONLY</div>
              </div>

              <Link href="/abc" className="portal-btn">دخول الشركاء — Enter <span className="portal-btn-arr">←</span></Link>
              <a href="#" className="portal-btn2">طلب الانضمام ←</a>
            </div>
          </div>

        </div>
      </section>

      {/* ABOUT */}
      <section className="sec about-sec" id="about">
        <p className="sec-lbl">ABOUT</p>
        <h2 className="sec-ttl">من نحن</h2>
        <div className="sec-orn">
          <div className="so-l" /><div className="so-d" /><div className="so-l r" />
        </div>
        <div className="about-grid">
          <div className="about-card">
            <span className="about-card-ico">🌐</span>
            <div className="about-card-title-en">Global Platform</div>
            <div className="about-card-title">منصة عالمية</div>
            <p className="about-card-desc">XAVOV منصة تجارة إلكترونية عالمية تربط الموردين المعتمدين بالمشترين حول العالم بشفافية كاملة.</p>
          </div>
          <div className="about-card">
            <span className="about-card-ico">🔍</span>
            <div className="about-card-title-en">Full Transparency</div>
            <div className="about-card-title">شفافية كاملة</div>
            <p className="about-card-desc">نظام عرض خماسي فريد يتيح للعميل رؤية المنتج من الداخل قبل الشراء — لا مفاجآت.</p>
          </div>
          <div className="about-card">
            <span className="about-card-ico">⚡</span>
            <div className="about-card-title-en">Specialized Wings</div>
            <div className="about-card-title">أجنحة متخصصة</div>
            <p className="about-card-desc">6 أجنحة متخصصة، 32 نافذة، وخبير AI في كل جناح يوجهك للمنتج المناسب.</p>
          </div>
          <div className="about-card">
            <span className="about-card-ico">💎</span>
            <div className="about-card-title-en">Integrated System</div>
            <div className="about-card-title">نظام متكامل</div>
            <p className="about-card-desc">مزادات حصرية، بورصة استثمارية، نقاط مكافآت، وعضويات متميزة — تجربة لا مثيل لها.</p>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="sec phil-sec">
        <p className="sec-lbl">XAVOV PHILOSOPHY</p>
        <h2 className="sec-ttl">فلسفة المنصة</h2>
        <div className="sec-orn">
          <div className="so-l" /><div className="so-d" /><div className="so-l r" />
        </div>
        <div className="phil-wrap">
          <div className="phil-header">
            <div className="phil-header-lbl">XAVOV PHILOSOPHY — فلسفة المنصة</div>
            <div className="phil-header-title">المبادئ التي تقوم عليها XAVOV</div>
          </div>
          <div className="phil-items">
            <div className="phil-item">
              <div className="phil-num">١</div>
              <p className="phil-text">في XAVOV، تختلف قيمة المنتجات بحسب نوعها: <strong>أصلي، بديل مثالي، أو مجدد.</strong></p>
            </div>
            <div className="phil-item">
              <div className="phil-num">٢</div>
              <p className="phil-text">لا يتم تقييم المنتجات بشكل موحد، بل تُحدد قيمتها بناءً على <strong>حالتها الفعلية</strong> ونتيجة الفحص داخل النظام.</p>
            </div>
            <div className="phil-item">
              <div className="phil-num">٣</div>
              <p className="phil-text">يجب أن تتابع مسار <strong>الفحص والتفكيك</strong> كما يظهر داخل الأجنحة، حيث تُعرض جميع مكونات المنتج بوضوح قبل الشراء.</p>
            </div>
            <div className="phil-item">
              <div className="phil-num">٤</div>
              <p className="phil-text">تعتمد القيمة النهائية على <strong>دقة الوصف</strong> وتطابقه مع نتائج الفحص المعتمدة.</p>
            </div>
            <div className="phil-item">
              <div className="phil-num">٥</div>
              <p className="phil-text">الأسعار داخل XAVOV تُحدد وفق نظام المنصة — لذلك قد تجد <strong>أسعاراً لا يمكن الوصول إليها</strong> في منصات أخرى أو المتاجر المحلية.</p>
            </div>
          </div>
          <div className="phil-footer">
            <p className="phil-footer-quote">Where value meets transparency</p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="sec contact-sec" id="contact">
        <p className="sec-lbl">CONTACT</p>
        <h2 className="sec-ttl">تواصل</h2>
        <div className="sec-orn">
          <div className="so-l" /><div className="so-d" /><div className="so-l r" />
        </div>
        <div className="contact-wrap">
          <div className="contact-form">
            <div className="form-inner">
              <div className="form-field">
                <input type="text" placeholder="الاسم — Name" />
              </div>
              <div className="form-field">
                <input type="email" placeholder="البريد الإلكتروني — Email" />
              </div>
              <div className="form-field">
                <textarea placeholder="رسالتك — Message" />
              </div>
              <button className="form-submit">إرسال — Send</button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <span className="foot-logo">XAVOV</span>
        <div className="foot-center">
          <span className="foot-item">6 أجنحة</span>
          <span className="foot-item">32 نافذة</span>
          <span className="foot-item">4 بوابات</span>
          <span className="foot-item">منصة عالمية</span>
        </div>
        <span className="foot-right">جميع الحقوق محفوظة © 2025</span>
      </footer>

    </div>
  )
}
