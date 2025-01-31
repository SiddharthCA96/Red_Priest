import zod from "zod";
import { User, SubjectProfiles,} from "../db/index.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

//get the body
const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string().min(1),
  lastName: zod.string().min(1),
  password: zod.string().min(3),
});

//signup  forr user
export const signup = async (req, res) => {
  //check for the validation

  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }
  //check for the existing user
  const existingUser = await User.findOne({
    username: req.body.username,
  });
  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken",
    });
  }
  //now if aal above se paas thrn create the new user
  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  //generatet the userid
  const userId = user._id;

  //generate tthe token
  const token = jwt.sign(
    {
      userId,
    },
    jwtSecret
  );
  res.json({
    message: "User created successfully",
    token: token,
  });
};

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string().min(3),
});

//signin for user
export const signin = async (req, res) => {
  //check for input validation
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: " Incorrect inputs",
    });
  }
  //find the user
  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  if (user) {
    const token = jwt.sign(
      {
        userid: user._id,
      },
      process.env.JWT_SECRET
    );
    res.json({
      token: token,
    });
    return;
  }
  //if not found
  res.status(411).json({
    message: "Error while logging in",
  });
};
const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

export const updateInfo = async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating",
    });
  }
  await User.updateOne({ _id: req.userId }, req.body);

  res.json({
    message: "Updated successfully",
  });
};

export const getUser = async (req, res) => {  
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
};





