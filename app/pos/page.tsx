"use client";

import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
};

type Order = {
  id: string;
  status: string;
  total: number;
  currency: string;
  createdAt: string;
  paidAt?: string | null;
  user?: User;
};

export default function POSPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [userId, setUserId] = useState("");
  const [totalSar, setTotalSar] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    setLoading(true);
    const u = await fetch("/api/users").then(r => r.json());
    const o = await fetch("/api/orders").then(r => r.json());

    setUsers(Array.isArray(u) ? u : []);
    setOrders(Array.isArray(o) ? o : []);

    if (Array.isArray(u) && u.length > 0) {
      setUserId(u[0].id);
    }

    setLoading(false);
  }

  async function createOrder() {
    if (!userId || !totalSar) return;

    setLoading(true);
    await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        totalSar: Number(totalSar),
        items: [],
      }),
    });

    setTotalSar("");
    await loadAll();
    setLoading(false);
  }

  async function pay(orderId: string) {
    setLoading(true);
    await fetch(`/api/orders/${orderId}/pay`, {
      method: "POST",
    });
    await loadAll();
    setLoading(false);
  }

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 22, fontWeight: "bold" }}>XAVOV – POS</h1>

      <div style={{ marginTop: 20, padding: 16, border: "1px solid #333" }}>
        <h2>إنشاء طلب</h2>

        <label>اختر المستخدم</label>
        <select
          value={userId}
          onChange={e => setUserId(e.target.value)}
          style={{ display: "block", marginBottom: 8, width: 300 }}
        >
          <option value="">-- اختر مستخدم --</option>
          {users.map(u => (
            <option key={u.id} value={u.id}>
              {u.name} ({u.email})
            </option>
          ))}
        </select>

        <input
          placeholder="المبلغ (SAR)"
          value={totalSar}
          onChange={e => setTotalSar(e.target.value)}
          style={{ display: "block", marginBottom: 8, width: 300 }}
        />

        <button onClick={createOrder} disabled={loading}>
          إنشاء الطلب
        </button>
      </div>

      <div style={{ marginTop: 30 }}>
        <h2>الطلبات</h2>

        {orders.map(o => (
          <div
            key={o.id}
            style={{
              border: "1px solid #444",
              padding: 12,
              marginBottom: 10,
            }}
          >
            <div>ID: {o.id}</div>
            <div>الحالة: {o.status}</div>
            <div>
              المبلغ: SAR {(o.total / 100).toFixed(2)}
            </div>
            <div>العميل: {o.user?.name}</div>

            {o.status !== "PAID" && (
              <button onClick={() => pay(o.id)}>دفع</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
