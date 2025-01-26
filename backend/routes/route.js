import express from "express";
import { signin,signup,updateInfo,getUser,saveDetails,saveSubject } from "../controllers/authControllers.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();
// router.get("check-auth",authMiddleware);

//signup route
router.post("/signup", signup);
//signin route
router.post("/signin", signin);

//save user profiles detail route
router.post("/saveDetails",saveDetails)

//route to create a subject in attendence tracker
router.post("/createSubject",saveSubject)

//update uder personal info route
router.put("updateInfo", authMiddleware, updateInfo);

//get user route
router.get("getUser", getUser);
export default router;