import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  role: null,
};

const userSlice = createSlice({
  name: "inblock",
  initialState,
  reducers: {
    setInblockCurrentUser(inblock, action) {
      inblock.currentUser = action.payload;
    },
    setInblockUserRole(inblock, action) {
      inblock.role = action.payload;
    },
  },
});

export const { setInblockCurrentUser, setInblockUserRole } = userSlice.actions;

export default userSlice.reducer;
