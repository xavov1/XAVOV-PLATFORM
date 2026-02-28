"use client";

import { useEffect, useState } from "react";

type OrderRow = {
  id: string;
  total: number | string;
  fullName?: string | null;
  phone?: string | null;
  address?: string | null;
  paymentStatus?: string | null;
  status?: string | null;
  createdAt?: string | null;
};

function formatMoney(total: number | string) {
  const n = typeof total === "string" ? Number(total) : total;
  if (Number.isFinite(n)) return `${n} ريال`;
  return `${total} ريال`;
}

export default function AdminPage() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/orders", { cache: "no-store" });
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function setStatus(id: string, status: "pending" | "preparing" | "shipped" | "delivered") {
    await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await load();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xl font-semibold tracking-widest">XAVOV</div>
            <div className="text-sm opacity-70">لوحة الإدارة</div>
          </div>

          <button
            onClick={load}
            className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
          >
            تحديث
          </button>
        </div>

        <div className="mt-8 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl p-6">
          <div className="text-lg font-bold">الطلبات</div>
          <div className="text-xs opacity-70 mt-1">تحديث حالة الطلب ينعكس فورًا في صفحة التتبع.</div>

          {loading && (
            <div className="mt-6 opacity-80">جاري التحميل…</div>
          )}

          {!loading && orders.length === 0 && (
            <div className="mt-6 opacity-80">لا يوجد طلبات.</div>
          )}

          <div className="mt-6 space-y-4">
            {orders.map((o) => (
              <div
                key={o.id}
                className="rounded-2xl border border-white/10 bg-black/30 p-5"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <div className="text-xs opacity-70">رقم الطلب</div>
                    <div className="font-mono text-sm break-words">{o.id}</div>
                  </div>

                  <div className="text-sm font-semibold">{formatMoney(o.total)}</div>

                  <div className="flex items-center gap-2 text-sm">
                    <span className="opacity-70">الدفع:</span>
                    <span className={`font-semibold ${String(o.paymentStatus).toLowerCase().includes("paid") ? "text-emerald-300" : "text-yellow-200"}`}>
                      {String(o.paymentStatus).toLowerCase().includes("paid") ? "PAID" : (o.paymentStatus || "PENDING")}
                    </span>
                  </div>

                  <a
                    href={`/track/${o.id}`}
                    className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
                  >
                    فتح التتبع
                  </a>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <StatusBtn label="قيد التجهيز" onClick={() => setStatus(o.id, "preparing")} />
                  <StatusBtn label="تم الشحن" onClick={() => setStatus(o.id, "shipped")} />
                  <StatusBtn label="تم التسليم" onClick={() => setStatus(o.id, "delivered")} />
                </div>

                <div className="mt-3 text-xs opacity-70">
                  الحالة الحالية: <span className="font-semibold text-white">{o.status || "pending"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
      type="button"
    >
      {label}
    </button>
  );
}