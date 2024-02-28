import Dotenv from "dotenv";
Dotenv.config();
import cors from "cors";
import express from "express";
import { createServer } from "http";
import { serverConfig } from "./config/";
import ConnectDB from "./db/";

ConnectDB();

const app = express();
const httpServer = createServer(app);

app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ limit: "1mb", extended: true }));

httpServer.listen(serverConfig, () => {
  console.log(`Server is running on http://localhost:${serverConfig.port}`);
});
