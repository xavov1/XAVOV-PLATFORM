'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Header() {
  const [count, setCount] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      setCount(cart.length)
    }

    const handleScroll = () => setScrolled(window.scrollY > 20)

    updateCart()
    window.addEventListener('storage', updateCart)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('storage', updateCart)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className={`xav-header${scrolled ? ' scrolled' : ''}`}>
      <div className="xav-logo-wrap">
        <Link href="/" className="xav-logo">XAVOV</Link>
      </div>

      <div className="xav-actions">
        <Link href="/cart" className="xav-cart">
          <div className="xav-cart-inner">
            <div className="xav-cart-icon">🛒</div>
            <div>
              <span className="xav-cart-label">CART</span>
              <span className="xav-cart-name">السلة</span>
            </div>
          </div>

          {count > 0 && (
            <div className="xav-badge">{count}</div>
          )}
        </Link>
      </div>
    </header>
  )
}