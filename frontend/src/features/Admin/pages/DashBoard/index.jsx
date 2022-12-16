import { Box } from '@mui/material';
import * as React from 'react';
import { makeStyles } from '@mui/styles';
import AdminInvoice from 'features/Admin/Components/AdminInvoice';

const useStyles = makeStyles({
    root: {
        backgroundColor: '#F1F7FC',
    },
});

function DashBoard(props) {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <AdminInvoice />
        </Box>
    );
}

export default DashBoard;
