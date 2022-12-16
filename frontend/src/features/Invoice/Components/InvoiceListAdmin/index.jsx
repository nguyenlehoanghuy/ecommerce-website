import { Box, Button, Typography } from '@mui/material';
import * as React from 'react';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import InvoiceProductList from '../InvoiceProductList';
import { numberToVND } from 'constants/common';
import moment from 'moment';
import invoiceAPI from 'api/invoiceAPI';

InvoiceListAdmin.propTypes = {
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

function InvoiceListAdmin({ data, onChangeInvoice }) {
    const classes = useStyles();
    const handleAccept = async (invoice_id) => {
        try {
            const fetchCategory = async () => {
                const list = await invoiceAPI.setState(invoice_id, {
                    ...data,
                    invoice_status: 'Accept',
                });
                onChangeInvoice();
            };
            fetchCategory();
        } catch (error) {
            console.log('Failed to fetch Category: ', error);
        }
    };
    const handleCancel = async (invoice_id) => {
        try {
            const fetchCategory = async () => {
                const list = await invoiceAPI.setState(invoice_id, {
                    ...data,
                    invoice_status: 'Cancel',
                });
                onChangeInvoice();
            };
            fetchCategory();
        } catch (error) {
            console.log('Failed to fetch Category: ', error);
        }
    };
    return (
        <Box className={classes.root}>
            {data.map((item) => (
                <Box key={item.invoice_id} sx={{ margin: '10px', border: '1px solid gray' }}>
                    <Box sx={{ marginTop: '10px', marginLeft: '11px' }}>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ marginRight: '10px', backgroundColor: 'green' }}
                            onClick={() => handleAccept(item.invoice_id)}
                        >
                            Xác nhận
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ backgroundColor: 'yellow', color: 'black' }}
                            onClick={() => handleCancel(item.invoice_id)}
                        >
                            Huỷ
                        </Button>
                    </Box>
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

export default InvoiceListAdmin;
