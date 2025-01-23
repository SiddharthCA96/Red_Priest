import React from "react";

const CodeforceCard = ({ total, maxRank, maxRating, friendOfCount }) => {
  return (
    <div className="flex flex-col bg-gray-800 mt-20 text-white p-6 rounded-xl shadow-lg w-full h-60 shadow-red-800 border  border-gray-300 hover:border-white ">
      <h1 className="text-2xl font-bold mb-4 text-center">CodeForces</h1>
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between">
          <span className="text-lg font-medium text-red-500">Badge:</span>
          <span className="text-lg font-bold">{maxRank}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-lg font-medium text-yellow-400">
            Total Questions:
          </span>
          <span className="text-lg font-bold">{total}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-lg font-medium text-green-400">
            Max Rating:
          </span>
          <span className="text-lg font-bold">{maxRating}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-lg font-medium text-cyan-400">
            Total Friend:
          </span>
          <span className="text-lg font-bold">{friendOfCount}</span>
        </div>
      </div>
    </div>
  );
};

export default CodeforceCard;