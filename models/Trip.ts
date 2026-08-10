import mongoose, { Schema } from "mongoose";

const ItineraryDaySchema = new Schema(
  {
    day: {
      type: Number,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    activities: {
      type: [String],
      default: [],
    },
  },
  {
    _id: false,
  }
);

const TripSchema = new Schema(
  {
    destination: {
      type: String,
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    travelers: {
       type: String,
       required: true,
     },

     budget: {
       type: String,
       required: true,
     },

    tripType: {
      type: String,
      enum: [
        "Adventure",
        "Relaxation",
        "Family",
        "Romantic",
        "Solo",
        "Friends",
      ],
      required: true,
    },

    status: {
      type: String,
      default: "planned",
    },

    // Trip itinerary
    itinerary: {
      type: [ItineraryDaySchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Trip =
  mongoose.models.Trip ||
  mongoose.model("Trip", TripSchema);

export default Trip;