import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
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
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    fundraisers: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Fundraiser",
        },
      ],
      default: [],
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
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
