import React from 'react';

import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Box, Paper, Typography } from '@mui/material';
import ProductThumbnail from 'features/Product/Components/ProductThumbnail';
import CartItemPromotion from '../CartItemPromotion';
import { useNavigate } from 'react-router-dom';

MiniCartList.propTypes = {
    cartItems: PropTypes.array.isRequired,
};

const useStyles = makeStyles({
    paperTitle: {
        marginBottom: '2px',
    },
    root: {
        maxHeight: '300px',
        overflowY: 'auto',
        padding: '8px',
        marginTop: '5px',
    },
    cartBox: {
        display: 'flex',
    },
    itemImg: {
        minWidth: '80px',
        width: '80px',
        maxHeight: '80px',
        border: '1px solid #F3F3F7',
        cursor: 'pointer',
    },
    description: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    name: {
        cursor: 'pointer',
        wordBreak: 'break-word',
    },
});
function MiniCartList({ cartItems }) {
    const classes = useStyles();
    const navigate = useNavigate();

    const handleClickCartItem = (productId) => {
        navigate(`/product/${productId}`);
    };
    return (
        <>
            <Paper elevation={0} className={classes.root}>
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
                                    style={{ whiteSpace: 'pre-line' }}
                                    onClick={() => handleClickCartItem(Item.product_id)}
                                >
                                    {Item.product_name}
                                </Typography>
                                <Typography variant="button">{Item.product_price}</Typography>
                                <Typography variant="button">{`Số lượng: ${Item.quantity}`}</Typography>
                            </Box>
                        </Box>
                        <CartItemPromotion promotionId={Item.promotion_id} color="white" />
                    </Box>
                ))}
            </Paper>
        </>
    );
}

export default MiniCartList;
