import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCard } from "../utils/leetcodeSlice";
import { useSelector } from "react-redux";
const useLeetcode = () => {
  const dispatch = useDispatch();
  console.log("inside use leetcode hook");
  //   const totalSolved = useSelector((state) => state.leetcode.totalSolved);

  ///fuction to hit the leetcide api
  const userLeetcodeData = async () => {
    try {
      const [solvedResponse, ratingResponse] = await Promise.all([
        axios.get(
          "https://alfa-leetcode-api.onrender.com/Master_Jiraiya/solved"
        ),
        axios.get(
          "https://alfa-leetcode-api.onrender.com/userContestRankingInfo/Master_Jiraiya"
        ),
      ]);
      //   console.log('Solved Problems:', solvedResponse.data);
      //   console.log('Solved Problems:', solvedResponse.data.solvedProblem);
      //   console.log('Profile Info:', ratingResponse.data);
      //   console.log('Profile Info:', ratingResponse.data.data.userContestRanking.badge.name);
      const totalSolved = solvedResponse.data.solvedProblem;
      const totalEasy = solvedResponse.data.easySolved;
      const totalMedium = solvedResponse.data.mediumSolved;
      const totalHard = solvedResponse.data.hardSolved;
      const currentRating = ratingResponse.data.data.userContestRanking.rating;
      const currentBadge=ratingResponse.data.data.userContestRanking.badge.name;
      console.log(
        "All data:",
        totalSolved,
        totalEasy,
        totalMedium,
        totalHard,
        currentRating,
        currentBadge
      );

      //dispatching the action to save this thing in store
      dispatch(
        updateCard({
          totalSolved,
          totalEasy,
          totalMedium,
          totalHard,
          currentRating,
          currentBadge,
        })
      );
    } catch (error) {
      console.error("Error fetching user LeetCode data:", error.message);
      throw error;
    }
  };
  useEffect(() => {
    console.log("calling the api");
    userLeetcodeData();
  }, []);
};

export default useLeetcode;
