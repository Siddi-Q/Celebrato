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
        postAdded: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(content) {
                return {
                    payload: {
                        content
                    }
                }
            }
        },
    }
})

export const { postAdded } = postsSlice.actions

export default postsSlice.reducer