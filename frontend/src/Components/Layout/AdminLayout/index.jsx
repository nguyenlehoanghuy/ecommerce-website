import React from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import StorageKeys from 'constants/storage-key';
import NotFound from 'Components/NotFound';
import AdminPageHeader from 'features/Admin/Components/AdminPageHeader';
import Grid from '@mui/material/Unstable_Grid2';
import AdminNav from 'features/Admin/Components/AdminNav';

function AdminLayout() {
    // Check account is login
    const loggedInUser = JSON.parse(localStorage.getItem(StorageKeys.USER));
    const isLoggedIn = !!loggedInUser?.customer_id;
    // Check acount is admin
    const isAdmin = true;
    return isLoggedIn && isAdmin ? (
        <Box>
            <Grid container>
                <Grid xs={12} sm={3} md={2} lg={2}>
                    <AdminNav />
                </Grid>
                <Grid xs={12} sm={9} md={10} lg={10}>
                    <AdminPageHeader />
                    <Outlet />
                </Grid>
            </Grid>
        </Box>
    ) : (
        <NotFound />
    );
}
export default AdminLayout;
