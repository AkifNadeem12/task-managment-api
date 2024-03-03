import mongoose from "mongoose";

export interface IList {
  title: string;
  boardId: mongoose.Types.ObjectId;
  cards: mongoose.Types.ObjectId[];
  created_at: Date;
  deleted_at: Date;
}

const listSchema = new mongoose.Schema({
  title: { type: String, required: true },
  boardId: { type: mongoose.Schema.Types.ObjectId, ref: "Board" },
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
  created_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});

listSchema.virtual("listCards", {
  ref: "Card",
  localField: "_id",
  foreignField: "listId",
});

listSchema.set("toJSON", {
  virtuals: true,
});

const List = mongoose.model<IList>("List", listSchema);

export default List;
