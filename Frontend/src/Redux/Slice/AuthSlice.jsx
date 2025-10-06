import { createSlice } from "@reduxjs/toolkit";

// Safe JSON parse function
function parseJSONSafe(item) {
  try {
    return item ? JSON.parse(item) : null;
  } catch (e) {
    return null;
  }
}

const initialState = {
  // token: parseJSONSafe(localStorage.getItem("token")),
  user: parseJSONSafe(localStorage.getItem("user")),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem("token", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("token");
      }
    },
    setUser(state, action) {
      state.user = action.payload;
      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("user");
      }
    },
  },
});

export const { setToken, setUser } = authSlice.actions;
export default authSlice.reducer;
