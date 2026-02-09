import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (!process.env.DBURL) {
      throw new Error("DB URL is missing");
    }

    await mongoose.connect(process.env.DBURL as string);
    console.log("Database Connected Successfully");
  } catch (e) {
    console.error("Error while connecting to Database", e);
  }
};
