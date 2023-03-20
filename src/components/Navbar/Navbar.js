import React, { useEffect, useState } from 'react'
import { Link, useHistory , useLocation } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'

import useStyles from './styles.js'
import memories from '../../images/memories.png';
import { useDispatch } from 'react-redux';

function Navbar() {
    const classes = useStyles();
    const history = useHistory();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const location=useLocation();
    const dispatch = useDispatch();
    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        history.push('/');
        setUser(null);
    }

    useEffect(() => {
        const token = user?.decoded.jti;

        //JWT
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);


    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to='/' className={classes.heading} variant="h2" align="center">Memories </Typography>
                <img className={classes.image} src={memories} alt="memories" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.decoded.name} src={user.decoded.picture} referrerPolicy="no-referrer" >{user.decoded.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.decoded.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to='/auth' variant="contained" color="primary">SignIn</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar