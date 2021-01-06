import React, { useState } from 'react';

import EditPostForm from './editPostForm.component';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

export default function Post(props) {
    const [open, setOpen] = useState(false);

    const handleClick = () => setOpen(true);

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
            <EditPostForm isOpen={open} setOpen={setOpen} id={props.id} content={props.content} />
        </>
    );
}