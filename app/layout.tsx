import "./globals.css";

export const metadata = {
  title: "XAVOV",
  description: "XAVOV Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar">
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#000000",
          color: "#ffffff",
          minHeight: "100vh",
        }}
      >
        {children}
      </body>
    </html>
  );
}
