import React from "react";

const GfgCard = ({ instituteName, totalProblemsSolved, score,podSolvedLongestStreak }) => {
  return (
    <div className="flex flex-col bg-gray-800 mt-15 text-white p-6 rounded-xl shadow-lg w-full h-full shadow-red-800 border  border-gray-300 hover:border-white ">
      <h1 className="text-2xl font-bold mb-4 text-center">GFG</h1>
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between">
          <span className="text-lg font-medium text-red-500">Institute Name:</span>
          <span className="text-lg font-bold">{instituteName}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-lg font-medium text-yellow-400">
            Total Questions:
          </span>
          <span className="text-lg font-bold">{totalProblemsSolved}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-lg font-medium text-green-400">
            Max Score:
          </span>
          <span className="text-lg font-bold">{score}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-lg font-medium text-cyan-400">
            Max Streak:
          </span>
          <span className="text-lg font-bold">{podSolvedLongestStreak}</span>
        </div>
      </div>
    </div>
  );
};

export default GfgCard;