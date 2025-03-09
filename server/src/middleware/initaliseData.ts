import { Request, Response, NextFunction } from "express";

export const initialiseData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Object.defineProperty(req, "data", {
    value: {},
    writable: true,
    enumerable: true,
    configurable: true,
  });

  next();
};
