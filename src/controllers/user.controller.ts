import { Request, Response } from "express";
import UserModel from "../models/user.model";
import { database } from "..";
import { generateHash } from "../utils/bcrypt.utils";
import { sendMail } from "../services/mail.service";
import { getEmailVerificationHtmlTemplate } from "../utils/emailTemplates.utils";
import crypto from "crypto";

export const registerUser = async (
  req: Request,
  res: Response,
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

    // generate verification token
    const token = crypto.randomBytes(32).toString("hex");
    // save user in the database
    await UserModel(database).create({
      first_name: _user.first_name,
      last_name: _user.last_name,
      email: _user.email,
      password: encryptedPassword as string,
      verification_token: token,
    });

    // get html template for email verification
    const htmlTemplate = getEmailVerificationHtmlTemplate(
      `${_user?.first_name} ${_user?.last_name}`,
      `${req.protocol}://${req.get(
        "host",
      )}/api/user/verify-email?token=${token}`,
    );
    // send verification email to user's given email
    sendMail("", `${_user?.email}`, "Verify Your Email Address", htmlTemplate);

    // return response with user data and success status & message
    return res.status(200).json({
      message: "Kindly check your inbox to verify you email",
      success: true,
      error: null,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: "something went wrong",
      error: error,
    });
  }
};

export const verifyUserEmail = async (req: Request, res: Response) => {
  try {
    const token: string = req?.query?.token as string;
    // find user with given token
    const user = await UserModel(database).findOne({
      where: { verification_token: token },
    });

    // update is verified from false to true
    const updateUser = await UserModel(database)
      .update({ is_verified: true }, { where: { email: user?.email } })
      .then((user) => console.log("from then: ", user));

    console.log("Updated User: ", updateUser);

    return res.render("emailVerified", {
      heading: "Congratulations 🎉",
      username: `${user?.first_name} ${user?.last_name}`,
      signInUrl: "https://www.google.com",
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};
