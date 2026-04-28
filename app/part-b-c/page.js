"use client";

import { useState } from "react";
//store message
export default function PartBC() {
  const [formData, setFormData] = useState({
    eircode: "",
    applianceType: "",
    machine: "",
    brand: "",
    modelNumber: "",
    serialNumber: "",
    purchaseDate: "",
    warrantyExpirationDate: "",
  });
//store errors
  const [errors, setErrors] = useState({});
  //success message
  const [message, setMessage] = useState("");
  const [inventoryList, setInventoryList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
//send data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});
    setMessage("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
//show error message if there are errors
      if (!response.ok) {
        setErrors(result.errors || {});
        return;
      }

      setMessage("Appliance added to the list.");
      setInventoryList([...inventoryList, formData]);

      setFormData({
        eircode: "",
        applianceType: "",
        machine: "",
        brand: "",
        modelNumber: "",
        serialNumber: "",
        purchaseDate: "",
        warrantyExpirationDate: "",
      });
    } catch (error) {
      setErrors({ general: "Error happened. Please try again." });
    }
  };

  return (
    <main style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Part B and Part C - Appliance Inventory</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Eircode: </label>
          <input
            type="text"
            name="eircode"
            value={formData.eircode}
            onChange={handleChange}
            placeholder="D00 0000"
          />
          {errors.eircode && <p style={{ color: "red" }}>{errors.eircode}</p>}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Appliance Type: </label>
          <select
            name="applianceType"
            value={formData.applianceType}
            onChange={handleChange}
          >
            <option value="">Choose appliance</option>
            <option value="Fridge">Fridge</option>
            <option value="Washing Machine">Washing Machine</option>
            <option value="TV">TV</option>
          </select>
          {errors.applianceType && (
            <p style={{ color: "red" }}>{errors.applianceType}</p>
          )}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Machine: </label>
          <input
            type="text"
            name="machine"
            value={formData.machine}
            onChange={handleChange}
          />
          {errors.machine && <p style={{ color: "red" }}>{errors.machine}</p>}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Brand: </label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          />
          {errors.brand && <p style={{ color: "red" }}>{errors.brand}</p>}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Model Number: </label>
          <input
            type="text"
            name="modelNumber"
            value={formData.modelNumber}
            onChange={handleChange}
            placeholder="123-4567"
          />
          {errors.modelNumber && (
            <p style={{ color: "red" }}>{errors.modelNumber}</p>
          )}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Serial Number: </label>
          <input
            type="text"
            name="serialNumber"
            value={formData.serialNumber}
            onChange={handleChange}
            placeholder="1234-5678-9012"
          />
          {errors.serialNumber && (
            <p style={{ color: "red" }}>{errors.serialNumber}</p>
          )}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Purchase Date: </label>
          <input
            type="date"
            name="purchaseDate"
            value={formData.purchaseDate}
            onChange={handleChange}
          />
          {errors.purchaseDate && (
            <p style={{ color: "red" }}>{errors.purchaseDate}</p>
          )}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Warranty Expiry Date: </label>
          <input
            type="date"
            name="warrantyExpirationDate"
            value={formData.warrantyExpirationDate}
            onChange={handleChange}
          />
          {errors.warrantyExpirationDate && (
            <p style={{ color: "red" }}>{errors.warrantyExpirationDate}</p>
          )}
        </div>

        <button type="submit">Add Appliance</button>
      </form>

      {errors.general && (
        <p style={{ color: "red", marginTop: "15px" }}>{errors.general}</p>
      )}

      {message && (
        <p style={{ color: "green", marginTop: "15px" }}>{message}</p>
      )}

      <h2 style={{ marginTop: "30px" }}>Inventory List</h2>

      {inventoryList.length === 0 ? (
        <p>No items yet.</p>
      ) : (
        <ul>
          {inventoryList.map((item, index) => (
            <li key={index}>
              {item.brand} - {item.applianceType} - {item.modelNumber}
            </li>
          ))}
        </ul>
      )}

      <p style={{ marginTop: "20px" }}>
        <a href="/">Back to Home</a>
      </p>
    </main>
  );
}