import zod from "zod";
import { User } from "../db/index.js";

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
    const userId = req.userid;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          "userProfiles.leetcodeId": leetcodeId || null,
          "userProfiles.codeforcesId": codeforcesId || null,
          "userProfiles.gfgId": gfgId || null,
          "userProfiles.githubId": githubId || null,
        },
      },
      { new: true, runValidators: true } // Return the updated document and validate changes
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
