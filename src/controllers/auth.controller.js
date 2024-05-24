import User from "../models/User.model.js ";
import bcryptjs from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  const { name, lastName, userName, password } = req.body;

  try {
    const passwordHash = await bcryptjs.hash(password, 10);

    const newUser = new User({
      name,
      lastName,
      userName,
      password: passwordHash,
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token);
    res.json({
      id: userSaved._id,
      name: userSaved.name,
      lastName: userSaved.lastName,
      userName: userSaved.userName,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const userFound = await User.findOne({ userName });

    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcryptjs.compare(password, userFound.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token);
    res.json({
      id: userFound._id,
      name: userFound.name,
      lastName: userFound.lastName,
      userName: userFound.userName,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", "", {
    expres: new Date(0),
  });
  return res.sendStatus(200);
};
