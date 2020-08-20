import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                IT Cost Efficiency
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    formInput: {
        marginBottom: '10px'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {
    const classes = useStyles();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const handleInputEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handleInputPassowrdChange = (e) => {
        setPassword(e.target.value)
    }
    const handleSignIn = (e) => {
        axios
            .post("http://localhost:4000/api/users/login", { "email": email, "password": password }, {
            })
            .then((response) => {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('id', response.data.id)
                localStorage.setItem('customerId', response.data.customerId)
                localStorage.setItem('isActive', response.data.isActive)
                localStorage.setItem('isAdmin', response.data.isAdmin)
                if (response.data.email) {
                    localStorage.setItem('emailId', response.data.email)
                }
                if (response.data.isAdmin == true)
                    window.location.href = "/admin"
                else
                    window.location.href = '/landing';
            })
            .catch(function (e) {
                setOpen(true)
                // console.log(e);
            }, 600);
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Invalid email or password. Please check the credentials
        </Alert>
            </Snackbar>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
        </Typography>
                <form className={classes.form} noValidate>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            className={classes.formInput}
                            required
                            fullWidth
                            id="email"
                            onChange={handleInputEmailChange}
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            onChange={handleInputPassowrdChange}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                    </Grid>
                    {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    /> */}
                    <Button
                        onClick={handleSignIn}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
          </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}