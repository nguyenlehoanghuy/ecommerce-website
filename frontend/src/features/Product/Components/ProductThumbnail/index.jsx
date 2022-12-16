import React from 'react';
import PropTypes from 'prop-types';
import { THUMBNAIL_PLACEHOLDER } from 'constants/index';

ProductThumbnail.propTypes = {
    product: PropTypes.object,
};

function ProductThumbnail({ product }) {
    const thumbNailURL = product.product_url || THUMBNAIL_PLACEHOLDER;
    return (
        <>
            <img
                src={thumbNailURL}
                alt={product.name}
                width="100%"
                style={{ objectFit: 'contain' }}
                lazy="true"
            ></img>
        </>
    );
}

export default ProductThumbnail;
