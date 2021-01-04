import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

export default function Post() {
    return (
        <Card>
            <CardHeader
                avatar={<Avatar>A</Avatar>}
                action={<IconButton><MoreHorizIcon /></IconButton>}
                title="FirstName LastName"
                subheader="Date"
            />
            <CardContent>
                <Typography>Some text</Typography>
            </CardContent>
        </Card>
    );
}