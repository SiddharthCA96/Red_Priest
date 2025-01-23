import React from "react";

const LeetcodeCard = ({ solved, total, easy, medium, hard,badge }) => {
  const solvedPercentage = Math.round((solved / total) * 100);

  return (
    <div className="flex flex-col bg-gray-800 text-white p-6 rounded-xl shadow-lg w-full h-60 shadow-red-800 border border-gray-300 hover:border-white  ">
      <h1 className="text-2xl font-bold mb-4 text-center">Leetcode</h1>
      <h1 className="font-bold m-1 text-center text-red-500">Badge: {badge}</h1>
      <div className="flex items-center justify-between">
        <div className="relative flex items-center justify-center">
          <svg
            className="w-24 h-24 transform -rotate-90"
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="text-gray-700"
              strokeDasharray="100, 100"
              strokeWidth="3"
              fill="none"
              stroke="currentColor"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-green-500"
              strokeDasharray={`${solvedPercentage}, 100`}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              stroke="currentColor"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            
            <p className="text-2xl font-bold">{solved}</p>
            <p className="text-sm text-gray-400">/{total}</p>
          </div>
        </div>

        {/* Difficulty Stats */}
        <div className="flex flex-col space-y-2 w-2/3">
          <div className="flex justify-between">
            <span className="text-sm font-medium text-cyan-400">Easy</span>
            <span className="text-sm">
              {easy.solved}/{easy.total}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium text-yellow-400">Medium</span>
            <span className="text-sm">
              {medium.solved}/{medium.total}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium text-red-400">Hard</span>
            <span className="text-sm">
              {hard.solved}/{hard.total}
            </span>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default LeetcodeCard;
