import Link from 'next/link'

export default function AbcPage() {
  return (
    <>
      <style>{`
        .abc-page *{margin:0;padding:0;box-sizing:border-box;}
        .abc-page{
          --gold:#C9A84C;--gold-b:rgba(201,168,76,0.16);--gold-b2:rgba(201,168,76,0.35);
          --bg:#02040A;--bg2:#04060D;--surface:#080D18;--surface2:#0B1020;--surface3:#0E1428;
          --text:#EDE5D5;--text2:#B5AC9C;--muted:#524C44;
          background:var(--bg);color:var(--text);font-family:'Cairo',sans-serif;overflow-x:hidden;min-height:100vh;
          direction:rtl;
        }
        .abc-page a{text-decoration:none;color:inherit;}
        .abc-page::after{content:'';position:fixed;inset:0;pointer-events:none;z-index:0;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          opacity:0.022;mix-blend-mode:overlay;}

        .abc-nav{position:fixed;top:0;left:0;right:0;z-index:999;height:68px;
          display:flex;align-items:center;justify-content:space-between;padding:0 60px;
          background:rgba(2,4,10,0.92);border-bottom:1px solid var(--gold-b);backdrop-filter:blur(24px);}
        .abc-nav-logo{display:flex;flex-direction:column;align-items:flex-end;gap:1px;}
        .abc-nav-logo-main{font-family:'Cormorant Garamond',serif;font-size:22px;color:var(--gold);letter-spacing:6px;font-weight:600;line-height:1;}
        .abc-nav-logo-sub{font-size:8px;letter-spacing:4px;color:rgba(201,168,76,0.35);font-family:'Cormorant Garamond',serif;}
        .abc-nav-back{font-size:12px;color:var(--muted);letter-spacing:1px;transition:color 0.2s;display:flex;align-items:center;gap:8px;}
        .abc-nav-back:hover{color:var(--text);}

        .abc-hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;
          text-align:center;padding:68px 48px 60px;position:relative;overflow:hidden;}
        .abc-hero-bg{position:absolute;inset:0;pointer-events:none;
          background:radial-gradient(ellipse 60% 65% at 50% 45%,rgba(201,168,76,0.05) 0%,transparent 65%);}
        .abc-hero-vline{position:absolute;top:0;bottom:0;width:1px;background:linear-gradient(180deg,transparent,rgba(201,168,76,0.07),transparent);}
        .abc-hero-vline.l{right:calc(50% + 360px);}.abc-hero-vline.r{left:calc(50% + 360px);}
        .abc-hero-eye{font-family:'Cormorant Garamond',serif;font-size:10px;letter-spacing:7px;color:rgba(201,168,76,0.45);margin-bottom:28px;animation:abc-fu 0.8s ease both;}
        .abc-hero-title{font-family:'Cormorant Garamond',serif;font-size:clamp(44px,7vw,88px);color:var(--gold);font-weight:300;letter-spacing:8px;line-height:0.95;text-shadow:0 0 80px rgba(201,168,76,0.1);margin-bottom:8px;animation:abc-fu 0.9s 0.1s ease both;}
        .abc-hero-title-sub{font-family:'Cormorant Garamond',serif;font-size:13px;color:rgba(201,168,76,0.3);letter-spacing:6px;margin-bottom:32px;animation:abc-fu 0.9s 0.15s ease both;}
        .abc-hero-ar{font-size:clamp(16px,2vw,22px);color:var(--text);font-weight:300;letter-spacing:1.5px;margin-bottom:8px;animation:abc-fu 1s 0.2s ease both;}
        .abc-hero-sub{font-size:13px;color:var(--muted);letter-spacing:1px;animation:abc-fu 1s 0.25s ease both;}
        .abc-hero-orn{display:flex;align-items:center;gap:14px;margin:28px auto;animation:abc-fu 1s 0.3s ease both;}
        .abc-orn-l{width:56px;height:1px;background:linear-gradient(90deg,transparent,var(--gold));}
        .abc-orn-l.r{background:linear-gradient(90deg,var(--gold),transparent);}
        .abc-orn-d{width:4px;height:4px;background:var(--gold);border-radius:50%;opacity:0.45;}
        .abc-hero-scroll{position:absolute;bottom:36px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;}
        .abc-scroll-line{width:1px;height:44px;background:linear-gradient(180deg,var(--gold),transparent);animation:abc-scrollDrop 2.4s ease-in-out infinite;}
        @keyframes abc-scrollDrop{0%{transform:scaleY(0);transform-origin:top;}50%{transform:scaleY(1);transform-origin:top;}51%{transform:scaleY(1);transform-origin:bottom;}100%{transform:scaleY(0);transform-origin:bottom;}}
        @keyframes abc-fu{from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);}}

        .abc-sec{padding:80px 60px 100px;position:relative;z-index:1;
          background:radial-gradient(ellipse 80% 50% at 50% 0%,rgba(201,168,76,0.025) 0%,transparent 55%);}
        .abc-sec-lbl{font-family:'Cormorant Garamond',serif;font-size:10px;letter-spacing:6px;color:rgba(201,168,76,0.45);text-align:center;margin-bottom:10px;}
        .abc-sec-ttl{font-size:clamp(22px,2.8vw,34px);font-weight:700;text-align:center;margin-bottom:14px;}
        .abc-sec-orn{display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:64px;}
        .abc-so-l{width:44px;height:1px;background:linear-gradient(90deg,transparent,var(--gold));}
        .abc-so-l.r{background:linear-gradient(90deg,var(--gold),transparent);}
        .abc-so-d{width:5px;height:5px;background:var(--gold);transform:rotate(45deg);opacity:0.5;}

        .abc-cards-grid{display:grid;grid-template-columns:1fr 1fr;gap:1px;max-width:1100px;margin:0 auto;background:var(--gold-b);border:1px solid var(--gold-b);}
        .abc-card-partners{grid-column:1/-1;}

        .abc-partner-card{background:var(--surface);padding:52px 48px;position:relative;overflow:hidden;transition:background 0.3s;cursor:pointer;display:block;}
        .abc-partner-card:hover{background:var(--surface2);}
        .abc-partner-card::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 70% 50% at 50% 0%,rgba(201,168,76,0.055) 0%,transparent 65%);opacity:0;transition:opacity 0.35s;pointer-events:none;}
        .abc-partner-card:hover::before{opacity:1;}
        .abc-card-accent{height:1px;background:linear-gradient(90deg,transparent,var(--gold),transparent);opacity:0.45;position:absolute;top:0;left:0;right:0;}

        .abc-card-hdr{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:32px;}
        .abc-card-id{font-family:'Cormorant Garamond',serif;font-size:10px;letter-spacing:5px;color:rgba(201,168,76,0.35);}
        .abc-card-ico{width:52px;height:52px;border:1px solid var(--gold-b);display:flex;align-items:center;justify-content:center;font-size:22px;color:var(--gold);opacity:0.6;font-family:'Cormorant Garamond',serif;}

        .abc-card-name{font-family:'Cormorant Garamond',serif;font-size:clamp(32px,4vw,52px);color:var(--gold);font-weight:300;letter-spacing:4px;line-height:1;margin-bottom:4px;}
        .abc-card-name-ar{font-size:20px;font-weight:700;margin-bottom:5px;}
        .abc-card-name-en{font-family:'Cormorant Garamond',serif;font-size:12px;color:var(--muted);font-style:italic;letter-spacing:2px;margin-bottom:24px;}
        .abc-card-div{height:1px;background:linear-gradient(90deg,var(--gold-b2),transparent);margin-bottom:24px;}

        .abc-card-btn{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:13px 24px;border:1px solid var(--gold);color:var(--gold);font-size:13px;font-family:'Cairo',sans-serif;letter-spacing:0.5px;background:transparent;cursor:pointer;transition:background 0.25s,color 0.25s;margin-bottom:10px;}
        .abc-card-btn:hover{background:var(--gold);color:var(--bg);}
        .abc-card-btn-arr{transition:transform 0.25s;}
        .abc-card-btn:hover .abc-card-btn-arr{transform:translateX(-4px);}
        .abc-card-btn2{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:12px 24px;border:1px solid rgba(201,168,76,0.18);color:var(--muted);font-size:13px;font-family:'Cairo',sans-serif;letter-spacing:0.5px;background:transparent;cursor:pointer;transition:border-color 0.25s,color 0.25s;}
        .abc-card-btn2:hover{border-color:var(--gold-b2);color:var(--text2);}

        .abc-card-partners .abc-partner-card{cursor:not-allowed;background:var(--bg2);}
        .abc-card-partners .abc-partner-card:hover{background:var(--bg2);}
        .abc-card-partners .abc-partner-card:hover::before{opacity:0;}
        .abc-partners-inner{display:grid;grid-template-columns:1fr auto;align-items:center;gap:48px;filter:blur(1px);opacity:0.3;pointer-events:none;user-select:none;}
        .abc-locked-overlay{position:absolute;inset:0;z-index:10;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(2,4,10,0.0);backdrop-filter:blur(0px);}
        .abc-partners-tag{font-family:'Cormorant Garamond',serif;font-size:10px;letter-spacing:4px;color:var(--muted);padding:10px 22px;border:1px solid var(--gold-b);white-space:nowrap;}

        .abc-footer{border-top:1px solid var(--gold-b);padding:32px 60px;display:flex;align-items:center;justify-content:space-between;position:relative;z-index:1;}
        .abc-foot-logo{font-family:'Cormorant Garamond',serif;font-size:18px;color:var(--gold);letter-spacing:5px;}
        .abc-foot-right{font-size:10px;letter-spacing:1px;color:var(--muted);}
      `}</style>

      <div className="abc-page">

        <nav className="abc-nav">
          <div className="abc-nav-logo">
            <span className="abc-nav-logo-main">XAVOV</span>
            <span className="abc-nav-logo-sub">XA-A-B-C PORTAL</span>
          </div>
          <Link href="/" className="abc-nav-back">→ الرئيسية</Link>
        </nav>

        <div className="abc-hero">
          <div className="abc-hero-bg" />
          <div className="abc-hero-vline l" />
          <div className="abc-hero-vline r" />
          <div style={{position:'relative',zIndex:1}}>
            <p className="abc-hero-eye">XAVOV · PARTNERS PORTAL · XA-A-B-C</p>
            <h1 className="abc-hero-title">XA-A-B-C</h1>
            <p className="abc-hero-title-sub">PARTNERS PORTAL</p>
            <p className="abc-hero-ar">بوابة الشركاء المعتمدين</p>
            <p className="abc-hero-sub">اختر نوع شراكتك للمتابعة</p>
            <div className="abc-hero-orn">
              <div className="abc-orn-l" /><div className="abc-orn-d" /><div className="abc-orn-l r" />
            </div>
          </div>
          <div className="abc-hero-scroll"><div className="abc-scroll-line" /></div>
        </div>

        <section className="abc-sec">
          <p className="abc-sec-lbl">SELECT YOUR ROLE</p>
          <h2 className="abc-sec-ttl">اختر نوع شراكتك</h2>
          <div className="abc-sec-orn">
            <div className="abc-so-l" /><div className="abc-so-d" /><div className="abc-so-l r" />
          </div>

          <div className="abc-cards-grid">

            {/* LǍOSHĪ */}
            <a href="#" className="abc-partner-card">
              <div className="abc-card-accent" />
              <div className="abc-card-hdr">
                <span className="abc-card-id">PARTNER · 01</span>
                <div className="abc-card-ico">人</div>
              </div>
              <div className="abc-card-name">Lǎoshī</div>
              <div className="abc-card-name-ar">المعلم — الموّرد</div>
              <div className="abc-card-name-en">Chinese Supplier</div>
              <div className="abc-card-div" />
              <div className="abc-card-btn">تسجيل جديد — Register <span className="abc-card-btn-arr">←</span></div>
              <div className="abc-card-btn2">تسجيل دخول — Login ←</div>
            </a>

            {/* LSP */}
            <a href="#" className="abc-partner-card">
              <div className="abc-card-accent" />
              <div className="abc-card-hdr">
                <span className="abc-card-id">PARTNER · 02</span>
                <div className="abc-card-ico">⬡</div>
              </div>
              <div className="abc-card-name">LSP</div>
              <div className="abc-card-name-ar">شريك اللوجستي</div>
              <div className="abc-card-name-en">Logistics &amp; Shipping Partner</div>
              <div className="abc-card-div" />
              <div className="abc-card-btn">تسجيل جديد — Register <span className="abc-card-btn-arr">←</span></div>
              <div className="abc-card-btn2">تسجيل دخول — Login ←</div>
            </a>

            {/* XA PARTNERS — LOCKED */}
            <div className="abc-card-partners">
              <div className="abc-partner-card">
                <div className="abc-card-accent" />
                <div className="abc-partners-inner">
                  <div>
                    <div className="abc-card-hdr" style={{marginBottom:'16px'}}>
                      <span className="abc-card-id">PARTNER · 03</span>
                    </div>
                    <div className="abc-card-name">XA Partners</div>
                    <div className="abc-card-name-ar">شركاء التشغيل</div>
                    <div className="abc-card-name-en">Operations Partners</div>
                    <div className="abc-card-div" style={{marginTop:'16px'}} />
                  </div>
                  <div className="abc-partners-tag">AUTHORIZED ACCESS ONLY</div>
                </div>
                <div className="abc-locked-overlay">
                  <div style={{width:'100%',maxWidth:'400px',padding:'0 48px'}}>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'32px',color:'var(--gold)',fontWeight:300,letterSpacing:'4px',marginBottom:'4px'}}>XA Partners</div>
                    <div style={{fontSize:'14px',fontWeight:700,marginBottom:'4px'}}>شركاء التشغيل</div>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'11px',color:'var(--muted)',fontStyle:'italic',letterSpacing:'2px',marginBottom:'20px'}}>Operations Partners</div>
                    <div style={{height:'1px',background:'linear-gradient(90deg,var(--gold-b2),transparent)',marginBottom:'24px'}} />
                    <div className="abc-card-btn" style={{maxWidth:'100%'}}>تسجيل دخول — Login <span className="abc-card-btn-arr">←</span></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        <footer className="abc-footer">
          <span className="abc-foot-logo">XAVOV</span>
          <span className="abc-foot-right">XA-A-B-C · بوابة الشركاء · جميع الحقوق محفوظة © 2025</span>
        </footer>

      </div>
    </>
  )
}
