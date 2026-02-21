'use client';
import Link from 'next/link';

export default function ElectronicsPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-16">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-[#D4AF37] tracking-widest drop-shadow-[0_0_18px_rgba(212,175,55,0.35)]">
          XAVOV
        </h1>
        <p className="mt-3 text-gray-300 font-semibold">الإلكترونيات العامة</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full px-6">
        <div className="border border-[#D4AF37] rounded-xl p-6 bg-black/40">
          <h2 className="text-xl font-bold">XAVOV Power Hub</h2>
          <p className="text-gray-400 mt-1">شاحن متعدد المنافذ</p>
          <p className="text-[#D4AF37] font-bold mt-3">420 SAR</p>
          <Link href="/cart">
            <button className="mt-5 w-full bg-[#D4AF37] text-black py-2 rounded-xl font-bold">
              طلب الآن
            </button>
          </Link>
        </div>

        <div className="border border-[#D4AF37] rounded-xl p-6 bg-black/40">
          <h2 className="text-xl font-bold">XAVOV Screen Pro</h2>
          <p className="text-gray-400 mt-1">شاشة 27 بوصة</p>
          <p className="text-[#D4AF37] font-bold mt-3">1890 SAR</p>
          <Link href="/cart">
            <button className="mt-5 w-full bg-[#D4AF37] text-black py-2 rounded-xl font-bold">
              طلب الآن
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
