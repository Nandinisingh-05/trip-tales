import mongoose, { Schema } from "mongoose";

const DestinationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      default: 0,
    },

    description: {
      type: String,
      default: "",
    },

    bestTimeToVisit: {
      type: String,
      default: "",
    },

    duration: {
      type: String,
      default: "",
    },

    estimatedBudget: {
      type: String,
      default: "",
    },

    attractions: {
      type: [String],
      default: [],
    },

    activities: {
      type: [String],
      default: [],
    },

    travelTips: {
      type: [String],
      default: [],
    },
    category: {
     type: String,
     required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Destination =
  mongoose.models.Destination ||
  mongoose.model("Destination", DestinationSchema);

export default Destination;