import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {
    Link,
} from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    link: {
        textDecoration: "none",
        marginLeft: '20px',
        color: "white",
        '&:hover': {
            color: 'grey',
        }
    }
}))

export const Header = () => {
    const classes = useStyles();


  const logOut = () => {
    localStorage.clear()
  }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Mortgage Calculator
          </Typography>
                    <Link className={classes.link} to='banks'>Banks</Link>
                    <Link className={classes.link} to='calc'>Mortgage Calculator</Link>
                    <Link className={classes.link} to='signin'>Login</Link>
                    <Link className={classes.link} to='' onClick={() => logOut()}>Log Out</Link>
                </Toolbar>
            </AppBar>
        </div>
    );
}