import mongoose from "mongoose";

const visitorsCountSchema = new mongoose.Schema({
  count: {
    type: Number,
    required: true,
  },
});

export default mongoose.models.VisitorsCount ||
  mongoose.model("VisitorsCount", visitorsCountSchema);
