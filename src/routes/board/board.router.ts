import express from "express";
import { IUser } from "models/user";
import { Response, Request } from "express";
import Board from "models/board";

interface CustomRequest extends Request {
  user: IUser;
}

const router = express.Router();

router.get("/boards", (req: CustomRequest, res: Response) => {
  const user = req.user;

  const listOfBoards = Board.find({ user: user._id }).populate("boardMembers");

  return res.status(200).json(listOfBoards);
});

router.get("/board/:id", (req: CustomRequest, res: Response) => {
  const user = req.user;
  const boardId = req.params.id;

  const board = Board.findOne({ _id: boardId, user: user._id }).populate(
    "boardMembers"
  );

  return res.status(200).json(board);
});

router.post("/board", (req: CustomRequest, res: Response) => {
  const user = req.user;
  const { title } = req.body;

  const newBoard = new Board({
    title,
    user: user._id,
  });

  newBoard.save();

  return res.status(201).json(newBoard);
});

router.put("/board/:id", (req: CustomRequest, res: Response) => {
  const user = req.user;
  const boardId = req.params.id;
  const { title } = req.body;

  const updatedBoard = Board.findOneAndUpdate(
    { _id: boardId, user: user._id },
    { title }
  );

  return res.status(200).json(updatedBoard);
});

router.delete("/board/:id", (req: CustomRequest, res: Response) => {
  const user = req.user;
  const boardId = req.params.id;

  const deletedBoard = Board.findOneAndUpdate(
    { _id: boardId, user: user._id },
    { status: "archived" }
  );

  return res.status(200).json(deletedBoard);
});

export default router;
