import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPosts, selectAllPosts } from '../slices/postsSlice';

import Post from './post.component';

import CircularProgress from '@material-ui/core/CircularProgress';

export default function Feed() {
    const dispatch = useDispatch();
    const posts = useSelector(selectAllPosts);

    const postStatus = useSelector(state => state.posts.status);

    useEffect(() => {
        if(postStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [dispatch, postStatus])

    const renderedPosts = posts.map(post => (
        <Post key={post.id} id={post.id} content={post.content} userId={post.user} date={post.date}/>
    ));

    if(postStatus === 'loading') {
        return <CircularProgress />
    }
    else if(postStatus === 'succeeded') {
        return (
            <>
                {renderedPosts}
            </>
        );
    }
    else {
        return <p>An error occurred!</p>
    }
}