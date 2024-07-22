import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user.model";
import { database } from "..";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: string = req?.query?.token as string;

    const isUserVerified = await UserModel(database).findOne({
      where: { verification_token: token },
    });

    // if user doesn't exist with given token
    if (isUserVerified === null)
      return res
        .status(400)
        .json({ success: false, message: "Invalid Access Token" });

    // if user found with given token and is verified already
    if (isUserVerified?.dataValues?.is_verified)
      return res.render("emailVerified", {
        heading: "Email Already Verified",
        username: isUserVerified?.first_name + " " + isUserVerified?.last_name,
        signInUrl: "https://www.google.com",
      });

    // if user not verified already then continue verification process
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "something went wrong!", error: error });
  }
};
