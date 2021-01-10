import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import EditPostForm from './editPostForm.component';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

export default function Post(props) {
    const [open, setOpen] = useState(false);

    const handleClick = () => setOpen(true);
    const author = useSelector(state => state.users.find(user => user.id === props.userId));

    return (
        <>
            <Grid item xs={12} sm={10} md={7}>
                <Card>
                    <CardHeader
                        avatar={<Avatar>A</Avatar>}
                        action={<IconButton><MoreHorizIcon /></IconButton>}
                        title={author ? author.name : "Unknown Author"}
                        subheader={props.date}
                    />
                    <CardContent>
                        <Typography>{props.content}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={handleClick}>Edit Post</Button>
                    </CardActions>
                </Card>
            </Grid>

            <EditPostForm isOpen={open} setOpen={setOpen} id={props.id} content={props.content} />
        </>
    );
}