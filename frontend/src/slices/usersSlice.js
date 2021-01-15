import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = []

export const addNewUser = createAsyncThunk('users/addNewUser', async newUser => {
    const response = await fetch('/mockApi/users/register',  {
        method: 'POST',
        body: JSON.stringify(newUser),
        'Content-Type': 'application/json'
    });
    const data = await response.json();
    return data.user;
});

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
        [addNewUser.fulfilled]: (state, action) => {
            state.push(action.payload);
        },
        [fetchUsers.fulfilled]: (state, action) => {
            return action.payload
        }
    }
});

export default usersSlice.reducer

export const selectAllUsers = state => state.users