import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.success.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Login(props) {
    const classes = useStyles();
    const [user, setUser] = useState({
        email: '',
        password: '',

    })
    const [errEmail, setErrEmail] = useState('');
    const [errPassword, setErrPassword] = useState('');
    const onChangeInput = e => {
        // console.log(e);
        const { name, value } = e.target;
        // console.log(name, value);
        setUser({ ...user, [name]: value })
        setErrEmail('');
        setErrPassword('');
    }
    const loginSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/users/login', {
                email: user.email,
                password: user.password,
            })
            setUser({ email: '', password: '', })
            setErrEmail('');
            setErrPassword('')
            console.log(res);
            localStorage.setItem('tokenStore', res.data.token);
            props.setLogin(true);

        }
        catch (err) {
            err.response.data.msg && setErrEmail(err.response.data.msg);
            err.response.data.msg1 && setErrPassword(err.response.data.msg1);

        }

    }
    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
            </Typography>
                <form className={classes.form} noValidate onSubmit={loginSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required value={user.email}
                        fullWidth
                        id="login-email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        type="email"
                        {...errEmail && { error: true, helperText: errEmail }}
                        onChange={onChangeInput}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required value={user.password}
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="login-password"
                        autoComplete="current-password"
                        {...errPassword && { error: true, helperText: errPassword }}
                        onChange={onChangeInput}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="default"
                        className={classes.submit}
                    >
                        Sign In
          </Button>
                    <Grid container>
                        <Grid item>
                            <Link to="/register">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>

            </div>
        </Container>


    );
}

export default Login;