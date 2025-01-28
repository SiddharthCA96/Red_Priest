import zod from "zod";
import { SubjectProfiles } from "../db/index.js";

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
      return res
        .status(404)
        .json({ message: "Subject not found or unauthorized" });
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
      return res
        .status(404)
        .json({ message: "Subject not found or unauthorized" });
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
