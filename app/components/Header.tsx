import Link from "next/link";

export default function Header() {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        borderBottom: "1px solid #222",
        backgroundColor: "#0b0b0b",
      }}
    >
      {/* LOGO */}
      <div
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          color: "#d4af37",
        }}
      >
        XAVOV
      </div>

      {/* NAV */}
      <nav style={{ display: "flex", gap: "16px" }}>
        <Link href="/" style={{ color: "#fff", textDecoration: "none" }}>
          Home
        </Link>
        <Link
          href="/marketplace"
          style={{ color: "#fff", textDecoration: "none" }}
        >
          Marketplace
        </Link>
        <Link
          href="/products"
          style={{ color: "#fff", textDecoration: "none" }}
        >
          Products
        </Link>
        <Link
          href="/auctions"
          style={{ color: "#fff", textDecoration: "none" }}
        >
          Auctions
        </Link>
      </nav>
    </header>
  );
}
