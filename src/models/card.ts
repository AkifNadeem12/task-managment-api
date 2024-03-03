import mongoose from "mongoose";

export interface ICard {
  title: string;
  description: string;
  listId: mongoose.Types.ObjectId;
  labels: string[];
  assigness: mongoose.Types.ObjectId[];
  created_at: Date;
  deleted_at: Date;
}

const cardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  listId: { type: mongoose.Schema.Types.ObjectId, ref: "List" },
  labels: [{ type: String }],
  assigness: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  created_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});

cardSchema.set("toJSON", {
  virtuals: true,
});

const Card = mongoose.model<ICard>("Card", cardSchema);

export default Card;
