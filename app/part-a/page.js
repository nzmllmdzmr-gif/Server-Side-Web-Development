"use client";

import { useState } from "react";

export default function PartA() {
  //store the message
  const [movie, setMovie] = useState("");
  const [showtime, setShowtime] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
//handle for submit
  const handleSubmit = (e) => {
    e.preventDefault();
//inform empty fields
    if (movie === "" || showtime === "" || mobile.trim() === "") {
      setMessage("Please fill in all fields.");
      return;
    }
//show messahge
    setMessage(
      `Your booking for ${movie} at ${showtime} has been confirmed. A confirmation text has been sent to ${mobile}.`
    );
  };

  return (
    <main style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Part A - Cinema Ticket Booking</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Movie: </label>
          <select value={movie} onChange={(e) => setMovie(e.target.value)}>
            <option value="">Select a movie</option>
            <option value="Avatar">Avatar</option>
            <option value="Frozen">Frozen</option>
            <option value="Inception">Inception</option>
          </select>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Showtime: </label>
          <select
            value={showtime}
            onChange={(e) => setShowtime(e.target.value)}
          >
            <option value="">Select a showtime</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="2:00 PM">2:00 PM</option>
            <option value="7:00 PM">7:00 PM</option>
          </select>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Mobile Number: </label>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter mobile number"
          />
        </div>

        <button type="submit">Book Tickets</button>
      </form>

      {message && (
        <p style={{ marginTop: "20px", color: "green" }}>{message}</p>
      )}
{/*back link*/}
      <p style={{ marginTop: "20px" }}>
        <a href="/">Back to Home</a>
      </p>
    </main>
  );
}