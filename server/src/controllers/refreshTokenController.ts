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

// Returns a new access token upon request
export const handleRefreshToken = (req: Request, res: Response) => {
  const cookies = req.cookies.jwt;
  console.log("Cookie Recieved: ", cookies);

  // to be replaced with actual JWT
  if (!cookies) {
    res.status(401);
    return;
  }

  const refreshToken = cookies;

  console.log("Refresh Requested:     ");
  console.log("refreshToken is:      ", refreshToken);

  try {
    // jwt evaluation
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err: JsonWebTokenError, decoded: any) => {
        if (err) {
          res.status(403).json({ message: "Invalid Refresh TOken" });
          return;
        }
        const accessToken = jwt.sign(
          { username: decoded.username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15s" }
        );
        console.log("New accessToken sent: ", accessToken);
        res.json({ accessToken, message: "Refresh Successful" });
      }
    );
  } catch (err) {
    console.log(err);
  }
};
