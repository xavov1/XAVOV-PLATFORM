'use client'

import { useState, useRef, useEffect, KeyboardEvent, ClipboardEvent } from 'react'
import { useRouter } from 'next/navigation'

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=Cairo:wght@300;400;500;600;700;900&display=swap');

.xo-root *{margin:0;padding:0;box-sizing:border-box;}
.xo-root{
  --gold:#C9A84C;--gold-b:rgba(201,168,76,0.16);--gold-b2:rgba(201,168,76,0.38);
  --bg:#02040A;--surface:#080D18;--surface2:#0B1020;--surface3:#0E1428;
  --text:#EDE5D5;--text2:#B5AC9C;--muted:#524C44;--green:#2ECC71;--red:#C0392B;
  background:var(--bg);color:var(--text);font-family:'Cairo',sans-serif;min-height:100vh;direction:rtl;
}
.xo-nav{height:64px;display:flex;align-items:center;justify-content:space-between;padding:0 52px;
  background:rgba(2,4,10,0.96);border-bottom:1px solid var(--gold-b);backdrop-filter:blur(24px);
  position:sticky;top:0;z-index:200;}
.xo-logo{font-family:'Cormorant Garamond',serif;font-size:20px;color:var(--gold);letter-spacing:5px;font-weight:600;}
.xo-back{font-size:11.5px;color:var(--muted);cursor:pointer;display:flex;align-items:center;gap:6px;
  transition:color 0.2s;letter-spacing:1px;background:none;border:none;font-family:'Cairo',sans-serif;}
.xo-back:hover{color:var(--text);}

.xo-steps{display:flex;align-items:center;border-bottom:1px solid var(--gold-b);background:rgba(2,4,10,0.6);}
.xo-step{flex:1;display:flex;align-items:center;justify-content:center;gap:10px;padding:12px 16px;
  font-size:10px;letter-spacing:2px;color:var(--muted);font-family:'Cormorant Garamond',serif;
  border-left:1px solid var(--gold-b);position:relative;}
.xo-step:last-child{border-left:none;}
.xo-step.active{color:var(--gold);}
.xo-step.active::after{content:'';position:absolute;bottom:0;left:0;right:0;height:1px;background:var(--gold);}
.xo-step.done{color:var(--green);}
.xo-step-num{width:18px;height:18px;border:1px solid currentColor;border-radius:50%;
  display:flex;align-items:center;justify-content:center;font-size:8px;flex-shrink:0;}

.xo-content{max-width:480px;margin:0 auto;padding:80px 48px;text-align:center;}
.xo-sec-ttl{font-size:10px;letter-spacing:5px;color:rgba(201,168,76,0.45);
  font-family:'Cormorant Garamond',serif;margin-bottom:8px;}
.xo-sec-name{font-size:clamp(22px,2.8vw,32px);font-weight:700;margin-bottom:14px;}
.xo-sec-div{height:1px;background:linear-gradient(90deg,var(--gold-b2),transparent);margin-bottom:32px;}

.xo-phone-lbl{font-size:13px;color:var(--text2);margin-bottom:32px;line-height:1.7;}
.xo-phone-lbl span{color:var(--gold);font-weight:700;}
.xo-inputs{display:flex;gap:12px;justify-content:center;margin-bottom:28px;direction:ltr;}
.xo-box{width:60px;height:68px;text-align:center;font-family:'Cormorant Garamond',serif;
  font-size:32px;color:var(--gold);font-weight:300;
  background:var(--surface2);border:1px solid var(--gold-b);outline:none;
  transition:border-color 0.25s;caret-color:var(--gold);}
.xo-box:focus{border-color:var(--gold);}
.xo-box.filled{border-color:var(--gold-b2);background:var(--surface3);}
.xo-box.error{border-color:rgba(192,57,43,0.7)!important;background:rgba(192,57,43,0.06)!important;}
.xo-error{font-size:12px;color:#E57373;letter-spacing:0.5px;margin-bottom:16px;}
.xo-resend{font-size:11px;color:var(--muted);letter-spacing:1px;margin-bottom:8px;}
.xo-resend-link{color:var(--gold);cursor:pointer;transition:opacity 0.2s;background:none;border:none;
  font-family:'Cairo',sans-serif;font-size:11px;letter-spacing:1px;}
.xo-resend-link:hover{opacity:0.7;}
.xo-timer{font-size:10px;color:var(--muted);letter-spacing:2px;font-family:'Cormorant Garamond',serif;margin-top:8px;}

.xo-btn{width:100%;padding:14px;background:var(--gold);color:var(--bg);
  font-size:13px;font-family:'Cairo',sans-serif;font-weight:700;letter-spacing:0.5px;
  border:none;cursor:pointer;transition:background 0.25s;margin-top:28px;display:flex;align-items:center;justify-content:center;gap:10px;}
.xo-btn:hover:not(:disabled){background:#E8C97A;}
.xo-btn:disabled{background:#3a3020;color:var(--muted);cursor:not-allowed;}
.xo-spinner{width:14px;height:14px;border:2px solid var(--bg);border-top-color:transparent;
  border-radius:50%;animation:xo-spin 0.6s linear infinite;}
@keyframes xo-spin{to{transform:rotate(360deg);}}

.xo-success{padding:40px 0;}
.xo-success-ring{width:64px;height:64px;border:2px solid var(--green);border-radius:50%;
  display:flex;align-items:center;justify-content:center;font-size:28px;color:var(--green);
  margin:0 auto 20px;animation:xo-pop 0.4s cubic-bezier(0.34,1.56,0.64,1);}
@keyframes xo-pop{from{transform:scale(0);}to{transform:scale(1);}}
.xo-success-title{font-size:20px;font-weight:700;margin-bottom:8px;}
.xo-success-sub{font-size:13px;color:var(--muted);}

@media(max-width:640px){
  .xo-nav{padding:0 20px;}
  .xo-content{padding:48px 20px;}
  .xo-box{width:52px;height:60px;font-size:26px;}
}
`

export default function OTPPage() {
  const router = useRouter()
  const [otp, setOtp]         = useState(['', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [timer, setTimer]     = useState(60)
  const [success, setSuccess] = useState(false)
  const [contact, setContact] = useState('')
  const inputs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    const c = localStorage.getItem('contact') || ''
    setContact(c)
    setTimeout(() => inputs.current[0]?.focus(), 100)
  }, [])

  useEffect(() => {
    if (timer <= 0) return
    const t = setTimeout(() => setTimer(v => v - 1), 1000)
    return () => clearTimeout(t)
  }, [timer])

  const handleChange = (value: string, i: number) => {
    const cleaned = value.replace(/\D/g, '').slice(-1)
    if (!cleaned && value !== '') return
    const next = [...otp]
    next[i] = cleaned
    setOtp(next)
    setError('')
    if (cleaned && i < 3) inputs.current[i + 1]?.focus()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, i: number) => {
    if (e.key === 'Backspace') {
      if (otp[i]) {
        const next = [...otp]; next[i] = ''; setOtp(next)
      } else if (i > 0) {
        inputs.current[i - 1]?.focus()
      }
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault()
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4)
    if (!paste) return
    const next = [...otp]
    paste.split('').forEach((d, i) => { if (i < 4) next[i] = d })
    setOtp(next)
    inputs.current[Math.min(paste.length, 3)]?.focus()
  }

  const handleSubmit = async () => {
    const code = otp.join('')
    if (code.length !== 4 || loading) return
    setLoading(true)
    setError('')
    try {
      const contact = localStorage.getItem('contact')
      const method  = localStorage.getItem('method')
      const res = await fetch('/api/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, contact, method }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'رمز غير صحيح')
        setOtp(['', '', '', ''])
        setTimeout(() => inputs.current[0]?.focus(), 100)
        return
      }
      setSuccess(true)
      setTimeout(() => router.push('/payment'), 1600)
    } catch {
      setError('خطأ في الاتصال')
    } finally {
      setLoading(false)
    }
  }

  const resend = async () => {
    if (timer > 0) return
    const contact = localStorage.getItem('contact')
    const method  = localStorage.getItem('method')
    await fetch('/api/otp/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contact, method }),
    })
    setTimer(60)
    setOtp(['', '', '', ''])
    setError('')
    setTimeout(() => inputs.current[0]?.focus(), 100)
  }

  const masked = contact.includes('@')
    ? contact.replace(/(.{2}).+(@.+)/, '$1****$2')
    : contact.replace(/(\d{3})\d{4}(\d{3})/, '$1****$2')

  return (
    <>
      <style>{CSS}</style>
      <div className="xo-root">

        <nav className="xo-nav">
          <span className="xo-logo">XAVOV</span>
          <button className="xo-back" onClick={() => router.push('/register')}>→ العودة</button>
        </nav>

        <div className="xo-steps">
          <div className="xo-step done"><div className="xo-step-num">✓</div>السلة</div>
          <div className="xo-step done"><div className="xo-step-num">✓</div>التسجيل</div>
          <div className="xo-step active"><div className="xo-step-num">3</div>التحقق</div>
          <div className="xo-step"><div className="xo-step-num">4</div>الدفع</div>
          <div className="xo-step"><div className="xo-step-num">5</div>التتبع</div>
        </div>

        <div className="xo-content">
          <div className="xo-sec-ttl">VERIFICATION</div>
          <div className="xo-sec-name">كود التحقق</div>
          <div className="xo-sec-div" />

          {success ? (
            <div className="xo-success">
              <div className="xo-success-ring">✓</div>
              <div className="xo-success-title">تم التحقق</div>
              <div className="xo-success-sub">جارٍ التوجيه للدفع...</div>
            </div>
          ) : (
            <>
              <div className="xo-phone-lbl">
                أُرسل كود مكون من 4 أرقام إلى<br />
                <span>{masked || '05xxxxxxxx'}</span>
              </div>

              {error && <div className="xo-error">⚠ {error}</div>}

              <div className="xo-inputs" onPaste={handlePaste}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={el => { inputs.current[i] = el }}
                    className={`xo-box${digit ? ' filled' : ''}${error ? ' error' : ''}`}
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleChange(e.target.value, i)}
                    onKeyDown={e => handleKeyDown(e, i)}
                  />
                ))}
              </div>

              <div className="xo-resend">
                لم تستلم الكود؟ &nbsp;
                {timer > 0
                  ? <span style={{ color: 'var(--muted)' }}>إعادة الإرسال بعد {timer} ثانية</span>
                  : <button className="xo-resend-link" onClick={resend}>إعادة إرسال</button>
                }
              </div>
              {timer > 0 && <div className="xo-timer">{timer}s</div>}

              <button
                className="xo-btn"
                disabled={loading || otp.some(d => !d)}
                onClick={handleSubmit}
              >
                {loading
                  ? <><div className="xo-spinner" />جارٍ التحقق...</>
                  : 'تأكيد ✓'
                }
              </button>
            </>
          )}
        </div>

      </div>
    </>
  )
}
