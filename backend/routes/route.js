import express from "express";
import { userRouter } from "./userRoutes.js";
import { todoRouter } from "./todoRoutes.js";
import { subjectRouter } from "./subjectRoutes.js";
import { groupRouter } from "./groupRoutes.js";
const router = express();


// Define routes
router.use("/users", userRouter);
router.use("/todos", todoRouter);
router.use("/subjects", subjectRouter);
router.use("/groups",groupRouter);
export default router;