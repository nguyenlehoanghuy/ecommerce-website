import { Box, Typography } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

function ProductFeatures(props) {
    return (
        <Box pt={4}>
            {/* <Typography sx={{ ml: 30 }} color="primary" fontSize="30px" fontWeight="bold">
                Thành phần chung giữa /product vs product/id (sẽ đặt ở đây trong tương lai)
            </Typography> */}
            <Outlet />
        </Box>
    );
}

export default ProductFeatures;
