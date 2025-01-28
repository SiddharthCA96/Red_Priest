import express from "express";
import {
  signin,
  signup,
  updateInfo,
  getUser,
} from "../controllers/authControllers.js";
import {
  createTodo,
  getTodos,
  deleteTodo,
} from "../controllers/todoController.js";
import { saveDetails } from "../controllers/profilesController.js";
import {
  saveSubject,
  getSubject,
  deleteSubject,
  updateSubjectAttendence,
} from "../controllers/subjectController.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();
// router.get("check-auth",authMiddleware);

//signup route
router.post("/signup", signup);
//signin route
router.post("/signin", signin);

//update uder personal info route
router.put("updateInfo", authMiddleware, updateInfo);

//save user profiles detail route
router.patch("/saveDetails", authMiddleware, saveDetails);

//route to create a subject in attendence tracker
router.post("/createSubject", authMiddleware, saveSubject);

//route to fetch all subjects fromm subjectProfiles (in attendence section)
router.get("/getSubject", authMiddleware, getSubject);

//route to delete a subject from subjectsProfiles
router.delete("/deleteSubject", authMiddleware, deleteSubject);

//route to updateSubjectAttendence
router.patch(
  "/updateSubjectAttendence",
  authMiddleware,
  updateSubjectAttendence
);

//route to create todo
router.post("/createTodo", authMiddleware, createTodo);

//route to fetch all todos
router.get("/getTodos", authMiddleware, getTodos);

//route to delete todo
router.delete("/deleteTodo", authMiddleware, deleteTodo);

//get user route
router.get("getUser", getUser);
export default router;
