import express from "express";
import {
  createTodo,
  getTodos,
  deleteTodo,
} from "../controllers/todoController.js";
import { authMiddleware } from "../middlewares/auth.js";

export const todoRouter=express.Router();
//route to create todo
todoRouter.post("/createTodo", authMiddleware, createTodo);

//route to fetch all todos
todoRouter.get("/getTodos", authMiddleware, getTodos);

//route to delete todo
todoRouter.delete("/deleteTodo", authMiddleware, deleteTodo);
