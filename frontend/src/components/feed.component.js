import React from 'react';
import { useSelector } from 'react-redux';

import { selectAllPosts } from '../slices/postsSlice';

import Post from './post.component';

export default function Feed() {
    const posts = useSelector(selectAllPosts);

    const renderedPosts = posts.map(post => (
        <Post key={post.id} id={post.id} content={post.content} userId={post.user} date={post.date}/>
    ));

    return (
        <>
            {renderedPosts}
        </>
    );
}