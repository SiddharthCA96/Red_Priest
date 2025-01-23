import React from 'react';
import DashbordNavbar from '../components/DashbordNavbar';
import Sidebar from '../components/Sidebar';
import LeetcodeCard from '../components/LeetcodeCard';
import { useSelector } from 'react-redux';
import CodeforceCard from '../components/CodeForcesCard';

export const Dashboard = () => {
  const cards = useSelector((state) => state.leetcode.cards);
  const codeforces = useSelector((state) => state.codeforces.cards);

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <DashbordNavbar />
      <div className="flex flex-grow">
        <Sidebar />

        <div className="flex-grow ml-[180px] p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {cards.map((card, index) => (
              <LeetcodeCard key={index} {...card} />
            ))}
            {codeforces.map((card, index) => (
              <CodeforceCard key={index} {...card} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
