import { NextFunction, Request, Response } from "express";
import userSchema from "../schemas/user.schema";
import { parseZodError } from "../utils/parser.utils";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = {
      first_name: req?.body?.first_name?.trim(),
      last_name: req?.body?.last_name?.trim(),
      email: req?.body?.email?.trim(),
      password: req?.body?.password?.trim(),
    };
    //
    const isValid = userSchema.safeParse(user);
    if (isValid?.success) {
      return next();
    }
    // validate
    const errors = parseZodError(isValid?.error);

    return res.status(406).json({
      success: isValid?.success,
      message: "Please provide valid information",
      error: errors,
      data: isValid?.data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User Registration Failed. Please try again",
      error: error,
      data: null,
    });
  }
};
