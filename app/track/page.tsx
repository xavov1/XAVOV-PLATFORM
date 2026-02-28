export const dynamic = 'force-dynamic'

type Props = {
  searchParams: {
    orderId?: string
  }
}

export default function TrackPage({ searchParams }: Props) {
  const orderId = searchParams.orderId

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-zinc-900 p-8 rounded-xl shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4">Track Your Order</h1>

        {orderId ? (
          <p className="text-lg">
            Tracking Order ID: <span className="text-green-400">{orderId}</span>
          </p>
        ) : (
          <p className="text-red-400">
            No Order ID provided.
          </p>
        )}
      </div>
    </div>
  )
}