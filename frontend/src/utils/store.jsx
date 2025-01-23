import { configureStore } from '@reduxjs/toolkit';
import leetcodeReducer from './leetcodeSlice';  
import codeforcesReducer from './codeforcesSlice'; 
import userReducer from './userSlice'; 
const store = configureStore({
  reducer: {
    leetcode: leetcodeReducer,   
    codeforces: codeforcesReducer,
    user: userReducer, 
    
  },
});

export default store;
