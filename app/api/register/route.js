import { db } from "@/lib/db";

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    //get data
    const data = await request.json();

    const errors = {};

    const eircodePattern = /^[A-Z]\d{2}\s?[A-Z0-9]{4}$/i;
    const modelPattern = /^\d{3}-\d{4}$/;
    const serialPattern = /^\d{4}-\d{4}-\d{4}$/;
    //check data
    if (!data.eircode || !eircodePattern.test(data.eircode)) {
      errors.eircode = "Please enter a valid eircode.";
    }

    if (!data.applianceType) {
      errors.applianceType = "Please choose an appliance type.";
    }

    if (!data.machine || data.machine.trim() === "") {
      errors.machine = "Please enter machine name.";
    }

    if (!data.brand || data.brand.trim() === "") {
      errors.brand = "Please enter brand.";
    }

    if (!data.modelNumber || !modelPattern.test(data.modelNumber)) {
      errors.modelNumber = "Model number should be like 123-4567.";
    }

    if (!data.serialNumber || !serialPattern.test(data.serialNumber)) {
      errors.serialNumber = "Serial number should be like 1234-5678-9012.";
    }

    if (!data.purchaseDate) {
      errors.purchaseDate = "Please choose purchase date.";
    }

    if (!data.warrantyExpirationDate) {
      errors.warrantyExpirationDate = "Please choose warranty date.";
    }

    if (data.purchaseDate && data.warrantyExpirationDate) {
      const purchase = new Date(data.purchaseDate);
      const warranty = new Date(data.warrantyExpirationDate);

      if (warranty < purchase) {
        errors.warrantyExpirationDate =
          "Warranty date cannot be before purchase date.";
      }
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, errors: errors },
        { status: 400 },
      );
    }
    //return errors
    const [userResult] = await db.query(
      `INSERT INTO Users 
  (FirstName, LastName, Address, Mobile, Email, Eircode)
  VALUES (?, ?, ?, ?, ?, ?)`,
      [
        [
          data.firstName,
          data.lastName,
          "Address",
          data.mobile,
          data.email,
          data.eircode,
        ],
      ],
    );

    await db.query(
      `INSERT INTO Appliances 
  (ApplianceType, Brand, ModelNumber, SerialNumber, PurchaseDate, WarrantyExpirationDate, CostOfAppliance, UserID)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.applianceType,
        data.brand,
        data.modelNumber,
        data.serialNumber,
        data.purchaseDate,
        data.warrantyExpirationDate,
        100,
        userResult.insertId,
      ],
    );

    return NextResponse.json({
      success: true,
      message: "Saved to database successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error." },
      { status: 500 },
    );
  }
}
