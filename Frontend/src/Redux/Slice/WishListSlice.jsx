import { createSlice } from "@reduxjs/toolkit";

// localStorage se initial state uthao ya empty array default rakho
const initialState = JSON.parse(localStorage.getItem("wishlist")) || [];

const WishlistSlice = createSlice({
  name: "Wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const index = state.findIndex(item => item._id === action.payload._id);
      if (index === -1) {
        state.push(action.payload);
      }
    },
    removeFromWishlist: (state, action) => {
      console.log("Wishlist is clicked")
      return state.filter(item => item._id !== action.payload._id);
    }
  }
});

export const { addToWishlist, removeFromWishlist } = WishlistSlice.actions;
export default WishlistSlice.reducer;
