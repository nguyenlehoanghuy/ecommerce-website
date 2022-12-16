import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import productAPI from 'api/productAPI';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import ProductSkeletonList from '../Skeleton/ProductSkeletonList';
import 'react-slideshow-image/dist/styles.css';
import ProductListPromotion from '../ProductListPromotion';
const useStyles = makeStyles({
    root: {},
    product: {
        backgroundColor: 'white',
        width: '100%',
        fontSize: '40px',
        color: '#db1d24',
        border: '5px solid #db1d24',
        textAlign: 'center',
        fontFamily: 'Sans-serif,SanFranciscoDisplay-bold',
        padding: 5,
    },
    img: {
        width: '100%',
    },
    title: {
        fontSize: '24px',
        color: 'white',
        border: '5px solid #db1d24',
        backgroundColor: '#db1d24',
        textAlign: 'center',
        fontFamily: 'helvetica',
        padding: 5,
    },
});

function ProductPromotion(props) {
    const classes = useStyles();
    // Call API when queryParams change
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fectProduct = async () => {
            try {
                const { data } = await productAPI.getAll({ isPromotion: true });
                setProductList(data);
            } catch (error) {
                console.log('Failed to fetch product list: ', error);
            }
            setLoading(false);
        };
        fectProduct();
    }, []);

    return (
        <Box className={classes.root}>
            <Box className={classes.title}>DANH SÁCH GIẢM GIÁ ĐÁNG MUA </Box>
            <Box className={classes.product}>
                {loading ? (
                    <ProductSkeletonList length={4} />
                ) : (
                    <ProductListPromotion data={productList} />
                )}
            </Box>
        </Box>
    );
}

export default ProductPromotion;
