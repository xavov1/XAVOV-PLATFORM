import Link from "next/link";

export default function ProductsPage() {
  const sections = [
    { letter: "A", name: "الأجهزة الذكية وملحقاتها" },
    { letter: "B", name: "الأجهزة المنزلية والطبية وملحقاتها" },
    { letter: "C", name: "الأدوات الصناعية والزراعية" },
    { letter: "D", name: "الإلكترونيات العامة" },
    { letter: "G", name: "الألعاب والترفيه" },
    { letter: "F", name: "قطع غيار السيارات والإكسسوارات" },
    { letter: "E", name: "العروض والصفقات" },
  ];

  return (
    <div
      dir="rtl"
      style={{
        minHeight: "100vh",
        background: "#0f0f11",
        padding: 80,
        fontFamily: "system-ui",
        color: "#ffffff",
      }}
    >
      <Link href="/" style={{ color: "#888", textDecoration: "none" }}>
        ← الرجوع
      </Link>

      <h1 style={{ marginTop: 50, marginBottom: 60, fontWeight: 300 }}>
        أقسام المنتجات
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: 25,
        }}
      >
        {sections.map((section) => (
          <Link
            key={section.letter}
            href={`/products/${section.letter}`}
            style={{ textDecoration: "none" }}
          >
            <div style={cardStyle}>
              <div style={{ fontSize: 26, marginBottom: 12, color: "#ffffff" }}>
                {section.letter}
              </div>
              <div style={{ fontSize: 14, color: "#e5e5e5" }}>
                {section.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

const cardStyle = {
  padding: 35,
  borderRadius: 18,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  textAlign: "center" as const,
  transition: "all 0.25s ease",
};