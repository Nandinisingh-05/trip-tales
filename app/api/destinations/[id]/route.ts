import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Destination from "@/models/Destination";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const destination = await Destination.findById(id);

    if (!destination) {
      return NextResponse.json(
        {
          success: false,
          message: "Destination not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      destination,
    });
  } catch (error) {
    console.error("GET destination error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch destination",
      },
      { status: 500 }
    );
  }
}
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    // Get JSON sent from Postman
    const body = await request.json();

    // Find destination by ID and update it
    const destination = await Destination.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!destination) {
      return NextResponse.json(
        {
          success: false,
          message: "Destination not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Destination updated successfully",
      destination,
    });
  } catch (error) {
    console.error("PATCH destination error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update destination",
      },
      { status: 500 }
    );
  }
}