import { configureStore } from '@reduxjs/toolkit';
import { CartSlice } from './Slice/Slice';
import WislistSlice from "./Slice/WishListSlice"

export const store = configureStore({
    reducer: {
        Cart: CartSlice.reducer,
        Wishlist: WislistSlice,

    }
});

// Cart state ko localStorage me save karna
store.subscribe(() => {
    localStorage.setItem("Cart", JSON.stringify(store.getState().Cart));
    localStorage.setItem("wishlist", JSON.stringify(store.getState().Wishlist));
});
