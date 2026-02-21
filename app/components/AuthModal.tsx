"use client";

import { useState } from "react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (value: string) => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  onSubmit,
}: AuthModalProps) {
  const [value, setValue] = useState("");

  if (!isOpen) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3 style={{ marginBottom: 10 }}>إتمام الطلب</h3>
        <p style={{ marginBottom: 15 }}>أدخل الإيميل أو رقم الجوال</p>

        <input
          type="text"
          placeholder="example@email.com أو 05xxxxxxxx"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={inputStyle}
        />

        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button onClick={onClose} style={cancelBtn}>
            إلغاء
          </button>

          <button
            onClick={() => {
              if (!value.trim()) return;
              onSubmit(value);
              setValue("");
            }}
            style={confirmBtn}
          >
            حسناً
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===== Styles ===== */

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  background: "#111",
  padding: 25,
  borderRadius: 10,
  width: 360,
  color: "#fff",
  border: "1px solid #333",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: 10,
  borderRadius: 6,
  border: "1px solid #444",
  background: "#000",
  color: "#fff",
};

const cancelBtn: React.CSSProperties = {
  flex: 1,
  padding: 10,
  background: "#333",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};

const confirmBtn: React.CSSProperties = {
  flex: 1,
  padding: 10,
  background: "#facc15",
  color: "#000",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  fontWeight: "bold",
};
