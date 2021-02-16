import React, { useEffect, useState } from "react";

import { useSelector } from 'react-redux';
import { selectUser } from '../slices/authUserSlice';
import { fetchAUsersPosts } from '../services/usersService'; 

import Grid from '@material-ui/core/Grid';

import Navbar from './navbar.component';
import Post from './post.component';

export default function Profile() {
    const [posts, setPosts] = useState([]);
    const user = useSelector(selectUser);

    useEffect(() => {
        fetchAUsersPosts(user.user_id)
        .then(res => {
            setPosts(res.data.posts.sort((a, b) => b.date.localeCompare(a.date)));
        })
        .catch(error => {
            console.log("error:", error);
        })
    }, [posts, user.user_id]);

    return (
        <>
            <Navbar />
            <Grid container justify="center" style={{marginTop: 16}}>
                <Grid item xs={11} sm={10} md={7}>
                    <h2>{user.firstname + " " + user.lastname} </h2>
                </Grid>
                
                {posts.map(post => (
                        <Grid key={post.post_id} item xs={11} sm={10} md={7} style={{marginBottom: 16}}>
                            <Post post={post}/>
                        </Grid>
                    )
                )}
            </Grid>
        </>
    );
}