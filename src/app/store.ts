// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../features/api/authApi'; // RTK Query API slice
import authReducer from '../features/slices/authSlice'; // Client-side auth slice

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer, // RTK Query
        auth: authReducer, // Redux Toolkit for client-side auth state
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware), // Add RTK Query middleware
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;