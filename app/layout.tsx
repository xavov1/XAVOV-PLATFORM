import './globals.css'
import Header from './components/Header'

export const metadata = {
  title: 'XAVOV',
  description: 'منصة التجارة الصينية السعودية'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body
        style={{
          background: '#050810',
          color: '#F0EDE8',
          margin: 0,
          fontFamily: 'Cairo, sans-serif'
        }}
      >
        <Header />

        <main style={{ padding: '32px 24px' }}>
          {children}
        </main>

      </body>
    </html>
  )
}