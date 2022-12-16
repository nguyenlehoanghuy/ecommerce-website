import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import Product from '../Product';
import { Slide } from 'react-slideshow-image';
ProductListPromotion.propTypes = {
    data: PropTypes.array,
};

ProductListPromotion.defaultProps = {
    data: [],
};
function ProductListPromotion({ data }) {
    return (
        <Box padding={1}>
            <Slide
                autoplay={true}
                slidesToScroll={1}
                slidesToShow={4}
                indicators={true}
                transitionDuration={100}
            >
                {data.map((product) => (
                    <Product key={product.product_id} product={product} canSelect={false} />
                ))}
            </Slide>
        </Box>
    );
}

export default ProductListPromotion;
