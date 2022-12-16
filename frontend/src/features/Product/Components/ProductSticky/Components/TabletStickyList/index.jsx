import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { Pagination, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import productAPI from 'api/productAPI';
import ProductSkeletonList from 'features/Product/Components/Skeleton/ProductSkeletonList';
import ProductList from 'features/Product/Components/ProductList';
import categoryAPI from 'api/categoryAPI';

const useStyles = makeStyles({
    root: {},
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
        paddingBottom: '30px',
    },
});

function TabletStickyList(props) {
    const classes = useStyles();
    const [pagination, setPagination] = useState({
        page: 1,
        total: 20,
        limit: 20,
    });
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);

    const [filters, setFilters] = useState({
        _limit: 10,
    });
    // Call API when filters change
    useEffect(() => {
        const fectProduct = async () => {
            try {
                // fetch API
                const result = await categoryAPI.getAll({ category_name: 'Máy tính bảng' });
                const category_id = result.data[0].category_id;
                const newFilters = {
                    ...filters,
                    category_id,
                };
                const { data, pagination } = await productAPI.getAll(newFilters);
                setProductList(data);
                setPagination(pagination);
            } catch (error) {
                console.log('Failed to fetch product list: ', error);
            }
            setLoading(false);
        };
        fectProduct();
    }, [filters]);
    const handlePaginationChange = (e, page) => {
        const newFilters = {
            ...filters,
            _page: page,
        };
        setFilters(newFilters);
    };
    return (
        <Box sx={{ my: '5px', backgroundColor: 'white', padding: '15px' }}>
            <Paper elevation={0} sx={{ marginBottom: '20px' }}>
                <Typography variant="h6">Máy tính bảng</Typography>
            </Paper>
            <Paper elevation={0}>
                {loading ? <ProductSkeletonList length={8} /> : <ProductList data={productList} />}

                <Box className={classes.pagination}>
                    <Pagination
                        count={Math.ceil(pagination.total / pagination.limit)}
                        page={pagination.page}
                        color="primary"
                        onChange={handlePaginationChange}
                    />
                </Box>
            </Paper>
        </Box>
    );
}

export default TabletStickyList;
