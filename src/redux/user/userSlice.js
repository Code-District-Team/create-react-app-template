import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: ""
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    saveUserData: (state, action) => {
      state.userDetails = action.payload;
    }
  },
});

export const { saveUserData } = userSlice.actions;

export default userSlice.reducer;