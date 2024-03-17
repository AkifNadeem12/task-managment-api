import { Express } from "express";
import authUserRouter from "./auth/auth.user.router";
import boardRouter from "./board/board.router";
import validateToken from "middlewares/validateToken";

const routes = (app: Express) => {
  app.use("/api/auth/user", authUserRouter);
  app.use("/api/board", validateToken, boardRouter);
};

export default routes;
