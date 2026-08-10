import "dotenv/config";

import { connectDB } from "../lib/mongodb";
import Destination from "../models/Destination";
import destinations from "../data/destinations";

async function seed() {
  try {
    await connectDB();

    // Remove existing destinations
    await Destination.deleteMany({});

    // Insert new destinations
    await Destination.insertMany(destinations);

    console.log("✅ Destinations seeded successfully!");
    console.log(`Inserted ${destinations.length} destinations.`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding destinations:", error);
    process.exit(1);
  }
}

seed();