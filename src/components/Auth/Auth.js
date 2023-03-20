import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from '@react-oauth/google';
import { useHistory } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useDispatch } from 'react-redux';
import jwt_decode from "jwt-decode";
import Input from './Input';
import useStyles from './styles';
import Icon from './icon';

function Auth() {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSigup] = useState(false);
    const dispatch = useDispatch();
    const history=useHistory();
    
    const handleShowPassword = () => { setShowPassword((prevShowPassword) => !prevShowPassword); }

    const handleSubmit = () => {

    };

    const handleChange = () => {

    };

    const switchMode = () => {
        setIsSigup((prevIsSignup) => !prevIsSignup);
        handleShowPassword(false);
    };

    const googleSuccess = async (res) => {
        const result = res?.credential;
        var decoded = jwt_decode(result);
        console.log(decoded);
        try {
            dispatch({ type: 'AUTH', data: { decoded } }  );
            history.push('/');
        }
        catch (error) {
            console.log(error);
        }
    };

    const googleFailure = (error) => {
        console.log(error);
        console.log('Google Sign In was unsuccessful . Try Again Later');
    }

    return (
            <Container component="main" maxWidth="xs">
                <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant="h5">{isSignUp ? 'SignUp' : 'SignIn'}</Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {
                                isSignUp && (
                                    <>
                                        <Input name="firstName" label="First Name" handleChange={handleChange} autofocus half />
                                        <Input name="firstName" label="First Name" handleChange={handleChange} half />
                                    </>
                                )
                            }
                            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                            {isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} />}
                        </Grid>


                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            {isSignUp ? 'SignUp' : 'SignIn'}
                        </Button>
                        <GoogleLogin
                            render={(renderProps) => (
                                <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained"> Google Sign In </Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                        />
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Button onClick={switchMode}>
                                    {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>

    )
}

export default Auth