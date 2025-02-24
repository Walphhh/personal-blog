import { Request, Response, NextFunction } from "express";
import { JsonWebTokenError } from "jsonwebtoken";

// This module verifies if the request is coming from an authenticated User
// Procedes to the next method if they are and sends an error response if not

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
  const cookies = req.cookies;

  try {
    if (!authHeader) {
      res.status(401).json({ message: "No token provided" });
      return;
    } else {
      console.log(authHeader);
      console.log(cookies);
      const token = authHeader.split(" ")[1]; // Because format is {Header: Bearer [Token]}

      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err: JsonWebTokenError, decoded: any) => {
          if (err) {
            res.status(401).json({ message: "Invalid accessToken" });
            console.log("Unauthenticated User trying to data");
            return;
          }
          console.log(decoded);
          req.user = decoded as DecodedToken;
          next();
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
};
