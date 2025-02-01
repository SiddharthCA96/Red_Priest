import { User, Group } from "../db/index.js";
// import { io } from "..";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";
import dotenv from "dotenv";

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

//function to create group;
export const createGroup = async (req, res) => {
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
