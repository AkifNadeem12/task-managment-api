import { Express } from "express";
import authUser from "./auth/auth.user";

const routes = (app: Express) => {
  app.use("/api/auth/user", authUser);
};

export default routes;
