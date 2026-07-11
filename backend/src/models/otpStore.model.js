import mongoose, { Schema } from "mongoose";

const otpStoreSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    index: true,
  },
  otp: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expireAfterSeconds: 0 }, 
  },
});

export const OtpStore = mongoose.model("OtpStore", otpStoreSchema, "otp_store");
