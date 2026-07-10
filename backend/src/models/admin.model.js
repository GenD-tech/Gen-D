import mongoose, { Schema } from "mongoose";

const adminSettingSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      default: "primary-admin",
    },
    passwordHash: {
      type: String,
      required: true,
    },
    passwordSalt: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const AdminSetting = mongoose.model("AdminSetting", adminSettingSchema, "admin_settings");