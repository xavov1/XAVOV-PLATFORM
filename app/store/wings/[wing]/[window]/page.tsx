'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function WingPage() {
  const router = useRouter()

  useEffect(() => {
    router.push('/products')
  }, [])

  return <p>Loading...</p>
}