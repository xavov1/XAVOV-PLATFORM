'use client';
import Link from 'next/link';

export default function IndustrialAgriculture() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-16">
      <h1 className="text-4xl font-bold text-[#D4AF37] mb-12">الأدوات الصناعية والزراعية</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full px-6">
        <div className="border border-[#D4AF37] rounded-xl p-6">
          <h2 className="text-xl font-bold">XAVOV Smart Pump</h2>
          <p className="text-gray-400">مضخة مياه ذكية</p>
          <p className="text-[#D4AF37] font-bold mt-2">2100 SAR</p>
          <Link href="/cart"><button className="mt-4 w-full bg-[#D4AF37] text-black py-2 rounded-xl">طلب الآن</button></Link>
        </div>

        <div className="border border-[#D4AF37] rounded-xl p-6">
          <h2 className="text-xl font-bold">XAVOV Solar Kit</h2>
          <p className="text-gray-400">طاقة شمسية متنقلة</p>
          <p className="text-[#D4AF37] font-bold mt-2">3200 SAR</p>
          <Link href="/cart"><button className="mt-4 w-full bg-[#D4AF37] text-black py-2 rounded-xl">طلب الآن</button></Link>
        </div>
      </div>
    </div>
  );
}
