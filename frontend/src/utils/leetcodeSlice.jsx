import { createSlice } from '@reduxjs/toolkit';

const leetcodeSlice = createSlice({
  name: "leetcode",
  initialState: {
    solved: 0,
    easy: 0,
    medium: 0,
    hard: 0,
    rating: 1500,
    badge: null,
  },
  reducers: {
    updateCard(state, action) {
      state.solved = action.payload.totalSolved || 0;
      state.easy = action.payload.totalEasy || 0;
      state.medium = action.payload.totalMedium || 0;
      state.hard = action.payload.totalHard || 0;
      state.rating = action.payload.currentRating || 1500;
      state.badge = action.payload.currentBadge || null;
    },
  },
});

export const { updateCard } = leetcodeSlice.actions;
export default leetcodeSlice.reducer;
