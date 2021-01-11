import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addNewPost } from '../slices/postsSlice';
import { selectAllUsers } from '../slices/usersSlice';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';

export default function CreatePostForm() {
    const [post, setPost] = useState('');
    const [userId, setUserId] = useState('1');

    const dispatch = useDispatch();
    const users = useSelector(selectAllUsers);

    const handlePostChange = (event) => {
        setPost(event.target.value);
    }

    const handleUserIdChange = (event) => {
        setUserId(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(addNewPost({content: post, userId}));
        setPost('');
    }

    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>{user.firstName + ' ' + user.lastName}</option>
    ));

    return (
        <Card>
            <CardHeader title="Create Post"/>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <TextField 
                        fullWidth margin="normal" variant="outlined"
                        placeholder="What are you celebrating?"
                        multiline required type="text"
                        onChange={handlePostChange} value={post}/>
                    
                    <select value={userId} onChange={handleUserIdChange}>
                        {usersOptions}
                    </select>

                    <Button
                        color="primary" fullWidth variant="contained"
                        type="submit">
                        Post
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
