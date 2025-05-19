// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state for auth
const initialState = {
    isAuthenticated: false,
    token: null,
    user: null,
};

// Create the auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Action to log the user in
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;

            const authData = {
                token: action.payload.token,
                user: JSON.stringify(action.payload.user),
                isAuthenticated: true,
            };

            localStorage.setItem('auth', JSON.stringify(authData));

        },
        // Action to log the user out
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;

            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('isAuthenticated');
        },
    },
});

// Export actions
export const { loginSuccess, logout } = authSlice.actions;

// Export reducer
export default authSlice.reducer;