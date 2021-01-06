import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = [
    {id: '1', content:"My first post!", user: '0'},
    {id: '2', content:"Hello world!", user: '2'},
    {id: '3', content:"Bye!", user: '1'}
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        content,
                        user: userId
                    }
                }
            }
        },
        postUpdated(state, action) {
            const {id, content} = action.payload;
            const existingPost = state.find(post => post.id === id);
            if(existingPost) {
                existingPost.content = content;
            }
        }
    }
})

export const { postAdded, postUpdated } = postsSlice.actions

export default postsSlice.reducer