import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    headerImage: {
      type: String, // görsel URL
      required: true,
    },
    vision: {
      type: String,
      required: true,
      trim: true,
    },
    mission: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const About = mongoose.model("About", aboutSchema);

export default About;
