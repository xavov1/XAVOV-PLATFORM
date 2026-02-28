import Link from "next/link";

export default function Home() {
  return (
    <div
      dir="rtl"
      style={{
        minHeight: "100vh",
        background: "#111111",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 100,
        fontFamily: "system-ui",
        color: "#eee",
      }}
    >
      <h1 style={{ fontSize: 48, marginBottom: 80, fontWeight: 300 }}>
        XAVOV
      </h1>

      <div
        style={{
          display: "flex",
          gap: 40,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Link href="/products" style={{ textDecoration: "none" }}>
          <div style={cardStyle}>المنتجات</div>
        </Link>

        <div style={cardStyle}>العضويات</div>
        <div style={cardStyle}>المزادات</div>
        <div style={cardStyle}>اللوجستي</div>
      </div>
    </div>
  );
}

const cardStyle = {
  width: 260,
  height: 150,
  borderRadius: 18,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 18,
  cursor: "pointer",
};