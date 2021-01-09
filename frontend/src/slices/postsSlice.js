import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    posts: [],
    status: 'idle',
    error: null
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload);
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
            const existingPost = state.posts.find(post => post.id === id);
            if(existingPost) {
                existingPost.content = content;
            }
        }
    }
})

export const { postAdded, postUpdated } = postsSlice.actions

export default postsSlice.reducer

export const selectAllPosts = state => state.posts.posts
