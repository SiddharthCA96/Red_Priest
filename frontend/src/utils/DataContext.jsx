import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    leetcode: {
      ranking: null,
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0,
      totalSolved: 0,
      totalQuestions: 0,
    },
    codeforces: {
      maxRank: null,
      maxRating: 0,
      friendOfCount: 0,
    },
    gfg: {
      instituteName: '',
      instituteRank: 0,
      podSolvedLongestStreak: 0,
      totalProblemsSolved: 0,
      score: 0,
      name:null,
      profile_image_url:null
    },
  });

  const updateData = (platform, platformData) => {
    setData((prev) => ({
      ...prev,
      [platform]: { ...prev[platform], ...platformData },
    }));
  };

  return (
    <DataContext.Provider value={{ data, updateData }}>
      {children}
    </DataContext.Provider>
  );
};
