import { configureStore } from '@reduxjs/toolkit';

import postsReducer from '../slices/postsSlice';
import usersReducer from '../slices/usersSlice';
import authUserReducer from '../slices/authUserSlice';

export default configureStore({
    reducer: {
        posts: postsReducer,
        users: usersReducer,
        authUser: authUserReducer
    }
})