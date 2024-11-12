import mongoose from "mongoose";
export const connectDb = async () => {
  try {
    const connect = mongoose.connect(process.env.MONGO_URL);
    console.log(`mongodb connected successfully`.bgGreen.white);
  } catch (e) {
    console.log("something went wrong in db connection".bgRed.white, e.message);
  }
};
