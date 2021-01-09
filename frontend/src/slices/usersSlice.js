import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = []

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await fetch('/mockApi/users');
    const data = await response.json();
    return data.users;
});

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchUsers.fulfilled]: (state, action) => {
            return action.payload
        }
    }
});

export default usersSlice.reducer

export const selectAllUsers = state => state.users