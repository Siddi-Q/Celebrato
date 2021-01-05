import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { postUpdated } from '../slices/postsSlice';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

export default function Post(props) {
    const [post, setPost] = useState(props.content);
    const [open, setOpen] = useState(false);
    
    const dispatch = useDispatch();

    const handlePostChange = (event) => {
        setPost(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitted Post!", props, post);
        dispatch(postUpdated({id: props.id, content: post}));
        handleClose();
    }

    const handleClick = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
        <Card>
            <CardHeader
                avatar={<Avatar>A</Avatar>}
                action={<IconButton><MoreHorizIcon /></IconButton>}
                title="FirstName LastName"
                subheader="Date"
            />
            <CardContent>
                <Typography>{props.content}</Typography>
            </CardContent>
            <CardActions>
                <Button onClick={handleClick}>Edit Post</Button>
            </CardActions>
        </Card>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Post</DialogTitle>
            <DialogContent>
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
        </>
    );
}