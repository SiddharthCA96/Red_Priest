import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateCard } from "../utils/codeforcesSlice";

const useCodeforces = () => {
  const dispatch = useDispatch();
  // const totalSolved = useSelector((state) => state.codeforces.total);

  console.log("inside cf hook");

  //write the logic to hit the cd api
  const userCodeforcesData = async () => {
    try {
      const [solvedResponse, profileResponse] = await Promise.all([
        axios.get(
          "https://codeforces.com/api/user.status?handle=Master_Jiraiya96"
        ),
        axios.get(
          "https://codeforces.com/api/user.info?handles=Master_Jiraiya96"
        ),
      ]);

      //get total solved quetsions
      const submissions = solvedResponse.data.result;
      console.log(submissions);

      const uniqueProblems = new Set();
      submissions.forEach((submission) => {
        if (submission.verdict === "OK") {
          const problemId = `${submission.problem.contestId}-${submission.problem.index}`;
          uniqueProblems.add(problemId);
        }
      });
      const problemsSolved = uniqueProblems.size;
      // console.log(problemsSolved);
      // console.log(profileResponse);

      //get the maxrating current rating,maxrank,currrank
      const profile = profileResponse.data.result[0];
      const currentRating = profile.rating || 0;
      const maxRating = profile.maxRating || 0;
      const currentRank = profile.rank || null;
      const maxRank = profile.maxRank || null;

      console.log("Total Problems Solved:", problemsSolved);
      console.log("Current Rating:", currentRating);
      console.log("Max Rating:", maxRating);
      console.log("Max Rank:", maxRank);
      console.log("Current Rank:", currentRank);

      //dispatch the action to save all this in redux store
      dispatch(
        updateCard({
          problemsSolved,
          currentRating,
          maxRating,
          currentRank,
          maxRank,
        })
      );
    } catch (error) {
      console.error("Error fetching user LeetCode data:", error.message);
      throw error;
    }
  };

  useEffect(() => {
    console.log("calling the fcn");

    userCodeforcesData();
  }, []);
};

export default useCodeforces;
