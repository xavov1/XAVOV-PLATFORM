'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ProductsPage() {
  const router   = useRouter()
  const [products, setProducts] = useState<any[]>([])
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        console.log('PRODUCTS FROM DB:', data)
        setProducts(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(err => {
        console.error('PRODUCTS FETCH ERROR:', err)
        setLoading(false)
      })
  }, [])

  const addToCart = (product: any) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const idx  = cart.findIndex((i: any) => i.id === product.id)
    if (idx >= 0) {
      cart[idx].quantity = (cart[idx].quantity || 1) + 1
    } else {
      cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 })
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('storage'))
    alert('تمت الإضافة للسلة ✅')
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>XAVOV</h1>
      <h2>Products</h2>

      {loading && <p>جارٍ التحميل...</p>}

      {!loading && products.length === 0 && (
        <p style={{ color: '#888' }}>لا توجد منتجات حالياً</p>
      )}

      {products.map((p) => (
        <div
          key={p.id}
          style={{
            background: '#111',
            padding: 20,
            marginBottom: 20,
            borderRadius: 10,
          }}
        >
          <h3
            style={{ cursor: 'pointer' }}
            onClick={() => router.push(`/products/${p.id}`)}
          >
            {p.name}
          </h3>
          <p>{p.price} SAR</p>

          <button
            onClick={() => addToCart(p)}
            style={{
              background: 'gold',
              padding: '10px 15px',
              borderRadius: 8,
              cursor: 'pointer',
              border: 'none',
            }}
          >
            Add To Cart
          </button>
        </div>
      ))}
    </div>
  )
}
