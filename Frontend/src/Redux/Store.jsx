import { configureStore } from '@reduxjs/toolkit';
import { CartSlice } from './Slice/Slice';
import WislistSlice from "./Slice/WishListSlice";
import authSlice from "./Slice/AuthSlice"



export const store = configureStore({
    reducer: {
        Cart: CartSlice.reducer,
        Wishlist: WislistSlice,
        auth:authSlice

    }
});

// Cart state ko localStorage me save karna
store.subscribe(() => {
    localStorage.setItem("Cart", JSON.stringify(store.getState().Cart));
    localStorage.setItem("wishlist", JSON.stringify(store.getState().Wishlist));
});
