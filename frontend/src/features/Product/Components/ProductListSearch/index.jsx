import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { numberToVND } from 'constants/common';

ProductListSearch.propTypes = {
    data: PropTypes.array,
    onClick: PropTypes.func,
};

const useStyles = makeStyles({
    root: {
        backgroundColor: 'white',
        maxHeight: '400px',
        width: '500px',
        overflowY: 'auto',
        borderTop: 'none',
        borderRadius: '2px',
        boxShadow: 'rgb(0 0 0 / 28%) 0px 6px 12px 0px',
    },
    info: {
        display: 'flex',
        margin: '4px 0px',
        boxShadow: 'rgb(0 0 0 / 10%) 0px 6px 12px 0px',
        '&:hover': {
            backgroundColor: '#fafafa',
        },
        padding: '10px',
        cursor: 'pointer',
    },
    img: {
        height: '100%',
        width: '70px',
    },
    wrap: {
        fontSize: '14px',
        marginLeft: '12px',
        marginTop: '6px',
    },
    name: {},
    price: {
        color: '#fd0000',
        marginTop: '8px',
    },
});

function ProductListSearch({ data, onClick }) {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            {data.map((product) => (
                <Box
                    onClick={() => onClick(product.product_id)}
                    className={classes.info}
                    key={product.product_id}
                >
                    <img src={product.product_url} alt="" className={classes.img}></img>
                    <Box className={classes.wrap}>
                        <p className={classes.name}>{product.product_name}</p>
                        <p className={classes.price}>{numberToVND(product.product_price)}</p>
                    </Box>
                </Box>
            ))}
        </Box>
    );
}

export default ProductListSearch;
