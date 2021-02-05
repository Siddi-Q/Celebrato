import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../slices/postsSlice';

import { formatDistanceToNow, parseISO } from 'date-fns'

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import EditPostForm from './editPostForm.component';

export default function Post(props) {
    const { post } = props;

    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const dispatch = useDispatch();
    const user = useSelector(state => state.authUser.user);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDeletePostClick = () => {
        setAnchorEl(null);
        dispatch(deletePost(post.post_id));
    }

    const handleEditPostClick = () => {
        setAnchorEl(null);
        setOpen(true);
    }

    return (
        <>
            <Grid item xs={12} sm={10} md={7}>
                <Card>
                    <CardHeader
                        avatar={<Avatar>{post.firstname ? post.firstname.charAt(0) : "U"}</Avatar>}
                        action={user.user_id === post.user_id &&
                        <IconButton onClick={handleMenuClick}>
                            <MoreHorizIcon />
                        </IconButton>
                        }
                        title={post.firstname && post.lastname ? post.firstname + ' ' + post.lastname : "Unknown Author"}
                        subheader={formatDistanceToNow(parseISO(post.date))}
                    />
                    <Menu
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right"
                          }}
                        getContentAnchorEl={null}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleEditPostClick}>Edit Post</MenuItem>
                        <MenuItem onClick={handleDeletePostClick}>Delete Post</MenuItem>
                    </Menu>
                    <CardContent>
                        <Typography>{post.content}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            <EditPostForm isOpen={open} setOpen={setOpen} id={post.post_id} content={post.content} />
        </>
    );
};