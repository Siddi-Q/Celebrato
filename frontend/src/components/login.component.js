import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { login } from '../slices/authUserSlice';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Celebrato ©"} {new Date().getFullYear()}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const classes = useStyles();

    const handleEmailChange = event => setEmail(event.target.value);
    const handlePasswordChange = event => setPassword(event.target.value);

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(login({email, password}));
        setEmail('');
        setPassword('');
    }

    return (
        <Grid container component="div" className={classes.root}>
            <CssBaseline />
            <Grid item xs={12} sm={6} md={7}>
                <Typography>Celebrato</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Typography component="h2" variant="h5">Log in</Typography>
                    <form className={classes.form} onSubmit={onSubmit}>
                        <TextField
                            autoFocus autoComplete="email"
                            fullWidth margin="normal" variant="outlined"
                            label="Email" type="email" required
                            onChange={handleEmailChange} value={email}/>
                        <TextField
                            autoComplete="current-password"
                            fullWidth margin="normal" variant="outlined"
                            label="Password" type="password" required
                            onChange={handlePasswordChange} value={password}/>
                        <Button
                            className={classes.submit} color="primary" fullWidth variant="contained"
                            type="submit">
                            Log in
                        </Button>

                        <Grid container>
                            <Grid item>
                                <Link variant="body2" component={RouterLink} to="/signup">Don't have an account? Sign Up</Link>
                            </Grid>
                        </Grid>

                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
};