import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    user: {},
    isAuthenticated: false
}

export const login = createAsyncThunk('auth/login', async loginCred => {
    const response = await axios.post('/mockApi/users/login', loginCred);
    const data = response.data;
    return data;
});

export const logout = createAsyncThunk('auth/logout', async () => {
    await axios.post('/mockApi/users/logout', null, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    });
});

const authUserSlice = createSlice({
    name: 'authUser',
    initialState,
    reducers: {},
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            console.log("fulfilled", action.payload);
            state.isAuthenticated = true;
            state.user = action.payload.user;
            localStorage.setItem('token', action.payload.user.token);
        },
        [logout.fulfilled]: (state, action) => {
            state.isAuthenticated = false;
            state.user = {};
            localStorage.removeItem('token');
        }
    }
});

export default authUserSlice.reducer