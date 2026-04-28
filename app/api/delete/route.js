import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request) {
  try {
    const data = await request.json();

    const serialPattern = /^\d{4}-\d{4}-\d{4}$/;

    if (!data.serialNumber || !serialPattern.test(data.serialNumber)) {
      return NextResponse.json(
        { message: "Please enter a valid serial number." },
        { status: 400 },
      );
    }

    const [result] = await db.query(
      "DELETE FROM Appliances WHERE SerialNumber = ?",
      [data.serialNumber],
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Appliance not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Deleted successfully.",
    });
  } catch (error) {
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}
