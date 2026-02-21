import Link from 'next/link'

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          gap: '20px',
          padding: '12px 24px',
          borderBottom: '1px solid #333',
          marginBottom: '24px',
        }}
      >
        <Link href="/marketplace">Marketplace</Link>
        <Link href="/products">Products</Link>
        <Link href="/auctions">Auctions</Link>
      </div>

      {children}
    </div>
  )
}
