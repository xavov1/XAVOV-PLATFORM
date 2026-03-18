'use client'

import { useEffect, useState } from 'react'

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    // بيانات مؤقتة (بدل API عشان نوقف الأخطاء)
    setProducts([
      { id: 1, name: 'ثلاجة', price: 2800 },
      { id: 2, name: 'تلفزيون', price: 3199 },
      { id: 3, name: 'غسالة', price: 2100 },
    ])
  }, [])

  const addToCart = (product: any) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    cart.push(product)
    localStorage.setItem('cart', JSON.stringify(cart))
    alert('تمت الإضافة للسلة ✅')
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>XAVOV</h1>
      <h2>Products</h2>

      {products.map((p, index) => (
        <div
          key={index}
          style={{
            background: '#111',
            padding: 20,
            marginBottom: 20,
            borderRadius: 10,
          }}
        >
          <h3>{p.name}</h3>
          <p>{p.price} SAR</p>

          <button
            onClick={() => addToCart(p)}
            style={{
              background: 'gold',
              padding: '10px 15px',
              borderRadius: 8,
            }}
          >
            Add To Cart
          </button>
        </div>
      ))}
    </div>
  )
}