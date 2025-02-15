import { Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { User } from "../models/userModel";

// Extend the Request type
interface CustomRequest extends Request {
  user?: DecodedToken; // Make user property available on request
}

interface DecodedToken {
  username: string;
}

const jwt = require("jsonwebtoken");
require("dotenv").config();

export const handleRefreshToken = (req: Request, res: Response) => {
  const cookies = req.cookies;

  // to be replaced with actual JWT
  if (!cookies?.jwt) {
    res.status(401);
    return;
  }

  console.log(cookies.jwt);
  const refreshToken = cookies.jwt;

  console.log("Refresh Token is: ", refreshToken);

  try {
    // jwt evaluation
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err: JsonWebTokenError, decoded: any) => {
        if (err) {
          res.status(403).json({ message: "Invalid token" });
          return;
        }
        const accessToken = jwt.sign(
          { username: decoded.username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30s" }
        );
        res.json({ accessToken });
      }
    );
  } catch (err) {
    console.log(err);
  }
};
