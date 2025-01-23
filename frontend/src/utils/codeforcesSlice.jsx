import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cards: [
    {
      total: 400,
      maxRating: 1200,
      badge: "Pupil",
      maxStreak:50
    }
  ],
};

const codeforcesSlice = createSlice({
  name: 'codeforces',
  initialState,
  reducers: {
    updateCard(state, action) {
      const { index, updatedCard } = action.payload;
      state.cards[index] = updatedCard;
    },
  },
});

export const { updateCard } = codeforcesSlice.actions;
export default codeforcesSlice.reducer;
