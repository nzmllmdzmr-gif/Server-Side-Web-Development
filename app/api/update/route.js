import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request) {
  try {
    const data = await request.json();

    if (!data.serialNumber) {
      return NextResponse.json(
        { message: "Serial number is required." },
        { status: 400 }
      );
    }

    const [result] = await db.query(
      "UPDATE Appliances SET Brand = ? WHERE SerialNumber = ?",
      [data.brand, data.serialNumber]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Appliance not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Updated successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error." },
      { status: 500 }
    );
  }
}