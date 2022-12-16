import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from 'Components/Footer';
import Header from 'Components/Header';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    badge: {
        backgroundColor: '#db1d24',
        fontSize: '12px',
        color: 'white',
        textAlign: 'center',
        padding: '5px 0',
    },
});

function DefaultLayout(props) {
    const classes = useStyles();
    return (
        <Box>
            <Box className={classes.badge}>
                <p>Miễn phí vận chuyển với đơn hàng từ 799k</p>
            </Box>
            <Header />
            <Outlet />
            <Footer />
        </Box>
    );
}

export default DefaultLayout;
