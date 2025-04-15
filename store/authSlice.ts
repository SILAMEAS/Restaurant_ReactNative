// store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginResponse} from "@/services/authApi";

interface AuthState {
    isLoading: boolean;
    userLogin:LoginResponse
}
const initialState: AuthState = {
    isLoading: true,
    userLogin:{
        accessToken:null,
        userId:NaN,
        role:"",
        refreshToken:null
    }
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserLogin: (state, action: PayloadAction<LoginResponse>) => {
            state.userLogin = action.payload;
            if (action.payload.accessToken != null) {
                AsyncStorage.setItem('accessToken', action.payload.accessToken).then(r => console.log("accessToken to authToken ", r));
            } // Persist token
            if (action.payload.refreshToken != null) {
                AsyncStorage.setItem('refreshToken', action.payload.refreshToken).then(r => console.log("refreshToken to authToken ", r));
            } // Persist token
        },
        logout: (state) => {
            state.userLogin = initialState.userLogin;
            AsyncStorage.removeItem('accessToken').then(r => console.log("remove accessToken from authToken ",r) );
            AsyncStorage.removeItem('refreshToken').then(r => console.log("remove refreshToken from authToken ",r) );
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setUserLogin, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;