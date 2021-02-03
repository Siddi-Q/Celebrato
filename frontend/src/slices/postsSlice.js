import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addNewPostService, deletePostService, fetchPostsService, updatePostService } from '../services/postsService';

const initialState = {
    posts: [],
    status: 'idle',
    error: null
};

export const addNewPost = createAsyncThunk('posts/addNewPost', async newPost => {
    const response = await addNewPostService(newPost);
    const data = response.data;
    return data.post;
});

export const deletePost = createAsyncThunk('posts/deletePost', async postId => {
    const response = await deletePostService(postId);
    const data = response.data;
    return data;
});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await fetchPostsService();
    const data = response.data;
    return data.posts;
});

export const updatePost = createAsyncThunk('posts/updatePost', async post => {
    const response = await updatePostService(post);
    const data = response.data;
    return data.post;
});

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {
        [addNewPost.fulfilled]: (state, action) => {
            state.posts.push(action.payload);
        },
        [deletePost.fulfilled]: (state, action) => {
            state.posts = state.posts.filter(post => post.post_id !== action.payload.id);
        },
        [fetchPosts.pending]: (state, action) => {
            state.status = 'loading';
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.posts = state.posts.concat(action.payload);
        },
        [fetchPosts.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        },
        [updatePost.fulfilled]: (state, action) => {
            const { post_id, content } = action.payload;
            const existingPost = state.posts.find(post => post.post_id === post_id);
            if(existingPost) {
                existingPost.content = content;
            }
        } 
    }
})

export default postsSlice.reducer;

export const selectAllPosts = state => state.posts.posts;