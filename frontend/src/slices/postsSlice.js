import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = [
    {id: '1', content:"My first post!"},
    {id: '2', content:"Hello world!"},
    {id: '3', content:"Bye!"}
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
                        id: nanoid(),
                        content
                    }
                }
            }
        },
    }
})

export const { postAdded } = postsSlice.actions

export default postsSlice.reducer