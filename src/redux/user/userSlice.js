import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  role: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser(user, action) {
      user.currentUser = action.payload;
    },
    setUserRole(user, action) {
      user.role = action.payload;
    },
  },
});

export const { setCurrentUser, setUserRole } = userSlice.actions;

export default userSlice.reducer;
