"use client";

import { useState } from "react";

export default function SearchPage() {
  const [serialNumber, setSerialNumber] = useState("");
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setResult(null);
    setMessage("");

    if (!serialNumber) {
      setMessage("Please enter a serial number.");
      return;
    }

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serialNumber }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message);
        return;
      }

      setResult(data.appliance);
    } catch (error) {
      setMessage("Server error. Please try again later.");
    }
  };

  return (
    <main style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Search Appliance</h1>

      <form onSubmit={handleSearch}>
        <div style={{ marginBottom: "10px" }}>
          <label>Serial Number: </label>
          <input
            type="text"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            placeholder="1234-1234-1234"
          />
        </div>

        <button type="submit">Search</button>
      </form>

      {message && <p style={{ color: "red" }}>{message}</p>}

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h2>Appliance Details</h2>
          <p>Type: {result.ApplianceType}</p>
          <p>Brand: {result.Brand}</p>
          <p>Model Number: {result.ModelNumber}</p>
          <p>Serial Number: {result.SerialNumber}</p>
          <p>Purchase Date: {result.PurchaseDate}</p>
          <p>Warranty Date: {result.WarrantyExpirationDate}</p>
          <p>Cost: {result.CostOfAppliance}</p>
          <p>
            User: {result.FirstName} {result.LastName}
          </p>
          <p>Email: {result.Email}</p>
        </div>
      )}

      <p style={{ marginTop: "20px" }}>
        <a href="/">Back to Home</a>
      </p>
    </main>
  );
}
