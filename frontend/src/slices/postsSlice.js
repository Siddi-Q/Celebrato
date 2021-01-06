import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = [
    {id: '1', content:"My first post!", user: '0', date: new Date(2021, 0).toDateString()},
    {id: '2', content:"Hello world!", user: '2', date: new Date(2020, 11, 20).toDateString()},
    {id: '3', content:"Bye!", user: '1', date: new Date(2021, 0, 6).toDateString()}
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
                        date: new Date().toDateString(),
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

export const selectAllPosts = state => state.posts