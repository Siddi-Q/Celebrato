import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {content:"My first post!"},
    {content:"Hello world!"},
    {content:"Bye!"}
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded(state, action) {
            state.push(action.payload)
        }
    }  
})

export const { postAdded } = postsSlice.actions

export default postsSlice.reducer