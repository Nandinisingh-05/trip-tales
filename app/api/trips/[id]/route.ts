import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Trip from "@/models/Trip";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const trip = await Trip.findById(id);

    if (!trip) {
      return NextResponse.json(
        {
          success: false,
          message: "Trip not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      trip,
    });
  } catch (error) {
    console.error("GET trip error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch trip",
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
    const body = await request.json();

    const trip = await Trip.findByIdAndUpdate(
      id,
      {
        itinerary: body.itinerary,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!trip) {
      return NextResponse.json(
        {
          success: false,
          message: "Trip not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Itinerary updated successfully",
      trip,
    });
  } catch (error) {
    console.error("PATCH trip itinerary error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update itinerary",
      },
      { status: 500 }
    );
  }
}