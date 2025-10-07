import mongoose from "mongoose";

const privateServiceSchema = new mongoose.Schema(
  {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PrivateService = mongoose.model("privateService", privateServiceSchema);
export default PrivateService;
