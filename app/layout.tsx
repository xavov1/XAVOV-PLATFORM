import "./globals.css"
import CartIcon from "../components/CartIcon"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar">
      <body
        style={{
          margin: 0,
          background: "#0f0f11",
          color: "#fff",
          fontFamily: "system-ui",
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 40px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <h2 style={{ margin: 0 }}>XAVOV</h2>
          <CartIcon />
        </header>

        <main>{children}</main>
      </body>
    </html>
  )
}