import { configureStore } from "@reduxjs/toolkit";

import cartReducer from './cart'
import authReducer from './auth'

const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer, // Add auth to the store
    }
});

export default store