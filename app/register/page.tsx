'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=Cairo:wght@300;400;500;600;700;900&display=swap');

.xr-root *{margin:0;padding:0;box-sizing:border-box;}
.xr-root{
  --gold:#C9A84C;--gold-b:rgba(201,168,76,0.16);--gold-b2:rgba(201,168,76,0.38);
  --bg:#02040A;--surface:#080D18;--surface2:#0B1020;--surface3:#0E1428;
  --text:#EDE5D5;--text2:#B5AC9C;--muted:#524C44;--green:#2ECC71;
  background:var(--bg);color:var(--text);font-family:'Cairo',sans-serif;min-height:100vh;direction:rtl;
}
.xr-nav{height:64px;display:flex;align-items:center;justify-content:space-between;padding:0 52px;
  background:rgba(2,4,10,0.96);border-bottom:1px solid var(--gold-b);backdrop-filter:blur(24px);
  position:sticky;top:0;z-index:200;}
.xr-logo{font-family:'Cormorant Garamond',serif;font-size:20px;color:var(--gold);letter-spacing:5px;font-weight:600;}
.xr-back{font-size:11.5px;color:var(--muted);cursor:pointer;display:flex;align-items:center;gap:6px;
  transition:color 0.2s;letter-spacing:1px;background:none;border:none;font-family:'Cairo',sans-serif;}
.xr-back:hover{color:var(--text);}

.xr-steps{display:flex;align-items:center;border-bottom:1px solid var(--gold-b);background:rgba(2,4,10,0.6);}
.xr-step{flex:1;display:flex;align-items:center;justify-content:center;gap:10px;padding:12px 16px;
  font-size:10px;letter-spacing:2px;color:var(--muted);font-family:'Cormorant Garamond',serif;
  border-left:1px solid var(--gold-b);position:relative;}
.xr-step:last-child{border-left:none;}
.xr-step.active{color:var(--gold);}
.xr-step.active::after{content:'';position:absolute;bottom:0;left:0;right:0;height:1px;background:var(--gold);}
.xr-step.done{color:var(--green);}
.xr-step-num{width:18px;height:18px;border:1px solid currentColor;border-radius:50%;
  display:flex;align-items:center;justify-content:center;font-size:8px;flex-shrink:0;}

.xr-content{max-width:640px;margin:0 auto;padding:56px 48px;}
.xr-sec-ttl{font-size:10px;letter-spacing:5px;color:rgba(201,168,76,0.45);
  font-family:'Cormorant Garamond',serif;margin-bottom:8px;}
.xr-sec-name{font-size:clamp(22px,2.8vw,32px);font-weight:700;margin-bottom:14px;}
.xr-sec-div{height:1px;background:linear-gradient(90deg,var(--gold-b2),transparent);margin-bottom:32px;}

.xr-field-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px;}
.xr-field{margin-bottom:10px;}
.xr-lbl{font-size:9px;letter-spacing:3px;color:var(--muted);font-family:'Cormorant Garamond',serif;margin-bottom:6px;}
.xr-input{width:100%;background:var(--surface2);border:1px solid var(--gold-b);
  padding:12px 16px;font-size:13px;color:var(--text);font-family:'Cairo',sans-serif;
  outline:none;transition:border-color 0.25s;}
.xr-input::placeholder{color:var(--muted);}
.xr-input:focus{border-color:var(--gold-b2);}
.xr-select{width:100%;background:var(--surface2);border:1px solid var(--gold-b);
  padding:12px 16px;font-size:13px;color:var(--muted);font-family:'Cairo',sans-serif;
  outline:none;cursor:pointer;}
.xr-select.filled{color:var(--text);}
.xr-select option{background:var(--surface2);}
.xr-loc-btn{width:100%;padding:12px 16px;border:1px dashed var(--gold-b);background:transparent;
  color:var(--muted);font-size:12.5px;font-family:'Cairo',sans-serif;cursor:pointer;
  display:flex;align-items:center;justify-content:center;gap:8px;transition:all 0.25s;}
.xr-loc-btn:hover{border-color:var(--gold-b2);color:var(--gold);}
.xr-loc-btn.active{border-color:var(--green);color:var(--green);border-style:solid;background:rgba(46,204,113,0.04);}
.xr-actions{margin-top:24px;display:flex;flex-direction:column;gap:10px;}
.xr-btn-gold{width:100%;padding:14px;background:var(--gold);color:var(--bg);
  font-size:13px;font-family:'Cairo',sans-serif;font-weight:700;letter-spacing:0.5px;
  border:none;cursor:pointer;transition:background 0.25s;display:flex;align-items:center;justify-content:center;gap:10px;}
.xr-btn-gold:hover{background:#E8C97A;}
.xr-btn-gold:disabled{background:#3a3020;color:var(--muted);cursor:not-allowed;}

@media(max-width:640px){
  .xr-nav{padding:0 20px;}
  .xr-content{padding:32px 20px;}
  .xr-field-row{grid-template-columns:1fr;}
}
`

export default function RegisterPage() {
  const router = useRouter()
  const [name,     setName]     = useState('')
  const [phone,    setPhone]    = useState('')
  const [email,    setEmail]    = useState('')
  const [city,     setCity]     = useState('')
  const [country,  setCountry]  = useState('')
  const [district, setDistrict] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [locActive, setLocActive] = useState(false)

  function getLocation() {
    setLocActive(false)
    navigator.geolocation?.getCurrentPosition(
      () => setLocActive(true),
      () => setLocActive(true)
    )
  }

  async function sendCode() {
    if (!name || !phone) {
      alert('يرجى تعبئة الاسم ورقم الجوال')
      return
    }
    setLoading(true)
    try {
      localStorage.setItem('userPhone',    phone)
      localStorage.setItem('userEmail',    email)
      localStorage.setItem('userName',     name)
      localStorage.setItem('userCity',     city)
      localStorage.setItem('userCountry',  country)
      localStorage.setItem('userDistrict', district)
      localStorage.setItem('contact',      phone)
      localStorage.setItem('method',       'phone')
      localStorage.setItem('customerInfo', JSON.stringify({ name, phone, email, city, country, district }))

      const res = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method: 'phone', contact: phone }),
      })

      if (!res.ok) { alert('فشل إرسال رمز التحقق'); return }

      router.push('/otp')
    } catch {
      alert('خطأ، حاول مجدداً')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{CSS}</style>
      <div className="xr-root">

        <nav className="xr-nav">
          <span className="xr-logo">XAVOV</span>
          <button className="xr-back" onClick={() => router.push('/cart')}>→ العودة للسلة</button>
        </nav>

        <div className="xr-steps">
          <div className="xr-step done"><div className="xr-step-num">✓</div>السلة</div>
          <div className="xr-step active"><div className="xr-step-num">2</div>التسجيل</div>
          <div className="xr-step"><div className="xr-step-num">3</div>التحقق</div>
          <div className="xr-step"><div className="xr-step-num">4</div>الدفع</div>
          <div className="xr-step"><div className="xr-step-num">5</div>التتبع</div>
        </div>

        <div className="xr-content">
          <div className="xr-sec-ttl">CUSTOMER INFO</div>
          <div className="xr-sec-name">بياناتك</div>
          <div className="xr-sec-div" />

          <div className="xr-field-row">
            <div className="xr-field">
              <div className="xr-lbl">الاسم الكامل</div>
              <input className="xr-input" type="text" placeholder="الاسم الكامل"
                value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="xr-field">
              <div className="xr-lbl">الدولة</div>
              <select className={`xr-select${country ? ' filled' : ''}`}
                value={country} onChange={e => setCountry(e.target.value)}>
                <option value="" disabled>اختر الدولة</option>
                <option>المملكة العربية السعودية</option>
                <option>الإمارات العربية المتحدة</option>
                <option>الكويت</option>
                <option>البحرين</option>
                <option>قطر</option>
                <option>عُمان</option>
              </select>
            </div>
          </div>

          <div className="xr-field-row">
            <div className="xr-field">
              <div className="xr-lbl">المدينة</div>
              <input className="xr-input" type="text" placeholder="المدينة"
                value={city} onChange={e => setCity(e.target.value)} />
            </div>
            <div className="xr-field">
              <div className="xr-lbl">الحي</div>
              <input className="xr-input" type="text" placeholder="الحي"
                value={district} onChange={e => setDistrict(e.target.value)} />
            </div>
          </div>

          <div className="xr-field">
            <div className="xr-lbl">تحديد الموقع</div>
            <button className={`xr-loc-btn${locActive ? ' active' : ''}`} onClick={getLocation}>
              <span>{locActive ? '✓' : '◎'}</span>
              {locActive ? 'تم تحديد الموقع' : 'تحديد موقعي تلقائياً'}
            </button>
          </div>

          <div className="xr-field-row">
            <div className="xr-field">
              <div className="xr-lbl">البريد الإلكتروني</div>
              <input className="xr-input" type="email" placeholder="example@email.com"
                value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="xr-field">
              <div className="xr-lbl">رقم الجوال</div>
              <input className="xr-input" type="tel" placeholder="05xxxxxxxx"
                value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
          </div>

          <div className="xr-actions">
            <button className="xr-btn-gold" onClick={sendCode} disabled={loading}>
              {loading ? 'جارٍ الإرسال...' : 'متابعة للتحقق ←'}
            </button>
          </div>
        </div>

      </div>
    </>
  )
}
