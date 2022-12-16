import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Box, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Loading from 'Components/Loading';
import { useEffect } from 'react';
import { numberToVND, YELLOW_COLOR } from 'constants/common';
import { useState } from 'react';
import promotionAPI from 'api/promotionAPI';
import { useMemo } from 'react';
import { getCart } from 'features/Cart/cartSlice';
import MiniCartList from '../MiniCartList';

MiniCart.propTypes = {
    total: PropTypes.number,
    cartItems: PropTypes.array,
};

const useStyles = makeStyles({
    root: {
        position: 'absolute',
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
        right: 0,
        zIndex: 2,
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    download: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row-reverse',
    },
    paperTitle: {
        marginBottom: '2px',
    },
    deleteAll: {
        cursor: 'pointer',
        color: YELLOW_COLOR,
    },
    rootPromotion: {
        padding: '10px',
    },
    wrapPromotion: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'end',
    },
    rootBill: {
        padding: '10px',
    },
    wrapBillInfo: {
        display: 'flex',
        justifyContent: 'space-between',
    },
});

function MiniCart({ total, cartItems }) {
    const classes = useStyles();
    const dispatch = useDispatch();

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

    useEffect(() => {
        try {
            const fetchCart = async () => {
                const getCartAction = getCart();
                await dispatch(getCartAction);
            };
            fetchCart();
        } catch (error) {
            console.log('Failed to fetch Cart: ', error);
        }
    }, [dispatch]);

    const loading = useSelector((state) => state.loading.current);

    const voucherCart = useSelector((state) => state.cart.voucher);
    const totalBill = useMemo(
        () =>
            cartItems.reduce((previous, current) => {
                let promotionPrice = 0;
                if (current.promotion_id !== null && promotionList) {
                    const promotionOfProduct = promotionList?.find(
                        (x) => x.promotion_id === current.promotion_id
                    );

                    if (promotionOfProduct?.promotion_percent !== 0) {
                        promotionPrice =
                            (promotionOfProduct?.promotion_percent * current.product_price) / 100;
                    } else if (promotionOfProduct?.promotion_saleprice !== 0) {
                        promotionPrice = promotionOfProduct?.promotion_saleprice;
                    }
                }
                const productPrice = current.product_price - promotionPrice;
                const totalProductPrice = productPrice * current.quantity;
                return previous + totalProductPrice;
            }, 0),
        [cartItems, promotionList]
    );

    let isVoucher = true;
    if (Object.keys(voucherCart).length === 0) isVoucher = false;

    // Check voucher percent or voucher price
    let voucherPromotion;
    let totalBillPromotion = totalBill;
    if (isVoucher) {
        if (voucherCart.voucher_percent !== 0) {
            voucherPromotion = 'percent';
            totalBillPromotion = totalBill - (voucherCart.voucher_percent * totalBill) / 100;
        } else if (voucherCart.voucher_price !== 0) {
            voucherPromotion = 'price';
            totalBillPromotion = totalBill - voucherCart.voucher_price;
        }
    }
    return (
        <Box className={classes.root}>
            {loading && <Loading />}
            <Grid sx={{ width: '350px' }}>
                <Grid className={classes.left} xs={12} sm={8} md={8} lg={8}>
                    <MiniCartList cartItems={cartItems} />
                </Grid>
                <Grid className={classes.left} xs={12} sm={8} md={8} lg={8}>
                    <Paper elevation={0} className={classes.rootBill}>
                        <Typography variant="h6">Thanh toán</Typography>
                        {voucherPromotion && voucherPromotion === 'price' && (
                            <Box className={classes.wrapBillInfo}>
                                <Typography variant="body2">Mã giảm giá</Typography>
                                <Typography variant="body2">
                                    {numberToVND(voucherCart.voucher_price)}
                                </Typography>
                            </Box>
                        )}
                        {voucherPromotion && voucherPromotion === 'percent' && (
                            <Box className={classes.wrapBillInfo}>
                                <Typography variant="body2">Mã giảm giá</Typography>
                                <Typography variant="body2">
                                    {`${voucherCart.voucher_percent}%`}
                                </Typography>
                            </Box>
                        )}
                        <Box className={classes.wrapBillInfo}>
                            <Typography variant="body2">Thành tiền</Typography>
                            <Box>
                                <Typography variant="subtitle2" sx={{ textAlign: 'right' }}>
                                    {numberToVND(totalBillPromotion)}
                                </Typography>
                                <Typography variant="caption">(Đã bao gồm VAT)</Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

export default MiniCart;
