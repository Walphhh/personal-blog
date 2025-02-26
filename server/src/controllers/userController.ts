import { Request, Response } from "express";
import { User } from "../models/userModel";

export const userController = {
  findByEmail: async (req: Request, res: Response) => {
    try {
      const user = await User.find({ email: req.body.email });

      if (user) {
        res.status(200).json(user);
        return;
      }
    } catch (err) {
      res.status(401);
      return;
    }
    1;
  },
};
