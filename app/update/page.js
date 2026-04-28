"use client";

import { useState } from "react";

export default function UpdatePage() {
  const [serialNumber, setSerialNumber] = useState("");
  const [brand, setBrand] = useState("");
  const [modelNumber, setModelNumber] = useState("");
  const [warrantyExpirationDate, setWarrantyExpirationDate] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!serialNumber || !brand || !modelNumber || !warrantyExpirationDate) {
      setMessage("Please fill in all fields.");
      return;
    }

    const response = await fetch("/api/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        serialNumber,
        brand,
        modelNumber,
        warrantyExpirationDate,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.message);
      return;
    }

    setMessage("Updated successfully.");
  };

  return (
    <main style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Update Appliance</h1>

      <form onSubmit={handleUpdate}>
        <div style={{ marginBottom: "10px" }}>
          <label>Serial Number: </label>
          <input
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            placeholder="1234-5678-9012"
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>New Brand: </label>
          <input value={brand} onChange={(e) => setBrand(e.target.value)} />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>New Model Number: </label>
          <input
            value={modelNumber}
            onChange={(e) => setModelNumber(e.target.value)}
            placeholder="123-4567"
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>New Warranty Expiry Date: </label>
          <input
            type="date"
            value={warrantyExpirationDate}
            onChange={(e) => setWarrantyExpirationDate(e.target.value)}
          />
        </div>

        <button type="submit">Update</button>
      </form>

      {message && <p>{message}</p>}

      <p style={{ marginTop: "20px" }}>
        <a href="/">Back to Home</a>
      </p>
    </main>
  );
}
