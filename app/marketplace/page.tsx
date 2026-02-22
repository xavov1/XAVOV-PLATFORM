export default function MarketplacePage() {
  const trunks = [
    { code: "A", title: "الأجهزة الذكية وملحقاتها" },
    { code: "B", title: "الأجهزة المنزلية والطبية وملحقاتها" },
    { code: "C", title: "الأدوات الصناعية والزراعية" },
    { code: "D", title: "الإلكترونيات العامة" },
    { code: "G", title: "الألعاب والترفيه" },
    { code: "F", title: "قطع غيار السيارات والإكسسوارات" },
    { code: "E", title: "العروض والصفقات" },
  ];

  return (
    <main className="xv">
      <div className="xv-bg" />
      <div className="xv-grid" />
      <div className="xv-dust" />

      <section className="xv-frame">
        <header className="xv-header">
          <div className="xv-brand">XAVOV</div>
          <div className="xv-tagline">Innovate. Connect. Succeed.</div>

          <div className="xv-subTitle">DISCOVER PRODUCTS</div>
          <p className="xv-subText">
            بوابة المنتجات الرسمية — اختر الجذع للدخول إلى أقسام XAVOV.
          </p>
        </header>

        <div className="xv-cards">
          {trunks.map((t) => (
            <a key={t.code} href="#" className="xv-card">
              <div className="xv-icon">
                <span className="xv-code">{t.code}</span>
              </div>
              <div className="xv-cardTitle">{t.title}</div>
              <div className="xv-cardDesc">دخول سريع إلى هذا الجذع</div>
            </a>
          ))}
        </div>

        <div className="xv-footer">
          <button className="xv-btn">Browse Trunks</button>
        </div>
      </section>
    </main>
  );
}