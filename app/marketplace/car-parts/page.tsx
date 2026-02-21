'use client';
import Link from 'next/link';

export default function CarParts() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-16">
      <h1 className="text-4xl font-bold text-[#D4AF37] mb-12">قطع غيار السيارات والإكسسوارات</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full px-6">
        <div className="border border-[#D4AF37] rounded-xl p-6">
          <h2 className="text-xl font-bold">XAVOV Dash Cam</h2>
          <p className="text-gray-400">كاميرا سيارة 4K</p>
          <p className="text-[#D4AF37] font-bold mt-2">760 SAR</p>
          <Link href="/cart"><button className="mt-4 w-full bg-[#D4AF37] text-black py-2 rounded-xl">طلب الآن</button></Link>
        </div>

        <div className="border border-[#D4AF37] rounded-xl p-6">
          <h2 className="text-xl font-bold">XAVOV Tire Sensor</h2>
          <p className="text-gray-400">حساس ضغط الإطارات</p>
          <p className="text-[#D4AF37] font-bold mt-2">540 SAR</p>
          <Link href="/cart"><button className="mt-4 w-full bg-[#D4AF37] text-black py-2 rounded-xl">طلب الآن</button></Link>
        </div>
      </div>
    </div>
  );
}
