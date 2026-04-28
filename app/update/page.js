"use client";

import { useState } from "react";

export default function UpdatePage() {
  const [serialNumber, setSerialNumber] = useState("");
  const [brand, setBrand] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    
    if (!serialNumber || !brand) {
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

        <button type="submit">Update</button>
      </form>

      {message && <p>{message}</p>}

      <p style={{ marginTop: "20px" }}>
        <a href="/">Back to Home</a>
      </p>
    </main>
  );
}
