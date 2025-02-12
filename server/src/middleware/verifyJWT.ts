import { error } from "console";
import { Request, Response, NextFunction } from "express";
import { JsonWebTokenError } from "jsonwebtoken";

const jwt = require("jsonwebtoken");
require("dotenv").config();

// Extend the Request type
interface CustomRequest extends Request {
  user?: DecodedToken; // Make user property available on request
}

interface DecodedToken {
  username: string;
}

export const verifyJWT = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader) {
      res.status(401).json({ message: "No token provided" });
      return;
    } else {
      console.log(authHeader);
      const token = authHeader.split(" ")[1]; // Because format is {Header: Bearer [Token]}

      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err: JsonWebTokenError, decoded: any) => {
          if (err) {
            res.status(403).json({ message: "Invalid token" });
            return;
          }
          req.user = decoded as DecodedToken;
          next();
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
};
