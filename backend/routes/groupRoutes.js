import express from "express";
import { createGroup, deleteGroup, joinGroup } from "../controllers/chatController.js";
import { authMiddleware } from "../middlewares/auth.js";

export const groupRouter=express.Router();

groupRouter.post("/createGroup",authMiddleware,createGroup);
groupRouter.post("/joinGroup",joinGroup);
groupRouter.delete("/deleteGroup",deleteGroup);