import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, selectAllPosts, selectPostStatus } from '../slices/postsSlice';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

import Post from './post.component';

export default function Feed() {
    const dispatch = useDispatch();
    const posts = useSelector(selectAllPosts);
    const postStatus = useSelector(selectPostStatus);

    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));

    useEffect(() => {
        if(postStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [dispatch, postStatus]);

    const renderedPosts = orderedPosts.map(post => (
        <Post key={post.post_id} post={post}/>
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
        return <p>An error occurred!</p>;
    }
};