import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPosts, selectAllPosts } from '../slices/postsSlice';

import Post from './post.component';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

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
        <Post key={post.id} post={post}/>
    ));

    if(postStatus === 'loading') {
        return (
            <Grid item xs={12} sm={10} md={7} style={{textAlign: "center"}}>
                <CircularProgress />
            </Grid>
        );
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