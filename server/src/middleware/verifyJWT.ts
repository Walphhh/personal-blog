import { Request, Response, NextFunction } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { CustomRequest } from "../types/types";

// This module verifies if the request is coming from an authenticated User
// Proceeds to the next method if they are and sends an error response if not

const jwt = require("jsonwebtoken");
require("dotenv").config();

export const verifyJWT = {
  verifyAccessToken: (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): void => {
    console.log("In verifyAccessToken");
    const authHeader = req.headers.authorization;

    try {
      if (!authHeader) {
        res.status(401).json({ message: "No token provided" });
        return;
      } else {
        console.log(authHeader);

        const token = authHeader.split(" ")[1]; // Because format is {Header: Bearer [Token]}

        // verifies the user's accessToken
        console.log("Verifying User with token: ", token);
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
            req.userID = decoded.id as string;
            next();
          }
        );
      }
    } catch (err) {
      console.log("error occured");
      console.log(err);
    }
  },

  verifyRefreshToken: (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): void => {
    console.log("In verifyRefreshToken");
    if (!req.cookies.jwt) {
      res.status(401);
    }
    const refreshToken = req.cookies.jwt;
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err: JsonWebTokenError, decoded: any) => {
        if (err) {
          res.status(401).json({ message: "Invalid Refresh TOken" });
          return;
        }
        req.userID = decoded.id as string;
        console.log("Refresh Token verified");
        console.log(req.userID);
        next();
      }
    );
  },
};

export default verifyJWT;
