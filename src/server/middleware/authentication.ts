import { NextFunction, Request, Response } from "express";

// if session not found redirect to login page, do not allow other function to continue
const authenticationMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // @ ts-expect-error TODO: Define the session type for the user object
  if (!request.session.user) {
    response.redirect("/auth/login");
  } else {
    // @ ts-expect-error TODO: Define the session type for the user object
    response.locals.user = request.session.user;
    next(); // this lets other functions continue
  }
};
export default authenticationMiddleware;
