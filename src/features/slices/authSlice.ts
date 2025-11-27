// src/features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state type
interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
}

// Initial state
const initialState: AuthState = {
    token: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth', // Slice name
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
        },
    },
});

// Export actions and reducer
export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;