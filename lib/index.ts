// lib/index.ts
// الهدف: توفير نقطة دخول "@/lib" حتى لا يفشل Build في Vercel

type AnyJson = any;

function getBaseUrl() {
  // في Vercel
  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) return `https://${vercelUrl}`;

  // لو حطيت دومينك لاحقًا (اختياري)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl) return siteUrl;

  // محليًا
  return "http://localhost:3000";
}

async function safeJson(res: Response): Promise<AnyJson> {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}

/**
 * جلب الطلبات (يعتمد على /api/orders عندك)
 */
export async function getMyOrders() {
  const base = getBaseUrl();
  const res = await fetch(`${base}/api/orders`, { cache: "no-store" });
  if (!res.ok) throw new Error(`getMyOrders failed: ${res.status}`);
  return safeJson(res);
}

/**
 * جلب طلب واحد (fallback: يجلب كل الطلبات ثم يبحث عن id)
 */
export async function getOrder(id: string) {
  const data = await getMyOrders();
  const list = Array.isArray(data) ? data : data?.orders || [];
  return list.find((o: any) => String(o.id) === String(id)) ?? null;
}

/**
 * تحديث حالة الطلب (حاليًا يحاول عبر /api/orders/[id]/pay إن كان يستقبل POST)
 * لو endpoint مختلف لاحقًا نعدله، المهم الآن يمر Build.
 */
export async function updateOrderStatus(id: string, status: string) {
  const base = getBaseUrl();
  const res = await fetch(`${base}/api/orders/${id}/pay`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  // حتى لو endpoint يرجع 405/404 الآن، لا نكسر الواجهة
  if (!res.ok) return { ok: false, status: res.status, id, newStatus: status };
  return safeJson(res);
}

/**
 * تحميل الفاتورة - placeholder آمن (نفعّله لاحقًا حسب مسارك الفعلي)
 */
export function downloadInvoice(_id: string) {
  return null;
}