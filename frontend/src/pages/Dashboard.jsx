import React from "react";
import DashbordNavbar from "../components/DashbordNavbar";
import Sidebar from "../components/Sidebar";
import CodeforceCard from "../components/CodeForcesCard";
import { useSelector } from "react-redux";
import useCodeforces from "../hooks/useCodeforces";
import useLeetcode from "../hooks/UseLeetcode";
import LeetcodeCard from "../components/LeetcodeCard"

export const Dashboard = () => {
  // console.log("calling useleetcode hook");
  // useLeetcode();
  // useCodeforces()

  // calling the useselector to get the data from the store
  const data = useSelector((state) => state.leetcode);
  const cfData = useSelector((state) => state.codeforces);
  console.log(cfData);
  
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <DashbordNavbar label={"DASHBOARD"} />
      <div className="flex flex-grow">
        <Sidebar />
        <div className="flex-grow ml-[180px] p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {data ? (
              <LeetcodeCard
                solved={data.totalSolved}
                easy={data.totalEasy}
                medium={data.totalMedium}
                hard={data.totalHard}
                rating={data.curentRating}
                badge={data.currentBadge}
              />
            ) : null}
            {cfData ? (
              <CodeforceCard
                total={cfData.solved}
                maxRank={cfData.maxRank}
                maxRating={cfData.maxRating}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
