import { Box, Typography } from '@mui/material';
import * as React from 'react';
import { makeStyles } from '@mui/styles';
import { BiBarcodeReader } from 'react-icons/bi';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { removeVoucher, setVoucher } from 'features/Cart/cartSlice';
import StorageKeys from 'constants/storage-key';
import { numberToVND } from 'constants/common';

Voucher.propTypes = {
    voucher: PropTypes.object.isRequired,
};

const useStyles = makeStyles({
    wrapVoucher: {
        border: '1px solid red',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f3f5fc',
        padding: '10px',
    },
    wrapImg: {
        minWidth: '76px',
        height: '76px',
        backgroundColor: '#f8f8fc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapDateTick: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    cartPromotion: {
        flex: 1,
    },
});

function Voucher({ voucher }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const voucherDate = new Date(voucher.voucher_end);
    const dateFormat = moment(voucherDate).format('l');
    const voucherCart = useSelector((state) => state.cart.voucher);
    const isTick = voucherCart.voucher_code === voucher.voucher_code;

    // Check voucher percent or voucher price
    let voucherPromotion;
    if (voucher.voucher_percent !== 0) {
        voucherPromotion = 'percent';
    } else if (voucher.voucher_price !== 0) {
        voucherPromotion = 'price';
    }

    const handleClickAdd = () => {
        dispatch(setVoucher(voucher));
        localStorage.setItem(StorageKeys.VOUCHER, JSON.stringify(voucher));
    };
    const handleClickRemove = () => {
        dispatch(removeVoucher());
        localStorage.removeItem(StorageKeys.VOUCHER);
    };
    return (
        <Box className={classes.wrapVoucher}>
            <Box className={classes.wrapImg}>
                <BiBarcodeReader />
            </Box>
            <Box className={classes.cartPromotion}>
                {voucherPromotion === 'percent' && (
                    <Typography variant="subtitle2" sx={{ textAlign: 'left' }}>
                        {`Giảm ${voucher.voucher_percent}%`}
                    </Typography>
                )}
                {voucherPromotion === 'price' && (
                    <Typography variant="subtitle2" sx={{ textAlign: 'left' }}>
                        {`Giảm ${numberToVND(voucher.voucher_price)}`}
                    </Typography>
                )}
                <Box className={classes.wrapDateTick}>
                    <Typography variant="button">{`HSD: ${dateFormat}`}</Typography>
                    {!isTick && (
                        <Typography
                            variant="button"
                            sx={{ color: '#1990ff', cursor: 'pointer' }}
                            onClick={handleClickAdd}
                        >
                            Chọn
                        </Typography>
                    )}
                    {isTick && (
                        <Typography
                            variant="button"
                            sx={{ color: '#1990ff', cursor: 'pointer' }}
                            onClick={handleClickRemove}
                        >
                            Bỏ chọn
                        </Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
}

export default Voucher;
