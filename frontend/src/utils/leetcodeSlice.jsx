import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cards: [
    {
      solved: 581,
      total: 3430,
      easy: { solved: 215, total: 852 },
      medium: { solved: 332, total: 1786 },
      hard: { solved: 34, total: 792 },
      badge: "Knight"
    }
  ],
};

const leetcodeSlice = createSlice({
  name: 'leetcode',
  initialState,
  reducers: {
    updateCard(state, action) {
      const { index, updatedCard } = action.payload;
      state.cards[index] = updatedCard;
    },
  },
});

export const { updateCard } = leetcodeSlice.actions;
export default leetcodeSlice.reducer;
