import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, selectAllPosts, selectPostStatus } from '../slices/postsSlice';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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
        <Grid key={post.post_id} item xs={11} sm={10} md={7} style={{marginBottom: 16}}>
            <Post post={post}/>
        </Grid>
    ));

    if(postStatus === 'loading') {
        return (
            <Grid item xs={11} sm={10} md={7} style={{textAlign: "center"}}>
                <CircularProgress />
            </Grid>
        );
    }
    else if(postStatus === 'succeeded') {
        return (
            <>
                {renderedPosts.length ? renderedPosts : 
                <Grid item xs={11} sm={10} md={7} style={{textAlign: "center"}}>
                    <Typography variant="h5">There are no posts to show! Why don't you create the first?</Typography>
                </Grid>}
            </>
        );
    }
    else {
        return (
            <Grid item xs={11} sm={10} md={7} style={{textAlign: "center"}}>
                <p>Error - Could not load posts!</p>
            </Grid>
        );
    }
};