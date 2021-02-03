import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { updatePost } from '../slices/postsSlice';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

export default function EditPostForm(props) {
    const [post, setPost] = useState(props.content);

    const dispatch = useDispatch();

    const handleClose = () => props.setOpen(false);

    const handlePostChange = event => setPost(event.target.value);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updatePost({id: props.id, content: post}));
        handleClose();
    }

    return (
        <Dialog open={props.isOpen} onClose={handleClose}>
            <DialogTitle align='center'>Edit Post</DialogTitle>
            <DialogContent dividers>
                <form onSubmit={handleSubmit}>
                    <TextField 
                        fullWidth margin="normal" variant="outlined"
                        placeholder="What are you celebrating?"
                        multiline required type="text"
                        onChange={handlePostChange} value={post}/>
                    <Button
                        color="primary" fullWidth variant="contained"
                        type="submit">
                        Save
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};