import React from "react";

const LeetcodeCard = ({ solved, easy, medium, hard, rating, badge }) => {
  return (
    <div className="flex flex-col bg-gray-800 mt-20 text-white p-6 rounded-xl shadow-lg w-full h-60 shadow-red-800 border  border-gray-300 hover:border-white ">
      <h1 className="text-2xl font-bold mb-4 text-center">Leetcode</h1>
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between">
          <span className="text-lg font-medium text-yellow-400">
            Total Questions:
          </span>
          <span className="text-lg font-bold">{solved}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-lg font-medium text-yellow-400">Easy:</span>
          <span className="text-lg font-bold">{easy}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-lg font-medium text-yellow-400">Medium:</span>
          <span className="text-lg font-bold">{medium}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-lg font-medium text-yellow-400">Hard:</span>
          <span className="text-lg font-bold">{hard}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-lg font-medium text-green-400">Rating:</span>
          <span className="text-lg font-bold">{rating}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-lg font-medium text-green-400">Badge:</span>
          <span className="text-lg font-bold">{badge}</span>
        </div>
      </div>
    </div>
  );
};

export default LeetcodeCard;
