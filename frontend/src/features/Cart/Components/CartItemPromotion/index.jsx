import React from 'react';

import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import promotionAPI from 'api/promotionAPI';

CartItemPromotion.propTypes = {
    promotionId: PropTypes.number,
};

const useStyles = makeStyles({
    root: (cssValue) => ({
        backgroundColor: cssValue.color,
        padding: 15,
        borderRadius: '4px',
        marginTop: '17px',
    }),
    promotion: {
        display: 'flex',
        marginTop: '10px',
    },
});

function CartItemPromotion({ promotionId, color = '#F3F3F7' }) {
    const cssValue = {
        color,
    };
    const classes = useStyles(cssValue);
    const [promotion, setPromotion] = useState({});

    useEffect(() => {
        let isMounted = true;
        try {
            const fetchPromotion = async () => {
                if (promotionId !== null) {
                    const result = await promotionAPI.get(promotionId);
                    if (isMounted) {
                        setPromotion(result.data);
                    }
                }
            };
            fetchPromotion();
        } catch (error) {
            console.log('Failed to fetch Promotion: ', error);
        }
        return () => (isMounted = false);
    }, [promotionId]);
    return (
        <Box className={classes.root}>
            <Typography>{promotion.promotion_name}</Typography>
            <Box className={classes.promotion}>
                <img
                    src="https://shopfront-cdn.tekoapis.com/cart/gift-filled.png"
                    loading="lazy"
                    height="16"
                    alt=""
                    style={{ marginRight: '10px' }}
                />
                <Typography variant="caption">
                    {'Giảm ' +
                        (promotion.promotion_percent > 0
                            ? `-${promotion.promotion_percent}%`
                            : '') +
                        ' (áp dụng vào giá sản phẩm)'}
                </Typography>
            </Box>
        </Box>
    );
}

export default CartItemPromotion;
