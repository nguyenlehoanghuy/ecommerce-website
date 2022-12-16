import React from 'react';
import { Box, Container, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { makeStyles } from '@mui/styles';
import UpdateInfo from 'features/Account/Components/UpdateInfo';
import { useSelector } from 'react-redux';
import moment from 'moment';

const useStyles = makeStyles({
    root: {},
    listElement: { display: 'flex' },
    title: { display: 'flex', margin: '20px 10px' },
    submit: {},
});

function AccountPage(props) {
    const classes = useStyles();
    const user = useSelector((state) => state.user.current);
    return (
        <Box sx={{ marginTop: '20px' }}>
            <Container sx={{ maxWidth: '1250px' }} maxWidth={false}>
                <Grid container>
                    <Grid className={classes.left} xs={12} sm={3} md={3} lg={3}>
                        <Paper elevation={0} sx={{ padding: '10px' }}>
                            <Box sx={{ height: '100%' }}>
                                <Box className={classes.listElement} sx={{ marginTop: '8px' }}>
                                    <Typography variant="h6">Thông tin tài khoản</Typography>
                                </Box>
                                <Box className={classes.title}>
                                    <Typography>Tài khoản:</Typography>
                                    <Typography sx={{ marginLeft: '4px' }}>
                                        {user?.customer_name}
                                    </Typography>
                                </Box>
                                <Box className={classes.title}>
                                    <Typography>SDT:</Typography>
                                    <Typography sx={{ marginLeft: '4px' }}>
                                        {user?.customer_phone}
                                    </Typography>
                                </Box>
                                <Box className={classes.title}>
                                    <Typography>Địa chỉ:</Typography>
                                    <Typography sx={{ marginLeft: '4px' }}>
                                        {user?.customer_address}
                                    </Typography>
                                </Box>
                                <Box className={classes.title}>
                                    <Typography>Ngày sinh:</Typography>
                                    <Typography sx={{ marginLeft: '4px' }}>
                                        {moment(user?.customer_datebirth).format('DD-MM-YYYY')}
                                    </Typography>
                                </Box>
                                <Box className={classes.title}>
                                    <Typography>Giới tính:</Typography>
                                    <Typography sx={{ marginLeft: '4px' }}>
                                        {user?.customer_gender}
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid className={classes.right} xs={12} sm={9} md={9} lg={9}>
                        <Paper elevation={0}>
                            <UpdateInfo />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default AccountPage;
