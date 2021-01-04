import React from 'react';

import Feed from './feed.component';
import CreatePostForm from './createPostForm.component';
import Navbar from './navbar.component';

export default function Home() {
    return (
        <>
            <Navbar />
            <h1>Home!</h1>
            <CreatePostForm />
            <Feed />
        </>
    );
}