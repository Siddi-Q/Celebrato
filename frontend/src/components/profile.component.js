import React, { useEffect, useState } from "react";

import { useSelector } from 'react-redux';
import { selectUser } from '../slices/authUserSlice';
import { fetchAUsersPosts } from '../services/usersService'; 

import Navbar from './navbar.component';

export default function Profile() {
    const [posts, setPosts] = useState([]);
    const user = useSelector(selectUser);

    useEffect(() => {
        fetchAUsersPosts(user.user_id)
        .then(res => {
            setPosts(res.data.posts);
        })
        .catch(error => {
            console.log("error:", error);
        })
    }, []);

    return (
        <>
            <Navbar />
            <h1>Profile</h1>
            {posts.map(post => <p>{post.date} - {post.content}</p>)}
        </>
    );
}