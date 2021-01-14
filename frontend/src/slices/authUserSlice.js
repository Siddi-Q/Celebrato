import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {},
    isAuthenticated: false
}

export const login = createAsyncThunk('auth/login', async loginCred => {
    const response = await fetch('/mockApi/login', {
        method: 'POST',
        body: JSON.stringify(loginCred),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
});

export const logout = createAsyncThunk('auth/logout', async () => {
    await fetch('/mockApi/logout', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
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
        }
    }
});

export default authUserSlice.reducer