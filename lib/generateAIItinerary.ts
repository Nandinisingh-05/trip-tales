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
  travelers: number,
  budget: number
): Promise<ItineraryDay[]> {
const prompt = `
You are a professional travel planner.

Generate a realistic ${totalDays}-day itinerary.

Destination:
${destination}

Trip Type:
${tripType}

Travelers:
${travelers}

Budget:
₹${budget}

Requirements:

- Every day should have a unique title.
- Mention famous tourist places.
- Include food recommendations.
- Include local experiences.
- Include adventure activities when suitable.
- Include approximate travel sequence.
- Activities should fit the budget.
- Never repeat activities.
- Make every day interesting.

Return ONLY valid JSON.

[
 {
   "day":1,
   "title":"Arrival & Mall Road",
   "activities":[
      "Check into hotel near Mall Road",
      "Walk around Mall Road and shop for souvenirs",
      "Try Himachali cuisine at a local restaurant",
      "Visit Hadimba Temple",
      "Enjoy café hopping in Old Manali"
   ]
 }
]
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
    });

    const text = response.text ?? "";

    const cleaned = text
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

const start = cleaned.indexOf("[");
const end = cleaned.lastIndexOf("]");

if (start === -1 || end === -1) {
  throw new Error("Invalid Gemini response");
}

return JSON.parse(cleaned.slice(start, end + 1));
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}