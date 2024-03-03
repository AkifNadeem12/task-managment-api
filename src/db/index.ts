import mongoose from "mongoose";

const ConnectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};

export default ConnectDB;
