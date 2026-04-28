import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request) {
  try {
    const data = await request.json();

    const serialPattern = /^\d{4}-\d{4}-\d{4}$/;

    if (!data.serialNumber || !serialPattern.test(data.serialNumber)) {
      return NextResponse.json(
        { message: "Please enter a valid serial number." },
        { status: 400 }
      );
    }

    const [rows] = await db.query(
      `SELECT Appliances.*, Users.FirstName, Users.LastName, Users.Email
       FROM Appliances
       JOIN Users ON Appliances.UserID = Users.UserID
       WHERE Appliances.SerialNumber = ?`,
      [data.serialNumber]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "No matching appliance found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      appliance: rows[0],
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error." },
      { status: 500 }
    );
  }
}