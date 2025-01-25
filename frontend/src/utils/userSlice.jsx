import { createSlice } from '@reduxjs/toolkit';
import profilePhoto from '../assets/profilePic.png';



const userSlice = createSlice({
  name: 'user',
  initialState:{
    profilePhoto: profilePhoto, 
    userName: "Jay Prakash",   
  },
  reducers: {
    updateUserInfo(state, action) {
      //sets the initial state as the payload
      return action.payload;
    },
    removeUser(state,action){
      return null;
    }
  },
});

export const { updateUserInfo,removeUser } = userSlice.actions;
export default userSlice.reducer;
