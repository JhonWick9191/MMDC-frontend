import { createSlice } from "@reduxjs/toolkit";

// localStorage se initial state uthao ya empty array default rakho
const initialState = JSON.parse(localStorage.getItem("wishlist")) || [];

const WishlistSlice = createSlice({
  name: "Wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const index = state.findIndex(item => item.id === action.payload.id);
      if (index === -1) {
        state.push(action.payload);
      }
    },
    removeFromWishlist: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    }
  }
});

export const { addToWishlist, removeFromWishlist } = WishlistSlice.actions;
export default WishlistSlice.reducer;
