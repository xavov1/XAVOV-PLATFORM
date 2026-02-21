"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CartPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);
  }, []);

  const handleCheckout = () => {
    if (!userId) {
      router.push("/auth");
    } else {
      router.push("/checkout");
    }
  };

  return (
    <div>
      <h1>سلة XAVOV</h1>

      <button
        onClick={handleCheckout}
        style={{ padding: 10, background: "gold" }}
      >
        إتمام الطلب
      </button>
    </div>
  );
}
