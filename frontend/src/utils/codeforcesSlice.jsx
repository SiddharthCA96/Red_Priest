import { createSlice } from '@reduxjs/toolkit';


const codeforcesSlice = createSlice({
  name: 'codeforces',
  initialState: {
    solved: 0,
    currentRating: 0,
    maxRating: 0,
    currentRanking: null,
    maxRanking: null,
  },
  reducers: {
    updateCard(state, action) {
      // Update state properties individually
      state.solved = action.payload.problemsSolved || 0;
      state.currentRating = action.payload.currentRating || 0;
      state.maxRating = action.payload.maxRating || 0;
      state.currentRanking = action.payload.currentRank || null;
      state.maxRanking = action.payload.maxRank || null;
    },
  },
});

export const { updateCard } = codeforcesSlice.actions;
export default codeforcesSlice.reducer;
