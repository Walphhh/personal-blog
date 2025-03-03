import { Request, Response } from "express";
import { User } from "../models/userModel";
import { error } from "console";

const bcrypt = require("bcrypt");

export const userController = {
  /**
   *  Finds Username by userID
   * @param userID
   * @returns user's username
   * */
  findUsernameByID: async (req: Request, res: Response) => {
    try {
      console.log(req.params.id);
      const user = await User.findById(req.params.id);
      console.log("Findind User with ID: ", req.params.id);
      if (user) {
        res.status(200).json({ username: user.username });
      } else {
        res.status(200).json({ username: "unkown" });
      }
      return;
    } catch (err) {
      res.status(401);
      return;
    }
  },

  /**
   * Creates a new user
   * @param User
   * @returns response status of the process
   */
  postUser: async (req: Request, res: Response) => {
    try {
      console.log(req.body);

      // Empty request handler
      if (Object.keys(req.body).length === 0) {
        res.status(400).json({ error: "request body empty" });
        return;
      }

      const { username, email, password } = req.body;

      // Incorrect / missing request properties handler
      if (!username || !email || !password) {
        res.status(400).json({
          error: "Incorrect or missing properties in the request body",
        });
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = new User({
        username: username,
        email: email,
        password: passwordHash,
        role: "user",
        refreshToken: "",
      });

      console.log(newUser.email);
      const isUser = await User.findOne({ email: newUser.email });

      if (isUser) {
        res.status(409).json({ message: "email already in use" });
        return;
      }

      await newUser.save();
      res.status(200).json({ message: "User successfully created" });
    } catch (err) {
      console.log(err);
      res.status(500);
    }
  },
};
