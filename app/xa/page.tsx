"use client"

import Link from "next/link"

export default function XAGate() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-white">

      <h1 className="text-4xl mb-12">
        XA Gate
      </h1>

      <div className="grid grid-cols-2 gap-8">

        <Link href="/laoshi">
          <div className="w-56 h-32 rounded-xl border border-white/20 backdrop-blur-md flex items-center justify-center hover:scale-105 transition cursor-pointer">
            Lǎoshī
          </div>
        </Link>

        <Link href="/carrier">
          <div className="w-56 h-32 rounded-xl border border-white/20 backdrop-blur-md flex items-center justify-center hover:scale-105 transition cursor-pointer">
            Carrier
          </div>
        </Link>

      </div>

    </main>
  )
}