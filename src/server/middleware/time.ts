import { time } from "console";
import { NextFunction, Request, Response } from "express";

// Note: the ":" is how we annotate the type of parameter to typescript
const timeMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log(`Time: ${new Date()}`);
  next();
};

export default timeMiddleware;
