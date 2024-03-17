import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "models/user";

interface CustomRequest extends Request {
  user: IUser;
}

/**
 * Middleware function to validate the authorization token.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function to call.
 * @returns A response indicating whether the token is valid or not.
 */

const validateToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  const tokenArray = token.split(" ");

  if (tokenArray[0] !== "Bearer") {
    return res.status(401).json({ error: "Invalid token" });
  }

  if (!tokenArray[1]) {
    return res.status(401).json({ error: "No token provided" });
  }

  const user = jwt.verify(tokenArray[1], process.env.JWT_SECRET) as IUser;

  req.user = user;

  next();
};

export default validateToken;
