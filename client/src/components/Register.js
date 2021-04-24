import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios'
import { useHistory } from 'react-router';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Register(props) {
    const classes = useStyles();
    const history = useHistory();
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',

    })
    const [errEmail, setErrEmail] = useState('');
    const onChangeInput = e => {
        // console.log(e);
        const { name, value } = e.target;
        // console.log(name, value);
        setUser({ ...user, [name]: value })
        setErrEmail('');
    }
    const registerSubmit = async e => {
        e.preventDefault();
        try {
            // userSchema.validate({
            //     username: user.name,
            //     email: user.email,
            //     password: user.password,

            // }).catch(err => {
            //     console.log(err);

            // })
            await axios.post('/users/register', {
                username: user.name,
                email: user.email,
                password: user.password,

            })
            setUser({ name: '', email: '', password: '', })
            setErrEmail('');
            history.push('/');


        }
        catch (err) {
            err.response.data.msg && setErrEmail(err.response.data.msg)

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
                    Register
            </Typography>
                <form className={classes.form} noValidate onSubmit={registerSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required value={user.name}
                        fullWidth
                        id="register-name"
                        label="Name"
                        name="name"
                        autoFocus
                        type="text"
                        onChange={onChangeInput}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required value={user.email}
                        fullWidth
                        id="register-email"
                        label="Email"
                        name="email"
                        autoComplete="email"
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
                        id="register-password"
                        autoComplete="current-password"
                        onChange={onChangeInput}

                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Register
          </Button>

                </form>
            </div>
        </Container>
    );
}

export default Register;