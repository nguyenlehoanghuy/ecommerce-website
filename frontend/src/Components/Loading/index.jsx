import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { YELLOW_COLOR } from 'constants/common';
import Timer3SelectIcon from '@mui/icons-material/Timer3Select';

const useStyles = makeStyles({
    wrapProgess: {
        position: 'fixed',
        top: '0px',
        left: '0px',
        bottom: '0px',
        right: '0px',
        backgroundColor: 'rgb(255 255 255 / 60%)',
        zIndex: '2',
    },
    wrapTime: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    time: {
        fontSize: '40px',
        color: YELLOW_COLOR,
    },
    progress: {
        position: 'absolute',
    },
});
function Loading(props) {
    const classes = useStyles();
    return (
        <Box className={classes.wrapProgess}>
            <Box className={classes.wrapTime}>
                <CircularProgress className={classes.progress} size={60} thickness={2} />
                <Timer3SelectIcon className={classes.time} />
            </Box>
        </Box>
    );
}

export default Loading;
