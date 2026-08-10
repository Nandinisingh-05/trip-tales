
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Trip from "@/models/Trip";
import { generateItinerary } from "@/lib/generateItinerary";
import { generateAIItinerary } from "@/lib/generateAIItinerary";


// GET all trips
export async function GET() {
  try {
    await connectDB();

    const trips = await Trip.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      trips,
    });
  } catch (error) {
    console.error("GET trips error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch trips",
      },
      { status: 500 }
    );
  }
}

// CREATE a new trip
export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      destination,
      startDate,
      endDate,
      travelers,
      budget,
      tripType,
    } = body;

    if (
      !destination ||
      !startDate ||
      !endDate ||
      !travelers ||
      !budget ||
      !tripType
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide all required fields",
        },
        { status: 400 }
      );
    }

    // Calculate number of trip days
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
      return NextResponse.json(
        {
          success: false,
          message: "End date cannot be before start date",
        },
        { status: 400 }
      );
    }

    const difference =
      end.getTime() - start.getTime();

    const totalDays =
      Math.floor(difference / (1000 * 60 * 60 * 24)) + 1;

    // Generate destination-specific itinerary 
      let itinerary;

         try {
           itinerary = await generateAIItinerary(
            destination,
            totalDays,
            tripType,
            travelers,
            budget
            );
          } catch{
        console.log("Gemini failed. Using local itinerary.");

        itinerary = generateItinerary(
           destination,
           totalDays,
           tripType
         );
         }

    // Create trip with itinerary
    const trip = await Trip.create({
      destination,
      startDate,
      endDate,
      travelers,
      budget,
      tripType,
      itinerary,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Trip created successfully",
        trip,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST trip error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create trip",
      },
      { status: 500 }
    );
  }
}