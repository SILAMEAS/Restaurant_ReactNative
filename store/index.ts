import { configureStore } from '@reduxjs/toolkit';
import { api } from '@/services/api'; // your RTK Query service
import authReducer from './authSlice';
import {authApi} from "@/services/authApi";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware,authApi.middleware),
});
// Optionally, reset the store on reload
if (__DEV__) {
    // Reset store on reload (you can trigger this manually in Expo)
    store.dispatch(api.util.resetApiState());
}
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
