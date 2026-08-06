type ItineraryDay = {
  day: number;
  title: string;
  activities: string[];
};

/* =========================
   TRIP TYPE ACTIVITIES
========================= */

const tripTypeActivities: Record<string, string[]> = {
  Adventure: [
    "Adventure Activity",
    "Outdoor Exploration",
  ],

  Relaxation: [
    "Relax at a Scenic Spot",
    "Peaceful Evening",
  ],

  Family: [
    "Family Sightseeing",
    "Visit Family-Friendly Attractions",
  ],

  Romantic: [
    "Scenic Couple Experience",
    "Romantic Evening",
  ],

  Solo: [
    "Explore Local Culture",
    "Visit a Local Cafe",
  ],

  Friends: [
    "Group Adventure",
    "Explore Local Hangout Spots",
  ],
};

/* =========================
   DESTINATION PLANS
========================= */

const destinationPlans: Record<
  string,
  { title: string; activities: string[] }[]
> = {
  goa: [
    {
      title: "Arrival & Beach Evening",
      activities: [
        "Hotel Check-in",
        "Visit Baga Beach",
        "Explore Calangute",
      ],
    },

    {
      title: "North Goa Exploration",
      activities: [
        "Visit Aguada Fort",
        "Explore Anjuna Beach",
        "Water Sports",
      ],
    },

    {
      title: "Explore Panjim",
      activities: [
        "Visit Fontainhas",
        "Explore Panjim",
        "Mandovi River Evening",
      ],
    },
  ],

  manali: [
    {
      title: "Arrival in Manali",
      activities: [
        "Hotel Check-in",
        "Explore Mall Road",
        "Local Food Experience",
      ],
    },

    {
      title: "Solang Valley Adventure",
      activities: [
        "Visit Solang Valley",
        "Paragliding",
        "Mountain Sightseeing",
      ],
    },

    {
      title: "Rohtang Pass",
      activities: [
        "Visit Rohtang Pass",
        "Snow Activities",
        "Photography",
      ],
    },

    {
      title: "Manali Sightseeing",
      activities: [
        "Hadimba Temple",
        "Old Manali",
        "Local Shopping",
      ],
    },
  ],

  jaipur: [
    {
      title: "Arrival in Jaipur",
      activities: [
        "Hotel Check-in",
        "Explore Local Market",
        "Traditional Rajasthani Dinner",
      ],
    },

    {
      title: "Historic Jaipur",
      activities: [
        "Amber Fort",
        "Jal Mahal",
        "Hawa Mahal",
      ],
    },

    {
      title: "Jaipur City Tour",
      activities: [
        "City Palace",
        "Jantar Mantar",
        "Local Shopping",
      ],
    },
  ],
};

/* =========================
   GENERATE ITINERARY
========================= */

export function generateItinerary(
  destination: string,
  totalDays: number,
  tripType: string
): ItineraryDay[] {

  const key = destination.trim().toLowerCase();

  // Get destination-specific plan
  const plan = destinationPlans[key];

  // Get activities based on trip type
  const extraActivities =
    tripTypeActivities[tripType] || [];

  return Array.from(
    { length: totalDays },
    (_, index) => {

      /* =========================
         LAST DAY
      ========================= */

      if (
        index === totalDays - 1 &&
        totalDays > 1
      ) {
        return {
          day: index + 1,

          title: `Departure from ${destination}`,

          activities: [
            "Breakfast",
            "Hotel Check-out",
            "Departure",
          ],
        };
      }

      /* =========================
         DESTINATION-SPECIFIC DAY
      ========================= */

      if (plan && plan[index]) {
        return {
          day: index + 1,

          title: plan[index].title,

          activities: [
            ...plan[index].activities,
            ...extraActivities,
          ],
        };
      }

      /* =========================
         FALLBACK DAY
      ========================= */

      return {
        day: index + 1,

        title: `Explore ${destination}`,

        activities: [
          "Local Sightseeing",
          "Explore Popular Attractions",
          "Local Food Experience",
          ...extraActivities,
        ],
      };
    }
  );
}