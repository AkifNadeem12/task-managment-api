import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  name: string;
  boards: mongoose.Types.ObjectId[];
}

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  boards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Board" }],
});

// Add virtual property to retrieve boards
userSchema.virtual("userBoards", {
  ref: "Board",
  localField: "_id",
  foreignField: "userId",
});

// Override toJSON method to include virtual property
userSchema.set("toJSON", {
  virtuals: true,
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  const user = this as IUser;

  user.password = await bcrypt.hash(user.password, 8);

  next();
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
