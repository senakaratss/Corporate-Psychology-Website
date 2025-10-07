import mongoose from "mongoose";

const contactInfoSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    companyDescription: {
      type: String,
      required: true,
    },
    workingHours: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    tel: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    facebook: String,
    instagram: String,
    twitter: String,
  },
  { timestamps: true }
);

const ContactInfo = mongoose.model("ContactInfo", contactInfoSchema);

export default ContactInfo;
