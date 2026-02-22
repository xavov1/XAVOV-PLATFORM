import React from "react";

export default function BoursePage() {
  const items: any[] = [];

  return (
    <div style={{ padding: "40px" }}>
      <h1>Bourse Page</h1>

      {Array.isArray(items) && items.length > 0 ? (
        items.map((item, index) => (
          <div key={index}>
            <p>{item.name}</p>
          </div>
        ))
      ) : (
        <p>No items available</p>
      )}
    </div>
  );
}