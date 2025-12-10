import { createSlice } from "@reduxjs/toolkit";

// Safe JSON parse function


const initialState = {
  token: null, // ab localStorage se nahi le rahe
  user: null,  // ab localStorage se nahi le rahe
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload; // Redux state me hi save
    },
    setUser(state, action) {
      state.user = action.payload; // Redux state me hi save
    },
  },
});

export const { setToken, setUser } = authSlice.actions;
export default authSlice.reducer;
