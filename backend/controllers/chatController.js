import { User, Group } from "../db/index.js";
import mongoose from "mongoose";
// import { io } from "..";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";
import dotenv from "dotenv";
import zod from "zod";

dotenv.config();

const MSSG_SECRET = process.env.MESSEGE_SECRET;
//function to incrept a messege
const encreptMessege = (text) => {
  return CryptoJS.AES.encrypt(text, MSSG_SECRET).toString();
};

//function  to decrypt th messege
const decreptMessege = (encreptMessege) => {
  const bytes = CryptoJS.AES.decrypt(encreptMessege, MSSG_SECRET);
  return bytes.toString(CryptoJS.enc.Utf8);
};
const groupBody = zod.object({
  name: zod.string().min(3),
});
//function to create group;
export const createGroup = async (req, res) => {
  console.log(req.body);

  const { success } = groupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Please give name of atleast 3 char",
    });
  }
  try {
    const { name } = req.body;
    const adminId = req.userid;

    //check if admin is present
    const admin = await User.findById(adminId);
    if (!admin) {
      return res.status(404).json({
        messege: "Admin not found",
      });
    }
    //check if grp with this name is already present for this admin
    const alreadyPresent = await Group.findOne({ name, admin: adminId });
    if (alreadyPresent) {
      return res.status(404).json({
        messege: "You have a grp with this name already",
      });
    }
    //create the grp
    const group = await Group.create({
      name: name,
      groupId: uuidv4(),
      admin: adminId,
      members: [adminId],
    });

    //push this grp in the admin inGroups list
    admin.inGroups.push(group._id);
    await admin.save();

    return res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const joingroupBody = zod.object({
  userId: zod.string(),
  groupId: zod.string(),
});
//function to join group
export const joinGroup = async (req, res) => {
  const { success } = joingroupBody.safeParse(req.body);
  if (!success) {
    return res
      .status(400)
      .json({ message: "Please provide a valid userId and groupId" });
  }

  const { userId, groupId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid userId format" });
  }

  try {
    const group = await Group.findOne({ groupId });
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //  Check if already a member
    if (group.members.includes(userId)) {
      return res
        .status(400)
        .json({ message: "Already a member of this group!" });
    }

    // Add user to group
    group.members.push(userId);
    await group.save();

    // Add group to user's grp  list (if applicable)
    user.inGroups.push(group._id);
    await user.save();

    res.status(200).json({ message: "Joined group successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
