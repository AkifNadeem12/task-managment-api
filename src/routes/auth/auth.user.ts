import bcrypt from "bcrypt";
import express from "express";
import validateFields from "../../middlewares/validateFields";
import User from "../../models/user";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/login",
  validateFields(["email", "password"]),
  async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    delete user.password;

    const token = jwt.sign({ user }, process.env.JWT_SECRET);

    return res
      .status(200)
      .json({ user, message: "User logged in successfully", token });
  }
);

router.post(
  "/register",
  validateFields(["email", "password", "name"]),
  async (req, res) => {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const user = await User.create({ email, password, name });

    return res.status(201).json({ message: "User created successfully", user });
  }
);

export default router;
