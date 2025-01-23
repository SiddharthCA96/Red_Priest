import { createSlice } from '@reduxjs/toolkit';
import profilePhoto from '../assets/profilePic.png';

const initialState = {
  profilePhoto: profilePhoto, 
  userName: "Jay Prakash",   
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserInfo(state, action) {
      const { profilePhoto, userName } = action.payload;
      state.profilePhoto = profilePhoto || state.profilePhoto;
      state.userName = userName || state.userName;
    },
  },
});

export const { updateUserInfo } = userSlice.actions;
export default userSlice.reducer;
