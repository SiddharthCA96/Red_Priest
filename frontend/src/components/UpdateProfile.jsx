import React, { useState, useContext } from 'react';
import { Button } from './Button';
import { InputBox } from './InputBox';
import axios from 'axios';
import { DataContext } from '../utils/DataContext'; 
import { useNavigate } from 'react-router-dom'; 

function UpdateProfile() {
  const { updateData } = useContext(DataContext); 
  const [leetcodeId, setLeetcodeId] = useState('');
  const [codeforces, setcodeforces] = useState('');
  const [gfgId, setGfgId] = useState('');
  const [GithubId, setGitHubId] = useState('');
  
  
  const navigate = useNavigate(); 

  const handleSubmit = async () => {
    try {
      // LeetCode data fetch
      const leetcodePromise = axios
        .get(`https://leetcode-stats-api.herokuapp.com/${leetcodeId}`)
        .then((response) => {
          console.log(response.data);
          updateData('leetcode', {
            ranking: response.data.ranking,
            easySolved: response.data.easySolved,
            mediumSolved: response.data.mediumSolved,
            hardSolved: response.data.hardSolved,
            totalSolved: response.data.totalSolved,
            totalQuestions: response.data.totalQuestions,
            totalEasy: response.data.totalEasy,
            totalHard: response.data.totalHard,
            totalMedium: response.data.totalMedium,
          });
        })
        .catch((err) => {
          console.error('LeetCode Error:', err.message);
        });
  
      const codeforcesPromise = axios
        .get(`https://codeforces.com/api/user.info?handles=${codeforces}`)
        .then((response) => {
          const codeforcesData = response.data.result[0];
          console.log(codeforcesData);
          updateData('codeforces', {
            maxRank: codeforcesData.maxRank,
            maxRating: codeforcesData.maxRating,
            friendOfCount: codeforcesData.friendOfCount,
          });
        })
        .catch((err) => {
          console.error('Codeforces Error:', err.message);
        });

      const gfgPromise = axios
        .get(`https://www.geeksforgeeks.org/gfg-assets/_next/data/XGo1DBKgO7O3hmwcwsv-T/user/${gfgId}.json`)
        .then((response) => {
          const gfgData = response.data.pageProps.userInfo;
          console.log(gfgData);
          updateData('gfg', {
            instituteName: gfgData.institute_name,
            instituteRank: gfgData.institute_rank,
            podSolvedLongestStreak: gfgData.pod_solved_longest_streak,
            totalProblemsSolved: gfgData.total_problems_solved,
            score: gfgData.score,
            name: gfgData.name,
            imageLink: gfgData.profile_image_url,
          });
        })
        .catch((err) => {
          console.error('GFG Error:', err.message);
        });
  
  
      await Promise.all([leetcodePromise, codeforcesPromise, gfgPromise]);
  
      navigate('/dashboard');
    } catch (err) {
      console.error('Unexpected Error:', err.message);
      navigate('/dashboard'); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center">
      <div className="bg-red-800 p-6 rounded-md shadow-md w-96">
        <h1 className="text-2xl font-bold text-center p-5">Update Profile</h1>
        <InputBox placeholder={"jayrakash1200"} label={"Leetcode Id"} onChange={(e) => setLeetcodeId(e.target.value)} />
        <InputBox placeholder={"jayrakash1200"} label={"CodeForces Id"} onChange={(e) => setcodeforces(e.target.value)} />
        <InputBox placeholder={"jayrakash1200"} label={"GFG Id"} onChange={(e) => setGfgId(e.target.value)} />
        <InputBox placeholder={"jayrakash1200"} label={"GitHub Id"} onChange={(e) => setGitHubId(e.target.value)} />
        <div className="pt-5">
          <Button className="m-" label={'Submit'} onClick={handleSubmit} />
        </div> 
      </div>
    </div>
  );
}

export default UpdateProfile;
