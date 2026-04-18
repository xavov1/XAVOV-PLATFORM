import type { Metadata } from "next"
import { Cinzel, Cairo, Cormorant_Garamond } from 'next/font/google'
import { CartProvider } from "./context/CartContext"
import "./globals.css"

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-cinzel',
  display: 'swap',
})

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-cairo',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "XAVOV",
  description: "منصة XAVOV للتجارة الإلكترونية",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cinzel.variable} ${cairo.variable} ${cormorant.variable}`}
    >
      <body className="m-0 p-0 bg-xav-bg font-cairo text-xav-text overflow-x-hidden">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
