import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/user/userSlice'
import cartReducer from './features/cart/cartSlice'

export const store = configureStore({
    reducer:{
        currentUser: userReducer,
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false,
        });
    }
});