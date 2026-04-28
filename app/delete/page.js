"use client";

import { useState } from "react";

export default function DeletePage() {
  const [serialNumber, setSerialNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!serialNumber) {
      setMessage("Please enter a serial number.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this appliance?")) {
      return;
    }

    const response = await fetch("/api/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ serialNumber }),
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.message);
      return;
    }

    setMessage("Deleted successfully.");
  };

  return (
    <main style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Delete Appliance</h1>

      <form onSubmit={handleDelete}>
        <div style={{ marginBottom: "10px" }}>
          <label>Serial Number: </label>
          <input
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            placeholder="1234-5678-9012"
          />
        </div>

        <button type="submit">Delete</button>
      </form>

      {message && <p>{message}</p>}

      <p style={{ marginTop: "20px" }}>
        <a href="/">Back to Home</a>
      </p>
    </main>
  );
}
