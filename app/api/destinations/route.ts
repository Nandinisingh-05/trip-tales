import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Destination from "@/models/Destination";

export async function GET() {
  try {
    await connectDB();

    const destinations = await Destination.find();

    return NextResponse.json({
      success: true,
      destinations,
    });
  } catch (error) {
    console.error("GET destinations error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch destinations",
      },
      { status: 500 }
    );
  }
}
 export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const destination = await Destination.create({
      name: body.name,
      location: body.location,
      image: body.image,
      rating: body.rating,
    });

    return NextResponse.json(
      {
         success: true,
        message: "Destination created successfully",
        destination,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST destination error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create destination",
      },
      { status: 500 }
    );
  }
}