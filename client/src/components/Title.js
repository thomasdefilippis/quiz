import React from 'react';
import { AppBar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      textAlign: 'center',
    },

    appBar: {
    backgroundColor: '#cccccc'
    },

    title: {
        fontSize: '80px',
        color: '#009ACD'
    },
}));

const Title = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Typography variant="h6" className={classes.title}>
                    Quiz
                </Typography>
            </AppBar>
        </div>
    )
}

export default Title;