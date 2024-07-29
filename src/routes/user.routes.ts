import { Router } from "express";
import { registerUser, verifyUserEmail } from "../controllers/user.controller";
import validateUserMiddleware from "../middlewares/validateUser.middleware";
import isUserVerifiedMiddleware from "../middlewares/isUserVerified.middleware";

const userRouter: Router = Router();

userRouter.post("/register", validateUserMiddleware, registerUser);
userRouter.get("/verify-email", isUserVerifiedMiddleware, verifyUserEmail);

export default userRouter;
