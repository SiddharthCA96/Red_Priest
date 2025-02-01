import express from "express";
import { createGroup } from "../controllers/chatController.js";
import { authMiddleware } from "../middlewares/auth.js";

export const groupRouter=express.Router();

groupRouter.post("/createGroup",authMiddleware,createGroup);