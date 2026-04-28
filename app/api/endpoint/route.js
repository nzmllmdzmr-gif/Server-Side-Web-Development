import { NextResponse } from "next/server";

export async function GET() {
  const sampleInventory = [
    {
      eircode: "D01AB12",
      applianceType: "Fridge",
      machine: "Kitchen Fridge",
      brand: "Samsung",
      modelNumber: "123-4567",
      serialNumber: "1234-5678-9012",
      purchaseDate: "2024-01-10",
      warrantyExpirationDate: "2026-01-10",
    },
  ];

  return NextResponse.json({
    success: true,
    inventory: sampleInventory,
  });
}