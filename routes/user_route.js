import { Router } from "express";
import { getUser, login, signup } from "../controllers/user_controller.js";

const userRouter = Router();

userRouter.post("/users/signup", signup);

userRouter.post("/users/login", login);

userRouter.get("/users/:email", getUser);

export default userRouter;
