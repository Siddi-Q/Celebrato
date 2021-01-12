import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deletePost } from '../slices/postsSlice';

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
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const openMenu = Boolean(anchorEl);

    const dispatch = useDispatch();

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDeletePostClick = () => {
        setAnchorEl(null);
        dispatch(deletePost(props.id));
    }

    const handleEditPostClick = () => {
        setAnchorEl(null);
        setOpen(true);
    }
    const author = useSelector(state => state.users.find(user => user.id === props.userId));

    return (
        <>
            <Grid item xs={12} sm={10} md={7}>
                <Card>
                    <CardHeader
                        avatar={<Avatar>{author ? author.firstName.charAt(0) : "U"}</Avatar>}
                        action={
                        <IconButton onClick={handleMenuClick}>
                            <MoreHorizIcon />
                        </IconButton>
                        }
                        title={author ? author.firstName + ' ' + author.lastName : "Unknown Author"}
                        subheader={props.date}
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
                        open={openMenu}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleEditPostClick}>Edit Post</MenuItem>
                        <MenuItem onClick={handleDeletePostClick}>Delete Post</MenuItem>
                    </Menu>
                    <CardContent>
                        <Typography>{props.content}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            <EditPostForm isOpen={open} setOpen={setOpen} id={props.id} content={props.content} />
        </>
    );
}