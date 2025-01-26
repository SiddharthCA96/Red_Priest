import zod, { string } from "zod";
import { User, UserProfiles,SubjectProfiles } from "../db/index.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

//get the body
const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
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
  password: zod.string(),
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

//user profiles body
const profileBody = zod.object({
  leetcodeId: zod.string().optional(),
  codeforcesId: zod.string().optional(),
  gfgId: zod.string().optional(),
  githubId: zod.string().optional(),
});

//function to save the users profiles in mongo db
export const saveDetails = async (req, res) => {
  const { success } = profileBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const data = await UserProfiles.create({
    leetcodeId: req.body.leetcodeId || null,
    codeforcesId: req.body.codeforcesId || null,
    gfgId: req.body.gfgId || null,
    githubId: req.body.githubId || null,
  });
  if (data) {
    res.json({
      msg: "Profiles Updated",
      data,
    });
    return;
  }
  res.status(411).json({
    message: "Error while updating Profiles",
  });
};

///subject profiles
const subjectBody=zod.object({
  subjectName:zod.string(),
  presentDaye:zod.number().optional(),
  absentDays:zod.number().optional(),
});

//function to save a subject details in mongo db
export const saveSubject=async(req,res)=>{
  const { success } = subjectBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Please give subject name",
    });
  }
  const subject=await SubjectProfiles.create({
    subjectName:req.body.subjectName,
    presentDays:0,
    absentDays:0
  });
  if(subject){
    res.json({
      msg: "Subject Created",
      subject,
    });
    return;
  }
  res.status(411).json({
    message: "Error while Creating Subject",
  });
}

//function to get all subjects from db
export const getSubject = async (req, res) => {
  try {
    const allSubjects = await SubjectProfiles.find({});
    const subjects = allSubjects.map((subject) => ({
      subjectName: subject.subjectName,
      presentDays: subject.presentDays,
      absentDays: subject.absentDays,
      _id: subject._id,
    }));
    res.json({ subjects });
  } catch (error) {
    console.error('Error fetching subjects:', error);
    res.status(500).json({ error: 'Failed to fetch subjects' });
  }
};