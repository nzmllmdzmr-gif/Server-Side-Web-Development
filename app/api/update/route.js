import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request) {
  try {
    const data = await request.json();

    const serialPattern = /^\d{4}-\d{4}-\d{4}$/;
    const modelPattern = /^\d{3}-\d{4}$/;

    if (!data.modelNumber || !modelPattern.test(data.modelNumber)) {
      return NextResponse.json(
        { message: "Model number should be like 123-4567." },
        { status: 400 },
      );
    }

    const [result] = await db.query(
      `UPDATE Appliances 
   SET Brand = ?, ModelNumber = ?, WarrantyExpirationDate = ?
   WHERE SerialNumber = ?`,
      [
        data.brand,
        data.modelNumber,
        data.warrantyExpirationDate,
        data.serialNumber,
      ],
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Appliance not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Updated successfully.",
    });
  } catch (error) {
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}
