import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {id: '0', name: 'John Doe'},
    {id: '1', name: 'Isaac Newton'},
    {id: '2', name: 'Alan Turing'},
]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
});

export default usersSlice.reducer