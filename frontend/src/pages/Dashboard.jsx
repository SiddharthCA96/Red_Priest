import React, { useContext } from 'react';
import DashbordNavbar from '../components/DashbordNavbar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import LeetcodeCard from '../components/cards/LeetcodeCard';
import CodeforceCard from '../components/cards/CodeForcesCard';
import { DataContext } from '../utils/DataContext';
import GfgCard from '../components/cards/GfgCard';

export const Dashboard = () => {
  const { data } = useContext(DataContext); 
  console.log(data);

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <DashbordNavbar label={"DASHBOARD"} />
      <div className="flex flex-grow">
        <Sidebar />
        <div className="flex-grow ml-[180px] p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {data.leetcode ? (
              <LeetcodeCard
                solved={data.leetcode.totalSolved}
                total={data.leetcode.totalQuestions}
                easy={{ solved: data.leetcode.easySolved, total: data.leetcode.totalEasy }}
                medium={{ solved: data.leetcode.mediumSolved, total: data.leetcode.totalMedium }}
                hard={{ solved: data.leetcode.hardSolved, total: data.leetcode.totalHard }}
                badge={data.leetcode.ranking}
              />
            ) : null}
            {data.codeforces ? (
              <CodeforceCard
                total={"N/A"}
                maxRank={data.codeforces.maxRank}
                maxRating={data.codeforces.maxRating}
                friendOfCount={data.codeforces.friendOfCount}
              />
            ) : null}
             {data.gfg ? (
              <GfgCard
              instituteName={data.gfg.instituteName}
              totalProblemsSolved={data.gfg.totalProblemsSolved}
              score={data.gfg.score}
              podSolvedLongestStreak={data.gfg.podSolvedLongestStreak}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
