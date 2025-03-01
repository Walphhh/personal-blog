import { Request, Response } from "express";
import { User } from "../models/userModel";

export const userController = {
  // Finds Username by ID
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
    1;
  },
};
