import mongoose, { Schema, Types } from "mongoose";
import { IUser } from "./user";

export interface IBoard {
  title: string;
  status: string;
  user: Types.ObjectId;
  boardUser: IUser;
  created_at: Date;
  deleted_at: Date;
  board_members: Types.ObjectId[];
}

const boardSchema = new Schema({
  title: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["active", "archived"],
    default: "active",
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  created_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
  board_members: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

boardSchema.virtual("boardUser", {
  ref: "User",
  localField: "user",
  foreignField: "_id",
});

boardSchema.virtual("boardMembers", {
  ref: "User",
  localField: "board_members",
  foreignField: "_id",
});

boardSchema.set("toJSON", {
  virtuals: true,
});

const Board = mongoose.model<IBoard>("Board", boardSchema);

export default Board;
