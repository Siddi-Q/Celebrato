import React from 'react';

import Feed from './feed.component';
import CreatePostForm from './createPostForm.component';

export default function Home() {
    return (
        <>
            <h1>Home!</h1>
            <CreatePostForm />
            <Feed />
        </>
    );
}