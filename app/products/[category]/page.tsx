import Link from "next/link"
import AddToCartButton from "../../../components/AddToCartButton"

const productsData: Record<string, string[]> = {
  A: [
    "سماعة بلوتوث لاسلكية",
    "ساعة ذكية مقاومة للماء",
    "جهاز لوحي بشاشة 10 بوصة",
    "سماعة رأس عازلة للضوضاء",
    "شاشة LED 24 بوصة",
  ],
  B: ["غسالة أوتوماتيك 8 كجم", "ثلاجة بابين 18 قدم", "مكيف سبليت 1.5 حصان"],
  C: ["مفك كهربائي صناعي", "مولد كهرباء محمول"],
  D: ["كيبورد ميكانيكي RGB", "ماوس احترافي للألعاب"],
  E: ["لعبة سباق سيارات", "يد تحكم لاسلكية"],
  F: ["بطارية سيارة 70 أمبير", "فلتر زيت محرك"],
  G: ["عرض خاص: باقة إلكترونيات"],
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const products = productsData[category] || []

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f0f11",
        padding: 40,
        fontFamily: "system-ui",
        color: "#ffffff",
      }}
    >
      <Link href="/products" style={{ color: "#888", textDecoration: "none" }}>
        ← الرجوع للأقسام
      </Link>

      <h1 style={{ marginTop: 50, marginBottom: 60 }}>
        منتجات القسم {category}
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))",
          gap: 30,
        }}
      >
        {products.map((product, index) => (
          <div
            key={index}
            style={{
              padding: 25,
              borderRadius: 18,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              textAlign: "center",
            }}
          >
            <div>{product}</div>

            <AddToCartButton id={`${category}-${index}`} name={product} />
          </div>
        ))}
      </div>
    </div>
  )
}