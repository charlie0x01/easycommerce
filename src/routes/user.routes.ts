import { Router } from "express";
import { registerUser } from "../controllers/user.controller";
import validateUserMiddleware from "../middlewares/validateUser.middleware";

const userRouter: Router = Router();

userRouter.post("/register", validateUserMiddleware, registerUser);

export default userRouter;
