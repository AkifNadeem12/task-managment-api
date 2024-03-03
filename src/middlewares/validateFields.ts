import { Request, Response, NextFunction } from "express";

/**
 * Middleware function to validate required fields in the request body.
 * @param requiredFields - An array of strings representing the required fields.
 * @returns A middleware function that checks if the required fields are present in the request body.
 */

const validateFields = (requiredFields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (typeof req.body !== "object" || req.body === null) {
      return res.status(400).json({ error: "Request body must be an object" });
    }

    for (const field of requiredFields) {
      if (!(field in req.body)) {
        return res
          .status(400)
          .json({ error: `Missing required field: ${field}` });
      }
    }

    next();
  };
};

export default validateFields;
