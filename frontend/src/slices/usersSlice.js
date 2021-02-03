import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addNewUserService, fetchUsersService } from '../services/usersService';

const initialState = [];

export const addNewUser = createAsyncThunk('users/addNewUser', async newUser => {
    const response = await addNewUserService(newUser);
    const data = response.data;
    return data.user;
});

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await fetchUsersService();
    const data = response.data;
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
            return action.payload;
        }
    }
});

export default usersSlice.reducer;

export const selectAllUsers = state => state.users;