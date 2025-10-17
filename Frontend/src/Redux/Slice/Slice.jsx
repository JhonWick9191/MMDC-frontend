import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("Cart")) || [];

export const CartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    add: (state, action) => {
      const index = state.findIndex(item => item.id === action.payload._id);
      if (index !== -1) {
        state[index].quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    remove: (state, action) => {
      return state.filter(item => item._id !== action.payload);
    },
    incrementQuantity: (state, action) => {
      const index = state.findIndex(item => item.id === action.payload);
      if (index !== -1) {
        state[index].quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const index = state.findIndex(item => item.id === action.payload);
      if (index !== -1 && state[index].quantity > 1) {
        state[index].quantity -= 1;
      }
    }
  }
});

export const { add, remove, incrementQuantity, decrementQuantity } = CartSlice.actions;
export default CartSlice.reducer;
