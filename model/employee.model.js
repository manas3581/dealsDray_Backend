import mongoose from "mongoose";
const employeeSchema = await mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },  
      name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
      trim: true,
    },
    designation: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },

    profilePic: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export const Employee = mongoose.model("Employee", employeeSchema);
