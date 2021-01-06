import { configureStore } from '@reduxjs/toolkit';

import postsReducer from '../slices/postsSlice';
import usersReducer from '../slices/usersSlice';

export default configureStore({
    reducer: {
        posts: postsReducer,
        users: usersReducer
    }
})