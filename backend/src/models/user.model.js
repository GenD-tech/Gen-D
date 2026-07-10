import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    service: {
      type: String,
      required: true,
      trim: true,
      default: "General Inquiry",
    },
    message: {
      type: String,
      default: "",
      trim: true,
    },
    source: {
      type: String,
      default: "website",
      trim: true,
    },
    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new",
      index: true,
    },
  },
  { timestamps: true }
);

export const Contact = mongoose.model("Contact", contactSchema, "contacts");
