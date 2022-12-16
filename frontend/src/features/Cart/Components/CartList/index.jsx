import React from 'react';

import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Box, Paper, Typography } from '@mui/material';
import ProductThumbnail from 'features/Product/Components/ProductThumbnail';
import CartQuantityForm from '../CartQuantityForm';
import CartItemPromotion from '../CartItemPromotion';
import { useNavigate } from 'react-router-dom';
import promotionAPI from 'api/promotionAPI';
import { useEffect } from 'react';
import { useState } from 'react';
import { numberToVND } from 'constants/common';

CartList.propTypes = {
    cartItems: PropTypes.array.isRequired,
};

const useStyles = makeStyles({
    paperTitle: {
        marginBottom: '2px',
    },
    root: {
        padding: '20px 16px 22px 47px',
    },
    cartBox: {
        display: 'flex',
    },
    itemImg: {
        width: '80px',
        height: '80px',
        padding: '10px',
        border: '1px solid #F3F3F7',
        cursor: 'pointer',
    },
    description: {
        display: 'flex',
        justifyContent: 'center',
    },
    name: {
        cursor: 'pointer',
    },
});
function CartList({ cartItems }) {
    const classes = useStyles();
    const navigate = useNavigate();

    const handleClickCartItem = (productId) => {
        navigate(`/product/${productId}`);
    };

    const [promotionList, setPromotionList] = useState();
    useEffect(() => {
        let isMounted = true;
        try {
            const fetchPromotion = async () => {
                const list = await promotionAPI.getAll();
                if (isMounted) {
                    setPromotionList(list.data);
                }
            };
            fetchPromotion();
        } catch (error) {
            console.log('Failed to fetch Promotion: ', error);
        }
        return () => (isMounted = false);
    }, []);

    const productPricePromotion = (Item) => {
        let promotionPrice = 0;
        if (Item.promotion_id !== null && promotionList) {
            const promotionOfProduct = promotionList?.find(
                (x) => x.promotion_id === Item.promotion_id
            );
            if (promotionOfProduct?.promotion_percent !== 0) {
                promotionPrice = (promotionOfProduct?.promotion_percent * Item.product_price) / 100;
            } else if (promotionOfProduct?.promotion_saleprice !== 0) {
                promotionPrice = promotionOfProduct?.promotion_saleprice;
            }
            return Item.product_price - promotionPrice;
        }
        return Item.product_price;
    };

    return (
        <>
            <Paper elevation={0} className={classes.paperTitle}>
                Công ty cổ phần thương mại điện tử
            </Paper>
            <Paper elevation={0}>
                {cartItems?.map((Item) => (
                    <Box key={Item.product_id} className={classes.root}>
                        <Box className={classes.cartBox}>
                            <Box
                                className={classes.itemImg}
                                onClick={() => handleClickCartItem(Item.product_id)}
                            >
                                <ProductThumbnail product={Item} />
                            </Box>
                            <Box className={classes.description}>
                                <Typography
                                    variant="button"
                                    className={classes.name}
                                    onClick={() => handleClickCartItem(Item.product_id)}
                                >
                                    {Item.product_name}
                                </Typography>
                                {Item.promotionId !== null && (
                                    <Typography
                                        variant="button"
                                        sx={{
                                            textDecoration: 'line-through',
                                            color: 'red',
                                        }}
                                    >
                                        {numberToVND(Item.product_price)}
                                    </Typography>
                                )}
                                <Typography variant="button">
                                    {numberToVND(productPricePromotion(Item))}
                                </Typography>
                                <CartQuantityForm productId={Item.product_id} />
                                <Typography variant="button">
                                    {numberToVND(productPricePromotion(Item) * Item.quantity)}
                                </Typography>
                            </Box>
                        </Box>
                        <CartItemPromotion promotionId={Item.promotion_id} />
                    </Box>
                ))}
            </Paper>
        </>
    );
}

export default CartList;
