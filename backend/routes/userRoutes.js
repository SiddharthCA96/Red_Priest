import express from "express";
import {
  signin,
  signup,
  updateInfo,
  getUser,
} from "../controllers/authControllers.js";
import { saveDetails } from "../controllers/profilesController.js";

import { authMiddleware } from "../middlewares/auth.js";

export const userRouter=express.Router();

//signup route
userRouter.post("/signup", signup);
//signin route
userRouter.post("/signin", signin);

//update uder personal info route
userRouter.put("/updateInfo", authMiddleware, updateInfo);

//save user profiles detail route
userRouter.patch("/saveDetails", authMiddleware, saveDetails);

//get user route
userRouter.get("/getUser", getUser);