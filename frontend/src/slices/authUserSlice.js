import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginService, logoutService } from '../services/authService';

const initialState = {
    user: {},
    isAuthenticated: false
};

export const login = createAsyncThunk('auth/login', async loginCred => {
    const response = await loginService(loginCred);
    const data = response.data;
    return data;
});

export const logout = createAsyncThunk('auth/logout', async () => {
    await logoutService();
});

const authUserSlice = createSlice({
    name: 'authUser',
    initialState,
    reducers: {},
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            localStorage.setItem('token', action.payload.authToken);
        },
        [logout.fulfilled]: (state, action) => {
            state.isAuthenticated = false;
            state.user = {};
            localStorage.removeItem('token');
        }
    }
});

export default authUserSlice.reducer;