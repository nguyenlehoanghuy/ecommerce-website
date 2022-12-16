import { Box } from '@mui/material';
import * as React from 'react';
import { makeStyles } from '@mui/styles';
import ProductTable from 'features/Admin/Components/ProductTable';

const useStyles = makeStyles({
    root: {
        backgroundColor: '#F1F7FC',
    },
});

function ProductManager(props) {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            Trang Product
            <ProductTable />
        </Box>
    );
}

export default ProductManager;
