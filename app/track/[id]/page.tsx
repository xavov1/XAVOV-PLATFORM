"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

type OrderRow = {
  id: string;
  total: number | string;
  fullName?: string | null;
  phone?: string | null;
  address?: string | null;
  paymentStatus?: string | null; // paid | pending ...
  status?: string | null; // pending | preparing | shipped | delivered ...
  createdAt?: string | null;
};

const STATUS_FLOW = ["paid", "preparing", "shipped", "delivered"] as const;

function normalizePaymentStatus(v?: string | null) {
  const s = (v || "").toLowerCase();
  if (s.includes("paid") || s === "success" || s === "succeeded") return "paid";
  return "pending";
}

function normalizeOrderStatus(v?: string | null) {
  const s = (v || "").toLowerCase();
  if (s.includes("deliver")) return "delivered";
  if (s.includes("ship")) return "shipped";
  if (s.includes("prep")) return "preparing";
  return "preparing"; // بعد الدفع الافتراضي: قيد التجهيز
}

function formatMoney(total: number | string) {
  const n = typeof total === "string" ? Number(total) : total;
  if (Number.isFinite(n)) return `${n} ريال`;
  return `${total} ريال`;
}

export default function TrackOrderPage() {
  const params = useParams();
  const id = String(params?.id || "");

  const [order, setOrder] = useState<OrderRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string>("");

  useEffect(() => {
    let mounted = true;
    async function run() {
      setLoading(true);
      setErr("");
      try {
        const res = await fetch(`/api/orders/${id}`, { cache: "no-store" });
        if (!res.ok) {
          const t = await res.text();
          throw new Error(t || `HTTP ${res.status}`);
        }
        const data = (await res.json()) as OrderRow;
        if (mounted) setOrder(data);
      } catch (e: any) {
        if (mounted) setErr(e?.message || "فشل تحميل الطلب");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    if (id) run();
    return () => {
      mounted = false;
    };
  }, [id]);

  const flowIndex = useMemo(() => {
    if (!order) return 0;
    const pay = normalizePaymentStatus(order.paymentStatus);
    if (pay !== "paid") return 0;

    const st = normalizeOrderStatus(order.status);
    const idx = STATUS_FLOW.indexOf(st as any);
    return Math.max(1, idx); // 1 = preparing
  }, [order]);

  const progressPct = useMemo(() => {
    // 0..3
    const max = STATUS_FLOW.length - 1; // 3
    const v = Math.min(Math.max(flowIndex, 0), max);
    return (v / max) * 100;
  }, [flowIndex]);

  const isDone = flowIndex >= 3;

  return (
    <div className="min-h-screen w-full bg-black text-white relative overflow-hidden">
      {/* خلفية فخمة */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute top-20 -right-40 h-[560px] w-[560px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-[-220px] left-1/2 -translate-x-1/2 h-[520px] w-[820px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold tracking-widest">XAVOV</div>
          <div className="text-xs opacity-70">Order Tracking • XA</div>
        </div>

        <div className="mt-8 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl shadow-[0_0_60px_rgba(255,255,255,0.06)]">
          <div className="p-8">
            <h1 className="text-3xl font-bold">تتبّع الطلب</h1>
            <p className="mt-1 text-sm opacity-80">
              تتبّع حيّ لحالة الدفع وتجهيز وشحن وتسليم الطلب — بأسلوب XAVOV الفخم.
            </p>

            {loading && (
              <div className="mt-8 rounded-xl border border-white/10 bg-black/30 p-6">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 w-40 rounded bg-white/10" />
                  <div className="h-4 w-64 rounded bg-white/10" />
                  <div className="h-10 w-full rounded bg-white/10" />
                </div>
              </div>
            )}

            {!loading && err && (
              <div className="mt-8 rounded-xl border border-red-500/30 bg-red-500/10 p-6">
                <div className="font-semibold">تعذر فتح الطلب</div>
                <div className="mt-1 text-sm opacity-90 break-words">{err}</div>
                <div className="mt-4 text-xs opacity-70">
                  تأكد من رقم الطلب في الرابط: <span className="font-mono">{id}</span>
                </div>
              </div>
            )}

            {!loading && !err && order && (
              <>
                {/* ملخص */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-xl border border-white/10 bg-black/30 p-5">
                    <div className="text-xs opacity-70">رقم الطلب</div>
                    <div className="mt-2 font-mono text-sm break-words">{order.id}</div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/30 p-5">
                    <div className="text-xs opacity-70">الإجمالي</div>
                    <div className="mt-2 text-lg font-bold">{formatMoney(order.total)}</div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/30 p-5">
                    <div className="text-xs opacity-70">حالة الدفع</div>
                    <div className="mt-2 inline-flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          normalizePaymentStatus(order.paymentStatus) === "paid" ? "bg-emerald-400" : "bg-yellow-300"
                        }`}
                      />
                      <span className="font-semibold">
                        {normalizePaymentStatus(order.paymentStatus) === "paid" ? "تم الدفع ✅" : "بانتظار الدفع ⏳"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* شريط التقدم الفخم */}
                <div className="mt-7 rounded-2xl border border-white/10 bg-black/25 p-6">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">مراحل الطلب</div>
                    <div className="text-xs opacity-70">{isDone ? "مكتمل" : "قيد التنفيذ"}</div>
                  </div>

                  <div className="mt-5">
                    <div className="relative h-3 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="absolute left-0 top-0 h-full rounded-full bg-white/70 transition-all duration-700"
                        style={{ width: `${progressPct}%` }}
                      />
                      <div
                        className="absolute left-0 top-0 h-full w-[140px] bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-40 animate-[shine_2.2s_linear_infinite]"
                        style={{ transform: `translateX(${Math.min(progressPct, 100)}%)` }}
                      />
                    </div>

                    {/* نقاط المراحل */}
                    <div className="mt-6 grid grid-cols-4 gap-2 text-center">
                      <StepBadge active={flowIndex >= 0} done={normalizePaymentStatus(order.paymentStatus) === "paid"} label="تم الدفع" icon="✓" />
                      <StepBadge active={flowIndex >= 1} done={flowIndex > 1} label="قيد التجهيز" icon="📦" />
                      <StepBadge active={flowIndex >= 2} done={flowIndex > 2} label="تم الشحن" icon="🚚" />
                      <StepBadge active={flowIndex >= 3} done={flowIndex >= 3} label="تم التسليم" icon="📍" />
                    </div>
                  </div>

                  <div className="mt-6 text-sm opacity-85">
                    {flowIndex === 0 && "بانتظار الدفع… بمجرد إتمام الدفع يبدأ تجهيز الطلب."}
                    {flowIndex === 1 && "طلبك الآن قيد التجهيز داخل منظومة XAVOV."}
                    {flowIndex === 2 && "تم شحن الطلب — في الطريق إليك."}
                    {flowIndex === 3 && "تم تسليم الطلب بنجاح ✅"}
                  </div>
                </div>

                {/* بيانات العميل (اختياري عرض) */}
                <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-6">
                  <div className="font-semibold">بيانات الاستلام</div>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <Info label="الاسم" value={order.fullName || "-"} />
                    <Info label="الجوال" value={order.phone || "-"} />
                    <Info label="العنوان" value={order.address || "-"} />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <style jsx global>{`
          @keyframes shine {
            0% { transform: translateX(-160px); }
            100% { transform: translateX(680px); }
          }
        `}</style>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/30 p-4">
      <div className="text-xs opacity-70">{label}</div>
      <div className="mt-2 font-semibold break-words">{value}</div>
    </div>
  );
}

function StepBadge({
  active,
  done,
  label,
  icon,
}: {
  active: boolean;
  done: boolean;
  label: string;
  icon: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={[
          "h-12 w-12 rounded-2xl flex items-center justify-center border backdrop-blur-md transition-all duration-500",
          done ? "bg-emerald-500/15 border-emerald-400/40 shadow-[0_0_30px_rgba(16,185,129,0.18)]" : "",
          !done && active ? "bg-white/10 border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.10)]" : "",
          !active ? "bg-black/20 border-white/10 opacity-60" : "",
        ].join(" ")}
      >
        <span className="text-lg">{icon}</span>
      </div>
      <div className={["text-xs", done ? "opacity-95 font-semibold" : "opacity-75"].join(" ")}>{label}</div>
    </div>
  );
}