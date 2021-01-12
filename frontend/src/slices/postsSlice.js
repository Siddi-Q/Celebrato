import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    posts: [],
    status: 'idle',
    error: null
}

export const addNewPost = createAsyncThunk('posts/addNewPost', async newPost => {
    const response = await fetch('/mockApi/posts', {
        method: 'POST',
        body: JSON.stringify(newPost)
    });
    const data = await response.json();
    return data.post;
});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await fetch('/mockApi/posts');
    const data = await response.json();
    return data.posts;
});

export const updatePost = createAsyncThunk('posts/updatePost', async post => {
    const id = post.id;
    delete post.id;
    const response = await fetch(`/mockApi/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(post)
    });
    const data = await response.json();
    return data.post;
});

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {
        [addNewPost.fulfilled]: (state, action) => {
            state.posts.push(action.payload)
        },
        [fetchPosts.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.posts = state.posts.concat(action.payload)
        },
        [fetchPosts.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        [updatePost.fulfilled]: (state, action) => {
            const { id, content } = action.payload;
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
