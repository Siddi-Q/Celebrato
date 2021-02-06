import React from 'react';

import Grid from '@material-ui/core/Grid';

import CreatePostForm from './createPostForm.component';
import Feed from './feed.component';
import Navbar from './navbar.component';

export default function Home() {
    return (
        <>
            <Navbar />
            <Grid container justify="center" style={{marginTop: 16}}>
                <Grid item xs={11} sm={10} md={7} style={{marginBottom: 16}}>
                    <CreatePostForm />
                </Grid>
                <Feed />
            </Grid>
        </>
    );
};