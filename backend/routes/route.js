import express from "express";
import { userRouter } from "./userRoutes.js";
import { todoRouter } from "./todoRoutes.js";
import { subjectRouter } from "./subjectRoutes.js";
const router = express();


// Define routes
router.use("/users", userRouter);
router.use("/todos", todoRouter);
router.use("/subjects", subjectRouter);
export default router;
