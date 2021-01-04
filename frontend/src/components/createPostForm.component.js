import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';

export default function CreatePostForm() {
    const [post, setPost] = useState('');

    const handlePostChange = (event) => {
        setPost(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitted Post!");
        setPost('');
    }

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
