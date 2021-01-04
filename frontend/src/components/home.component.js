import React from 'react';

import Grid from '@material-ui/core/Grid';

import CreatePostForm from './createPostForm.component';
import Feed from './feed.component';
import Navbar from './navbar.component';

export default function Home() {
    return (
        <>
            <Navbar />
            <Grid container justify="center" spacing={2} style={{marginTop: 16}}>
                <Grid item xs={12} sm={10} md={7}>
                    <CreatePostForm />
                </Grid>
                <Grid item xs={12} sm={10} md={7}>
                    <Feed />
                </Grid>
            </Grid>
        </>
    );
}