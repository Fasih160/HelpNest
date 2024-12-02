import mongoose from "mongoose";

const fundraiserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    amountRaised: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Active", "Completed", "Rejected"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    donations: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Donation",
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Fundraiser ||
  mongoose.model("Fundraiser", fundraiserSchema);
