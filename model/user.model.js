import mongoose from "mongoose";
const userSchema = await mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      enum: ["user", "admin"],
      default: "user",
      type: String,
    },
  },
  { timestamps: true }
);
export const User = mongoose.model("User", userSchema);
