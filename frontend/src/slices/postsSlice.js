import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    posts: [],
    status: 'idle',
    error: null
}

export const addNewPost = createAsyncThunk('posts/addNewPost', async newPost => {
    const response = await axios.post('/mockApi/posts', newPost);
    const data = response.data;
    return data.post;
});

export const deletePost = createAsyncThunk('posts/deletePost', async postId => {
    const response = await axios.delete(`/mockApi/posts/${postId}`);
    const data = response.data;
    return data;
});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get('/mockApi/posts');
    const data = response.data;
    return data.posts;
});

export const updatePost = createAsyncThunk('posts/updatePost', async post => {
    const id = post.id;
    delete post.id;

    const response = await axios.put(`/mockApi/posts/${id}`, post);
    const data = response.data;
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
        [deletePost.fulfilled]: (state, action) => {
            state.posts = state.posts.filter(post => post.id !== action.payload.id)
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
