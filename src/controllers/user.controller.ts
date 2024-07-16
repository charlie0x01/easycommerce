import { Request, Response } from "express";
import UserModel from "../models/user.model";
import { database } from "..";
import { generateHash } from "../utils/bcrypt.utils";
import { sendMail } from "../services/mail.service";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const _user = {
      first_name: req?.body?.first_name?.trim(),
      last_name: req?.body?.last_name?.trim(),
      email: req?.body?.email?.trim(),
      password: req?.body?.password?.trim(),
    };
    // encrypt password
    const encryptedPassword = await generateHash(_user.password);
    // save user in the database
    const user = await UserModel(database).create({
      first_name: _user.first_name,
      last_name: _user.last_name,
      email: _user.email,
      password: encryptedPassword as string,
    });

    sendMail(
      "",
      `${_user?.email}`,
      "Verification Email",
      "hello world!! testing email"
    );

    // return response with user data and success status & message
    return res.status(200).json({
      message: "User Registered Successfully",
      success: true,
      data: user.toJSON(),
      error: null,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: "something went wrong",
      data: null,
      error: error,
    });
  }
};
