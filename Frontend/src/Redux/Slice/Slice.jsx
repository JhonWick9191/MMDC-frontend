import { createSlice } from "@reduxjs/toolkit";

// Initial state: from localStorage or empty array
const initialState = JSON.parse(localStorage.getItem("Cart")) || [];

export const CartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    // Add product to cart or increase quantity if already present
    add: (state, action) => {
      const { _id, Product_Quantity } = action.payload;
      const index = state.findIndex(item => item._id === _id);
      if (index !== -1) {
        // Limit check: only increase if less than available stock
        if (state[index].quantity < Product_Quantity) {
          state[index].quantity += 1;
        }
      } else {
        // Add new item with default quantity 1
        state.push({ ...action.payload, quantity: 1 });
      }
    },

    // Remove product from cart
    remove: (state, action) => {
      return state.filter(item => item._id !== action.payload);
    },

    // Increase quantity, but not greater than stock
    incrementQuantity: (state, action) => {
      const index = state.findIndex(item => item._id === action.payload);
      if (index !== -1) {
        if (state[index].quantity < state[index].Product_Quantity) {
          state[index].quantity += 1;
        }
      }
    },

    // Decrease quantity, minimum 1
    decrementQuantity: (state, action) => {
      const index = state.findIndex(item => item._id === action.payload);
      if (index !== -1 && state[index].quantity > 1) {
        state[index].quantity -= 1;
      }
    },

    // Optional: To load cart from local storage
    loadFromLocalStorage: (state) => {
      const stored = JSON.parse(localStorage.getItem("Cart"));
      if (stored) {
        return stored;
      }
    },

    // Save current state to local storage (can be called in middleware or component)
    saveToLocalStorage: (state) => {
      localStorage.setItem("Cart", JSON.stringify(state));
    }
  }
});

// Export actions
export const {
  add,
  remove,
  incrementQuantity,
  decrementQuantity,
  loadFromLocalStorage,
  saveToLocalStorage
} = CartSlice.actions;

// Export reducer
export default CartSlice.reducer;
