import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Box, Button, Container, Dialog, DialogContent, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import CartList from '../Components/CartList';
import Loading from 'Components/Loading';
import { useEffect } from 'react';
import { getCart, purchase, removeAllItem, removeVoucher } from '../cartSlice';
import { numberToVND, YELLOW_COLOR } from 'constants/common';
import { BsInfoSquare, BsTag } from 'react-icons/bs';
import { useState } from 'react';
import VoucherList from '../Components/VoucherList';
import voucherAPI from 'api/voucherAPI';
import Voucher from '../Components/Voucher';
import promotionAPI from 'api/promotionAPI';
import { useMemo } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import StorageKeys from 'constants/storage-key';
import { useNavigate } from 'react-router-dom';

CartFeature.propTypes = {
    closeDialog: PropTypes.func,
};

const useStyles = makeStyles({
    root: {
        marginTop: '20px',
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
        marginTop: '12px',
    },
    wrapBillInfo: {
        display: 'flex',
        justifyContent: 'space-between',
    },
});

function CartFeature(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [open, setOpen] = useState(false);
    const [promotionList, setPromotionList] = useState();
    useEffect(() => {
        try {
            const fetchPromotion = async () => {
                const list = await promotionAPI.getAll();
                setPromotionList(list.data);
            };
            fetchPromotion();
        } catch (error) {
            console.log('Failed to fetch Promotion: ', error);
        }
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickRemoveAll = async (data) => {
        try {
            const RemoveAllItemAction = removeAllItem();
            await dispatch(RemoveAllItemAction);
        } catch (error) {
            console.log(error);
        }
    };
    const handleClickPurchase = async () => {
        try {
            const purchaseAction = purchase({
                voucher_code: voucherCart.voucher_code || null,
                invoice_total: totalBillPromotion,
                address_id: 1,
            });
            const resultPurchaseAction = await dispatch(purchaseAction);
            unwrapResult(resultPurchaseAction);

            dispatch(removeVoucher());
            localStorage.removeItem(StorageKeys.VOUCHER);

            const getCartAction = getCart();
            await dispatch(getCartAction);
            navigate(`/invoice`);
        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 });
        }
    };

    const handleCLickPromotion = () => {
        console.log(cartItems);
        if (cartItems.length > 0) setOpen(true);
        else
            enqueueSnackbar('Vui lòng thêm sản phẩm vào giỏ hàng trước', {
                variant: 'warning',
                autoHideDuration: 1000,
            });
    };

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

    const [vourcherList, setVourcherList] = useState([]);
    useEffect(() => {
        try {
            const fetchCategory = async () => {
                const list = await voucherAPI.getAll();
                setVourcherList(list.data);
            };
            fetchCategory();
        } catch (error) {
            console.log('Failed to fetch Voucher: ', error);
        }
    }, []);

    const cartItems = useSelector((state) => state.cart.cartItems);
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
            <Container sx={{ maxWidth: '1250px' }} maxWidth={false}>
                <Grid container>
                    <Grid className={classes.left} xs={12} sm={8} md={8} lg={8}>
                        <Box className={classes.title}>
                            <Typography variant="h6">Giỏ hàng</Typography>
                            <Typography
                                variant="button"
                                onClick={handleClickRemoveAll}
                                className={classes.deleteAll}
                            >
                                Xoá tất cả
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid className={classes.right} xs={12} sm={4} md={4} lg={4}>
                        <Box className={classes.download}>
                            <Button>Tải báo giá</Button>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid className={classes.left} xs={12} sm={8} md={8} lg={8}>
                        <CartList cartItems={cartItems} />
                    </Grid>
                    <Grid className={classes.right} xs={12} sm={4} md={4} lg={4}>
                        <Paper elevation={0} className={classes.rootPromotion}>
                            <Box className={classes.wrapPromotion}>
                                <Typography variant="h6">Khuyến mãi</Typography>
                                <Box onClick={handleCLickPromotion}>
                                    <BsTag />
                                    <Typography variant="button">Chọn khuyến mãi</Typography>
                                </Box>
                            </Box>
                            <Typography variant="subtitle2">Khuyến mãi đã áp dụng</Typography>
                            {isVoucher && <Voucher voucher={voucherCart} />}
                            <Box>
                                <BsInfoSquare />
                                <Typography variant="caption">
                                    Mã giảm giá/Phiếu mua hàng sẽ không thể khôi phục sau khi đặt
                                    hàng
                                </Typography>
                            </Box>
                        </Paper>
                        <Paper elevation={0} className={classes.rootBill}>
                            <Typography variant="h6">Thanh toán</Typography>
                            <Box className={classes.wrapBillInfo}>
                                <Typography variant="body2">Tổng tạm tính</Typography>
                                <Typography variant="body2">{numberToVND(totalBill)}</Typography>
                            </Box>
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
                            <Button variant="contained" fullWidth onClick={handleClickPurchase}>
                                MUA HÀNG
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                onClose={handleClose}
            >
                <DialogContent>
                    <Typography variant="h6">Khuyến mãi và miễn phí vận chuyển</Typography>
                    <Typography variant="subtitle2" sx={{ textAlign: 'left' }}>
                        Mã giảm giá
                    </Typography>
                    <Box textAlign="center" sx={{ minWidth: '450px' }}>
                        <VoucherList vourcherList={vourcherList} />
                    </Box>
                    <Button onClick={handleClose}>Đóng</Button>
                </DialogContent>
            </Dialog>
        </Box>
    );
}

export default CartFeature;
