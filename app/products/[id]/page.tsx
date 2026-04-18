'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import ProductViewer from '@/app/components/ProductViewer'

export default function ProductPage() {
  const params            = useParams()
  const id                = params?.id as string
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log('PRODUCTS FROM DB:', data)
        setProduct(data?.error ? null : data)
        setLoading(false)
      })
      .catch(err => {
        console.error('PRODUCT FETCH ERROR:', err)
        setLoading(false)
      })
  }, [id])

  if (loading)  return <div style={{ padding: 40 }}>جارٍ التحميل...</div>
  if (!product) return <div style={{ padding: 40 }}>المنتج غير موجود</div>

  return (
    <div style={{ padding: 40 }}>
      <h1>{product.name}</h1>
      <p>السعر: {product.price} ريال</p>
      <ProductViewer product={product} />
    </div>
  )
}
