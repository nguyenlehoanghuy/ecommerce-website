import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { THUMBNAIL_PLACEHOLDER } from 'constants/index';
import { useNavigate } from 'react-router-dom';
import promotionAPI from 'api/promotionAPI';
import { makeStyles } from '@mui/styles';
import { numberToVND } from 'constants/common';

Product.propTypes = {
    product: PropTypes.object,
    canSelect: PropTypes.bool,
};

Product.defaultProps = {
    product: [],
    canSelect: true,
};

const useStyles = makeStyles({
    root: {
        px: 1,
        pb: 1,
        cursor: 'pointer',
    },
    price: {
        fontSize: '16px',
        fontWeight: 'bold',
        mr: 1,
    },
    productName: {},
});

function Product({ product, canSelect }) {
    const classes = useStyles();
    const thumbNailURL = product.product_url || THUMBNAIL_PLACEHOLDER;
    const ref = useRef(null);
    const navigate = useNavigate();

    const [promotion, setPromotion] = useState({});

    const promotionId = product.promotion_id;
    useEffect(() => {
        try {
            const fetchPromotion = async () => {
                if (promotionId !== null) {
                    const result = await promotionAPI.get(promotionId);
                    setPromotion(result.data);
                }
            };
            fetchPromotion();
        } catch (error) {
            console.log('Failed to fetch Promotion: ', error);
        }
    }, [promotionId]);

    useEffect(() => {
        const element = ref.current;
        let moved;
        let downListener = () => {
            moved = false;
        };
        element.addEventListener('mousedown', downListener);
        let moveListener = () => {
            moved = true;
        };
        element.addEventListener('mousemove', moveListener);
        let upListener = () => {
            if (!moved) {
                navigate(`/product/${product.product_id}`);
            }
        };
        element.addEventListener('mouseup', upListener);

        return () => {
            element.removeEventListener('mousedown', downListener);
            element.removeEventListener('mousemove', moveListener);
            element.removeEventListener('mouseup', upListener);
        };
    }, [navigate, product.product_id]);

    return (
        <Box
            className={classes.root}
            sx={{ userSelect: canSelect ? 'auto' : 'none' }}
            minHeight="198px"
            ref={ref}
        >
            <Box>
                <img
                    src={thumbNailURL}
                    alt={product.product_name}
                    width="100%"
                    height="160px"
                    style={{ objectFit: 'contain' }}
                    draggable="false"
                    lazy="true"
                ></img>
            </Box>
            <Typography variant="body2" className={classes.productName}>
                {product.product_name}
            </Typography>
            <Typography variant="body2" className={classes.productInfo}>
                <Box component="span" className={classes.price}>
                    {numberToVND(product.product_price)}
                </Box>
                {promotion.promotion_percent > 0 ? `-${promotion.promotion_percent}%` : ''}
            </Typography>
        </Box>
    );
}

export default Product;
