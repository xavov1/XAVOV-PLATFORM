import Link from "next/link";

export default function MarketplacePage() {
  const categories = [
    {
      title: "الأجهزة الذكية وملحقاتها",
      href: "/marketplace/electronics",
    },
    {
      title: "الأجهزة المنزلية والطبية وملحقاتها",
      href: "/marketplace/home-appliances",
    },
    {
      title: "الأدوات الصناعية والزراعية",
      href: "/marketplace/industrial-agriculture",
    },
    {
      title: "الإلكترونيات العامة",
      href: "/marketplace/electronics",
    },
    {
      title: "الألعاب والترفيه",
      href: "/marketplace/gaming",
    },
    {
      title: "قطع غيار السيارات والإكسسوارات",
      href: "/marketplace/car-parts",
    },
    {
      title: "العروض والصفقات",
      href: "/marketplace/deals",
    },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg,#000,#0b0b0b)",
        padding: "80px 40px",
        color: "#fff",
      }}
    >
      {/* الشعار */}
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <h1
          style={{
            fontSize: "56px",
            fontWeight: "900",
            letterSpacing: "4px",
            background: "linear-gradient(90deg,#d4af37,#f5d76e)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          XAVOV
        </h1>
        <p style={{ opacity: 0.6, marginTop: "10px" }}>
          المنتجات
        </p>
      </div>

      {/* الأقسام */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
          gap: "24px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {categories.map((cat) => (
          <Link
            key={cat.title}
            href={cat.href}
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                padding: "28px",
                borderRadius: "14px",
                border: "1px solid rgba(212,175,55,0.4)",
                background: "#0f0f0f",
                textAlign: "center",
                cursor: "pointer",
                transition: "0.2s",
              }}
            >
              <h3 style={{ fontSize: "18px", color: "#fff" }}>
                {cat.title}
              </h3>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
