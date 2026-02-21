'use client';
import Link from 'next/link';

export default function GamingPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-16">
      <h1 className="text-4xl font-bold text-[#D4AF37] mb-12">الألعاب والترفيه</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full px-6">
        <div className="border border-[#D4AF37] rounded-xl p-6">
          <h2 className="text-xl font-bold">XAVOV Game Pad</h2>
          <p className="text-gray-400">يد تحكم احترافية</p>
          <p className="text-[#D4AF37] font-bold mt-2">390 SAR</p>
          <Link href="/cart"><button className="mt-4 w-full bg-[#D4AF37] text-black py-2 rounded-xl">طلب الآن</button></Link>
        </div>

        <div className="border border-[#D4AF37] rounded-xl p-6">
          <h2 className="text-xl font-bold">XAVOV Headset X</h2>
          <p className="text-gray-400">سماعة ألعاب 7.1</p>
          <p className="text-[#D4AF37] font-bold mt-2">720 SAR</p>
          <Link href="/cart"><button className="mt-4 w-full bg-[#D4AF37] text-black py-2 rounded-xl">طلب الآن</button></Link>
        </div>
      </div>
    </div>
  );
}
