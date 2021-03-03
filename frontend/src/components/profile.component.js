import React, { useEffect } from "react";

import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../slices/authUserSlice';
import { fetchPosts, selectAllPosts, selectPostStatus } from '../slices/postsSlice';

import Grid from '@material-ui/core/Grid';

import Navbar from './navbar.component';
import Post from './post.component';

export default function Profile() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const posts = useSelector(selectAllPosts).filter(post => post.user_id === user.user_id);
    const postStatus = useSelector(selectPostStatus);

    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));

    useEffect(() => {
        if(postStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [dispatch, postStatus]);

    return (
        <>
            <Navbar />
            <Grid container justify="center" style={{marginTop: 16}}>
                <Grid item xs={11} sm={10} md={7}>
                    <h2 style={{textAlign: "center"}}>{user.firstname + " " + user.lastname} </h2>
                </Grid>
                
                {orderedPosts.map(post => (
                        <Grid key={post.post_id} item xs={11} sm={10} md={7} style={{marginBottom: 16}}>
                            <Post post={post}/>
                        </Grid>
                    )
                )}
            </Grid>
        </>
    );
}