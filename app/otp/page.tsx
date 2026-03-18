'use client'

import { useState, useRef, useEffect, KeyboardEvent, ClipboardEvent } from 'react'
import { useRouter } from 'next/navigation'
import './otp.css'

export default function OTPPage() {
  const router = useRouter()

  const [otp, setOtp]         = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [timer, setTimer]     = useState(60)
  const [success, setSuccess] = useState(false)
  const [contact, setContact] = useState('')

  const inputs = useRef<(HTMLInputElement | null)[]>([])

  // load contact
  useEffect(() => {
    const c = localStorage.getItem('contact') || ''
    setContact(c)
    setTimeout(() => inputs.current[0]?.focus(), 100)
  }, [])

  // timer
  useEffect(() => {
    if (timer <= 0) return
    const t = setTimeout(() => setTimer(v => v - 1), 1000)
    return () => clearTimeout(t)
  }, [timer])

  // ✍️ change (محسن)
  const handleChange = (value: string, i: number) => {
    const cleaned = value.replace(/\D/g, '').slice(-1)
    if (!cleaned && value !== '') return

    const next = [...otp]
    next[i] = cleaned
    setOtp(next)
    setError('')

    if (cleaned && i < 5) {
      inputs.current[i + 1]?.focus()
    }
  }

  // backspace (محسن)
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, i: number) => {
    if (e.key === 'Backspace') {
      if (otp[i]) {
        const next = [...otp]
        next[i] = ''
        setOtp(next)
      } else if (i > 0) {
        inputs.current[i - 1]?.focus()
      }
    }
  }

  // paste (محسن)
  const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault()
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)

    if (!paste) return

    const next = [...otp]
    paste.split('').forEach((d, i) => {
      if (i < 6) next[i] = d
    })

    setOtp(next)

    const lastIndex = Math.min(paste.length, 5)
    inputs.current[lastIndex]?.focus()
  }

  // submit (محسن)
  const handleSubmit = async () => {
    const code = otp.join('')
    if (code.length !== 6 || loading) return

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
        setOtp(['', '', '', '', '', ''])
        setTimeout(() => inputs.current[0]?.focus(), 100)
        return
      }

      // حفظ الطلب
      const checkout = JSON.parse(localStorage.getItem('checkout') || '{}')
      const cart     = JSON.parse(localStorage.getItem('cart') || '[]')

      const total = cart.reduce((s: number, i: any) => s + i.price * (i.qty || 1), 0)

      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email:         checkout.form?.email || contact,
          phone:         checkout.form?.phone || contact,
          name:          checkout.form?.name,
          address:       `${checkout.form?.city || ''} - ${checkout.form?.district || ''}`,
          paymentMethod: checkout.payment || 'card',
          totalAmount:   total || 150,
          items:         cart,
        }),
      })

      localStorage.removeItem('cart')
      window.dispatchEvent(new Event('storage'))

      setSuccess(true)

      setTimeout(() => {
        router.push('/dashboard')
      }, 1600)

    } catch {
      setError('خطأ في الاتصال')
    } finally {
      setLoading(false)
    }
  }

  // resend
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
    setOtp(['', '', '', '', '', ''])
    setError('')

    setTimeout(() => inputs.current[0]?.focus(), 100)
  }

  const masked = contact.includes('@')
    ? contact.replace(/(.{2}).+(@.+)/, '$1****$2')
    : contact.replace(/(\d{3})\d{4}(\d{3})/, '$1****$2')

  return (
    <div className="otp-page">
      <div className="otp-card">
        <div className="otp-card-top" />

        {/* HEADER */}
        <div className="otp-header">
          <div className="otp-logo">XAVOV</div>
          <div className="otp-header-label">VERIFICATION</div>
        </div>

        {success ? (
          <div className="otp-success">
            <div className="otp-success-ring">✓</div>
            <div className="otp-success-title">تم التحقق</div>
            <div className="otp-success-sub">
              تم التحقق عبر<br />
              <strong style={{ color: '#7A8499' }}>{masked}</strong>
            </div>
          </div>
        ) : (
          <div className="otp-body">

            <div className="otp-icon-wrap">🔐</div>

            <div className="otp-title">أدخل رمز التحقق</div>
            <div className="otp-sub">
              أُرسل إلى<br />
              <strong>{masked || '...'}</strong>
            </div>

            {error && <div className="otp-error">⚠ {error}</div>}

            <div className="otp-inputs" onPaste={handlePaste}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={el => inputs.current[i] = el}
                  className={`otp-input ${digit ? 'filled' : ''} ${error ? 'error' : ''}`}
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleChange(e.target.value, i)}
                  onKeyDown={e => handleKeyDown(e, i)}
                />
              ))}
            </div>

            <div className="otp-resend">
              {timer > 0
                ? <>إعادة بعد <span className="otp-timer">{timer}s</span></>
                : <button className="otp-resend-btn" onClick={resend}>إعادة الإرسال</button>
              }
            </div>

            <button
              className="otp-btn"
              disabled={loading || otp.some(d => !d)}
              onClick={handleSubmit}
            >
              <div className="otp-btn-inner">
                {loading
                  ? <><div className="otp-spinner" />جارٍ التحقق...</>
                  : <>تأكيد ✓</>
                }
              </div>
            </button>

          </div>
        )}

        <div className="otp-footer">
          🔒 XAVOV Secure
        </div>

      </div>
    </div>
  )
}