import { Box, Button, Typography } from '@mui/material';
import * as React from 'react';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import InvoiceProductList from '../InvoiceProductList';
import { numberToVND } from 'constants/common';
import moment from 'moment';
import invoiceAPI from 'api/invoiceAPI';
import StorageKeys from 'constants/storage-key';

InvoiceList.propTypes = {
    data: PropTypes.array,
    onChangeInvoice: PropTypes.func,
};

const useStyles = makeStyles({
    root: {},
    info: {
        display: 'flex',
        flexDirection: 'row-reverse',
        fontSize: '14px',
    },
});

function InvoiceList({ data, onChangeInvoice }) {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem(StorageKeys.USER)) || {};
    return (
        <Box className={classes.root}>
            {data.map((item) => (
                <Box key={item.invoice_id} sx={{ margin: '10px', border: '1px solid gray' }}>
                    <Box className={classes.info} sx={{ padding: '10px' }}>
                        <Typography
                            variant="body2"
                            sx={{ marginLeft: '10px' }}
                        >{`Mã hoá đơn: ${item.invoice_id}`}</Typography>
                        <Typography variant="body2">{`Ngày lập: ${moment(item.invoice_date).format(
                            'DD-MM-YYYY'
                        )}`}</Typography>
                    </Box>
                    <Box sx={{ marginLeft: '14px' }}>
                        <Typography>{`Trạng thái: ${item.invoice_status}`}</Typography>
                        <Typography>{`Địa chỉ giao hàng: ${user.customer_address}`}</Typography>
                        <Typography>{`Voucher áp dụng: ${
                            item.voucher_code ? item.voucher_code : 'không'
                        }`}</Typography>
                    </Box>
                    <InvoiceProductList cartId={item.cart_id} />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row-reverse',
                            marginRight: '10px',
                        }}
                    >
                        <Typography
                            sx={{
                                textAlign: 'right',
                                padding: '10px',
                                color: '#db1d24',
                            }}
                        >{`${numberToVND(item.invoice_total)}`}</Typography>
                        <Typography
                            sx={{
                                textAlign: 'right',
                                padding: '10px',
                                paddingRight: '0px',
                            }}
                        >
                            Tổng số tiền:
                        </Typography>
                    </Box>
                </Box>
            ))}
        </Box>
    );
}

export default InvoiceList;
