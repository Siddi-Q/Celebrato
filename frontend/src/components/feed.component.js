import React from 'react';
import { useSelector } from 'react-redux';

import Post from './post.component';

export default function Feed() {
    const posts = useSelector(state => state.posts);

    const renderedPosts = posts.map((post, index) => (
        <Post key={index} content={post.content} />
    ));

    return (
        <>
            {renderedPosts}
        </>
    );
}