import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

type ItineraryDay = {
  day: number;
  title: string;
  activities: string[];
};

export async function generateAIItinerary(
  destination: string,
  totalDays: number,
  tripType: string,
  travelers: string,
  budget: string
): Promise<ItineraryDay[]> {
  const prompt = `
You are an expert travel planner.

Create a realistic ${totalDays}-day travel itinerary.

Destination: ${destination}
Trip Type: ${tripType}
Travelers: ${travelers}
Budget Category: ${budget}

Instructions:
- Create exactly ${totalDays} days.
- Give every day a unique title.
- Include famous tourist attractions.
- Suggest local food.
- Suggest local experiences.
- Include adventure activities if suitable.
- Do not repeat activities.
- Keep activities according to the selected budget.
- Return ONLY valid JSON.

Example:

[
  {
    "day": 1,
    "title": "Arrival & Local Exploration",
    "activities": [
      "Check into hotel",
      "Visit Mall Road",
      "Enjoy local Himachali lunch",
      "Visit Hadimba Temple",
      "Dinner at a local cafe"
    ]
  }
]
`;

  try {
    console.log("Generating AI itinerary...");

    const response = await ai.models.generateContent({
     model: "gemini-flash-latest",
      contents: prompt,
     });

    const text = response.text ?? "";

    console.log("Gemini Response:");
    console.log(text);

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const start = cleaned.indexOf("[");
    const end = cleaned.lastIndexOf("]");

    if (start === -1 || end === -1) {
      throw new Error("Gemini did not return valid JSON.");
    }

    const itinerary = JSON.parse(
      cleaned.slice(start, end + 1)
    ) as ItineraryDay[];

    return itinerary;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}