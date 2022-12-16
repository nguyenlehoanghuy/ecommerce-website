import { Box } from '@mui/material';
import * as React from 'react';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import Voucher from '../Voucher';

VoucherList.propTypes = {
    vourcherList: PropTypes.array.isRequired,
};

const useStyles = makeStyles({
    root: {},
});

function VoucherList(props) {
    const { vourcherList } = props;
    const classes = useStyles();
    const today = new Date();
    const vorcherListUnexpired = vourcherList.filter((x) => {
        const voucherDate = new Date(x.voucher_end);
        return voucherDate > today && x.voucher_quantity > 0;
    });
    return (
        <Box className={classes.root}>
            {vorcherListUnexpired?.map((voucher) => (
                <Voucher voucher={voucher} key={voucher.voucher_code} />
            ))}
        </Box>
    );
}

export default VoucherList;
