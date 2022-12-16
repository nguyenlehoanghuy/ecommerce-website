import React, { useEffect, useMemo, useState } from 'react';
import { Box, Container } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2';
import { Breadcrumbs, Pagination, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import productAPI from 'api/productAPI';
import ProductSkeletonList from 'features/Product/Components/Skeleton/ProductSkeletonList';
import ProductList from 'features/Product/Components/ProductList';
import ProductSort from 'features/Product/Components/ProductSort';
import ProductFilter from 'features/Product/Components/ProductFilter';
import FiltersView from 'features/Product/Components/FiltersView';
import { NavLink, useSearchParams } from 'react-router-dom';
import FilterBySpecification from 'features/Product/Components/Filter/FilterBySpecification';
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

// Not use queryString.parse() - Custom urlParams
const QueryStringParse = (array) => {
    const query = [...array].reduce((previous, current) => {
        // check urlParams wrong - if wrong set default
        const objKey = current[0];
        if (
            objKey !== 'category_id' &&
            objKey !== 'isPromotion' &&
            objKey !== 'salePrice_gte' &&
            objKey !== 'salePrice_lte' &&
            objKey !== '_page' &&
            objKey !== '_limit' &&
            objKey !== 'name' &&
            objKey !== '_sort'
        )
            return {
                _page: 1,
                _sort: 'salePrice:ASC',
            };
        // urlParams true convert to Object
        else {
            let objValue;
            if (current[1] === 'true') objValue = true;
            else if (current[1] === 'false') objValue = false;
            else if (isNaN(parseInt(current[1]))) objValue = current[1];
            else objValue = parseInt(current[1]);
            return { ...previous, [objKey]: objValue };
        }
    }, {});
    return query;
};

function ProductListPage(props) {
    const classes = useStyles();
    const [categoryName, setCategoryName] = useState('');
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);

    const [pagination, setPagination] = useState({
        page: 1,
        total: 20,
        limit: 20,
    });
    const [filters] = useState({
        _sort: 'salePrice:ASC',
        _limit: 10,
    });

    const [searchParams, setSearchParams] = useSearchParams(filters);
    // when searchParams change - get queryParams
    const queryParams = useMemo(() => QueryStringParse([...searchParams]), [searchParams]);

    const [categoryList, setCategoryList] = useState([]);
    useEffect(() => {
        try {
            const fetchCategory = async () => {
                const list = await categoryAPI.getAll();
                setCategoryList(list.data);
            };
            fetchCategory();
        } catch (error) {
            console.log('Failed to fetch Category: ', error);
        }
    }, []);

    // Call API when queryParams change
    useEffect(() => {
        const fectProduct = async () => {
            try {
                const { data, pagination } = await productAPI.getAll(queryParams);
                if (Object.keys(queryParams).includes('category_id')) {
                    const category = categoryList.find(
                        (x) => x.category_id === queryParams.category_id
                    );
                    setCategoryName(category?.category_name);
                }
                setProductList(data);
                setPagination(pagination);
            } catch (error) {
                console.log('Failed to fetch product list: ', error);
            }
            setLoading(false);
        };
        fectProduct();
    }, [queryParams, categoryList]);

    const handlePaginationChange = (e, page) => {
        const filters = {
            ...queryParams,
            _page: page,
        };
        setSearchParams(filters);
    };

    const handleSortChange = (newValue) => {
        const filters = {
            ...queryParams,
            _sort: newValue,
        };
        setSearchParams(filters);
    };

    const handleFiltersChange = (newFilters) => {
        setSearchParams(newFilters);
    };
    return (
        <Box padding={1}>
            <Container>
                <Grid container spacing={2}>
                    <Grid xs={12} sm={12} md={12} lg={12}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <NavLink to="/">Trang chủ </NavLink>
                            <Typography color="text.primary">{categoryName}</Typography>
                        </Breadcrumbs>
                    </Grid>
                    <Grid className={classes.left} xs={12} sm={2} md={2} lg={2}>
                        <Paper elevation={0}>
                            <ProductFilter filters={queryParams} onChange={handleFiltersChange} />
                        </Paper>
                    </Grid>
                    <Grid className={classes.right} xs={12} sm={10} md={10} lg={10}>
                        <Paper elevation={0}>{/* <FilterBySpecification /> */}</Paper>

                        <Paper elevation={0}>
                            <ProductSort
                                onChange={handleSortChange}
                                currentSort={queryParams._sort}
                            />

                            <FiltersView filters={queryParams} onChange={handleFiltersChange} />

                            {loading ? (
                                <ProductSkeletonList length={20} />
                            ) : (
                                <ProductList data={productList} />
                            )}

                            <Box className={classes.pagination}>
                                <Pagination
                                    count={Math.ceil(pagination.total / pagination.limit)}
                                    page={pagination.page}
                                    color="primary"
                                    onChange={handlePaginationChange}
                                />
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ProductListPage;
