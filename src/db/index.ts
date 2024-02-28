import mongoose from "mongoose";

const ConnectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(
      "mongodb+srv://Akif:Akif12345@cluster0.h32z3.mongodb.net/Board?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};

export default ConnectDB;
