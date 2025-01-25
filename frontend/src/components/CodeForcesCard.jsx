import React from "react";

const CodeforceCard = ({
  total,
  currentRating,
  maxRating,
  currentRanking,
  maxRank,
}) => {
  return (
    <div className="flex flex-col bg-gray-800 mt-20 text-white p-6 rounded-xl shadow-lg w-full h-80 shadow-red-800 border  border-gray-300 hover:border-white ">
      <h1 className="text-2xl font-bold mb-4 text-center">CodeForces</h1>
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between">
          <span className="text-lg font-medium text-yellow-400">
            Total Questions:
          </span>
          <span className="text-lg font-bold">{total}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-lg font-medium text-yellow-400">Rating:</span>
          <span className="text-lg font-bold">{currentRating}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-lg font-medium text-yellow-400">
            Max Rating:
          </span>
          <span className="text-lg font-bold">{maxRating}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-lg font-medium text-green-400">Rank:</span>
          <span className="text-lg font-bold">{currentRanking}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-lg font-medium text-yellow-400">
            Max Ranking:
          </span>
          <span className="text-lg font-bold">{maxRank}</span>
        </div>
      </div>
    </div>
  );
};

export default CodeforceCard;
