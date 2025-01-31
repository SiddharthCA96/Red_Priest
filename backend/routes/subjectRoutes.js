import express from "express";
import {
  saveSubject,
  getSubject,
  deleteSubject,
  updateSubjectAttendence,
} from "../controllers/subjectController.js";
import { authMiddleware } from "../middlewares/auth.js";

export const subjectRouter=express.Router();
//route to create a subject in attendence tracker
subjectRouter.post("/createSubject", authMiddleware, saveSubject);

//route to fetch all subjects fromm subjectProfiles (in attendence section)
subjectRouter.get("/getSubject", authMiddleware, getSubject);

//route to delete a subject from subjectsProfiles
subjectRouter.delete("/deleteSubject", authMiddleware, deleteSubject);

//route to updateSubjectAttendence
subjectRouter.patch(
  "/updateSubjectAttendence",
  authMiddleware,
  updateSubjectAttendence
);
