'use client'

import { useEffect, useState } from 'react'

export default function TrackPage() {
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    const data = localStorage.getItem('orders')
    if (data) setOrders(JSON.parse(data))
  }, [])

  const updateOrders = (newOrders:any[]) => {
    setOrders(newOrders)
    localStorage.setItem('orders', JSON.stringify(newOrders))
  }

  // 🔥 تغيير حالة الطلب
  const nextStatus = (i:number) => {
    const newOrders = [...orders]

    const statusFlow = [
      'processing',
      'preparing',
      'onway',
      'delivered'
    ]

    const currentIndex = statusFlow.indexOf(newOrders[i].status)
    if (currentIndex < statusFlow.length - 1) {
      newOrders[i].status = statusFlow[currentIndex + 1]
    }

    updateOrders(newOrders)
  }

  // 🔥 استلام الطلب + نقطتين
  const confirmDelivery = (i:number) => {
    const newOrders = [...orders]

    if (!newOrders[i].pointsGiven) {
      newOrders[i].points += 2
      newOrders[i].pointsGiven = true
    }

    newOrders[i].delivered = true
    updateOrders(newOrders)
  }

  // 🔥 التقييم + 3 نقاط
  const giveReview = (i:number) => {
    const newOrders = [...orders]

    if (!newOrders[i].reviewGiven) {
      newOrders[i].points += 3
      newOrders[i].reviewGiven = true
    }

    updateOrders(newOrders)
  }

  const getStatusText = (status:string) => {
    switch(status) {
      case 'processing': return 'تم تأكيد الطلب'
      case 'preparing': return 'جاري تجهيز الطلب'
      case 'onway': return 'الطلب قادم إليك'
      case 'delivered': return 'تم التسليم'
      default: return status
    }
  }

  return (
    <div style={{padding:20, maxWidth:600, margin:'auto', color:'#fff'}}>

      <h2>تتبع الطلب</h2>

      {orders.map((order, i) => (
        <div key={i} style={card}>

          <p><b>رقم الطلب:</b> {order.id}</p>
          <p><b>الحالة:</b> {getStatusText(order.status)}</p>
          <p><b>المجموع:</b> {order.total} ريال</p>
          <p><b>العنوان:</b> {order.city} - {order.street}</p>

          <p><b>المنتجات:</b></p>
          {order.items.map((item:any, idx:number)=>(
            <div key={idx}>• {item.name}</div>
          ))}

          {/* 🔥 تغيير الحالة */}
          {order.status !== 'delivered' && (
            <button style={btn} onClick={()=>nextStatus(i)}>
              التالي
            </button>
          )}

          {/* 🔥 استلام */}
          {order.status === 'delivered' && !order.delivered && (
            <button style={btnGreen} onClick={()=>confirmDelivery(i)}>
              تم الاستلام (+2 نقاط)
            </button>
          )}

          {/* 🔥 تقييم */}
          {order.delivered && !order.reviewGiven && (
            <button style={btnBlue} onClick={()=>giveReview(i)}>
              تقييم الطلب (+3 نقاط)
            </button>
          )}

          <p style={{marginTop:10}}>نقاطك: {order.points}</p>

        </div>
      ))}

    </div>
  )
}

const card = {
  border:'1px solid rgba(255,255,255,0.1)',
  padding:'12px',
  marginBottom:'15px',
  background:'rgba(255,255,255,0.03)'
}

const btn = {
  width:'100%',
  padding:'12px',
  background:'#444',
  color:'#fff',
  border:'none',
  marginTop:'10px',
  cursor:'pointer'
}

const btnGreen = {
  width:'100%',
  padding:'12px',
  background:'green',
  color:'#fff',
  border:'none',
  marginTop:'10px',
  cursor:'pointer'
}

const btnBlue = {
  width:'100%',
  padding:'12px',
  background:'#0070f3',
  color:'#fff',
  border:'none',
  marginTop:'10px',
  cursor:'pointer'
}