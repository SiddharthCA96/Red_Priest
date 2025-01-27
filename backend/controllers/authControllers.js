import zod, { string } from "zod";
import { User, SubjectProfiles, Todo } from "../db/index.js";
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

  try {
    const { leetcodeId, codeforcesId, gfgId, githubId } = req.body;
    // Find the user and update their profiles
    const userId = req.userid; 
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        leetcodeId: leetcodeId || null,
        codeforcesId: codeforcesId || null,
        gfgId: gfgId || null,
        githubId: githubId || null,
      },
      { new: true, runValidators: true } // Return the updated document and validate the changes
    );

    if (updatedUser) {
      return res.json({
        message: "Profiles Updated",
        data: updatedUser,
      });
    }

    res.status(404).json({
      message: "User not found",
    });
  } catch (error) {
    console.error("Error while updating profiles:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

///subject profiles
const subjectBody = zod.object({
  subjectName: zod.string().min(1),
  presentDays: zod
    .array(
      zod.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
      })
    )
    .optional(),
  absentDays: zod
    .array(
      zod.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
      })
    )
    .optional(),
});
//function to save a subject details in mongo db
export const saveSubject = async (req, res) => {
  const { success } = subjectBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Please give subject name",
    });
  }
  console.log(req.userid);
  
  const subject = await SubjectProfiles.create({
    subjectName: req.body.subjectName,
    presentDays: [],
    absentDays: [],
    user: req.userid, 
  });

  if (subject) {
    res.json({
      msg: "Subject Created",
      subject,
    });
    return;
  }

  res.status(411).json({
    message: "Error while Creating Subject",
  });
};

//function to get all subjects from db
export const getSubject = async (req, res) => {
  try {
    const allSubjects = await SubjectProfiles.find({ user: req.userid }); // Filter by user ID
    const subjects = allSubjects.map((subject) => ({
      subjectName: subject.subjectName,
      presentDays: subject.presentDays,
      absentDays: subject.absentDays,
      _id: subject._id,
    }));
    res.json({ subjects });
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).json({ error: "Failed to fetch subjects" });
  }
};
//function to delete a subject
export const deleteSubject = async (req, res) => {
  try {
    const { _id } = req.query;

    const subject = await SubjectProfiles.findOne({ _id, user: req.userid }); // Ensure the subject belongs to the user
    if (!subject) {
      return res.status(404).json({ message: "Subject not found or unauthorized" });
    }

    await SubjectProfiles.findByIdAndDelete(_id);
    res.status(200).json({ message: "Subject deleted successfully" });
  } catch (error) {
    console.error("Error deleting subject:", error);
    res.status(500).json({ message: "Failed to delete subject" });
  }
};
//function to update the attendence of a particular subject
export const updateSubjectAttendence = async (req, res) => {
  try {
    const { _id } = req.query;
    const { date, action } = req.body;

    if (!_id || !date || !action) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const subject = await SubjectProfiles.findOne({ _id, user: req.userid }); // Ensure the subject belongs to the user
    if (!subject) {
      return res.status(404).json({ message: "Subject not found or unauthorized" });
    }

    // Rest of the logic remains the same
    switch (action) {
      case "markPresent":
        if (!subject.presentDays.includes(date)) {
          subject.presentDays.push(date);
        }
        break;
      case "markAbsent":
        if (!subject.absentDays.includes(date)) {
          subject.absentDays.push(date);
        }
        break;
      case "clear":
        subject.presentDays = subject.presentDays.filter((d) => d !== date);
        subject.absentDays = subject.absentDays.filter((d) => d !== date);
        break;
      default:
        return res.status(400).json({ message: "Invalid action" });
    }

    await subject.save();
    res.status(200).json({
      message: "Subject attendance updated successfully",
      subject: {
        subjectName: subject.subjectName,
        presentDays: subject.presentDays,
        absentDays: subject.absentDays,
      },
    });
  } catch (error) {
    console.error("Error in updating subject attendance:", error);
    res.status(500).json({ message: "Failed to update subject attendance" });
  }
};

//todo body
const todoBody = zod.object({
  title: zod.string().min(1),
  description: zod.string().optional(),
  isCompleted: zod.boolean().optional(),
});
//function to create a todo
export const createTodo = async (req, res) => {
  const { success } = todoBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Please give Todo a Title",
    });
  }

  const existingTodo = await Todo.findOne({
    title: req.body.title,
    user: req.userid, // Ensure the todo title is unique for the user
  });

  if (existingTodo) {
    return res.status(411).json({
      message: "Todo already exists",
    });
  }

  const todo = await Todo.create({
    title: req.body.title,
    description: req.body.description,
    isCompleted: false,
    user: req.userid, // Add the user ID from the authenticated request
  });

  if (todo) {
    res.json({
      msg: "Todo Created",
      todo,
    });
    return;
  }

  res.status(411).json({
    message: "Error while Creating Todo",
  });
};
//function to fetch all todos
export const getTodos = async (req, res) => {
  try {
    const allTodos = await Todo.find({ user: req.userid }); // Filter by user ID
    const todos = allTodos.map((todo) => ({
      title: todo.title,
      description: todo.description,
      isCompleted: todo.isCompleted,
    }));
    res.json({ todos });
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};
//function to delete a todo
export const deleteTodo = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const result = await Todo.findOneAndDelete({ title, user: req.userid }); // Ensure the todo belongs to the user
    if (!result) {
      return res.status(404).json({ message: "Todo not found or unauthorized" });
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ message: "Failed to delete todo" });
  }
};