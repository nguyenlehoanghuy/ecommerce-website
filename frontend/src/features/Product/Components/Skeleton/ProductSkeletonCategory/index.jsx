import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { Skeleton } from '@mui/material';

ProductSkeletonCategory.propTypes = {
    length: PropTypes.number,
};

ProductSkeletonCategory.defaultProps = {
    length: 6,
};

function ProductSkeletonCategory(props) {
    const { length: listLength } = props;
    return (
        <Box minHeight="300px" sx={{ px: '20px', pt: '20px' }}>
            <Skeleton width="90%" />
            <Box sx={{ mt: '20px' }}>
                {Array.from({ length: listLength }).map((product, index) => (
                    <Box sx={{ my: '15px' }} key={index}>
                        <Skeleton width="50%" />
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default ProductSkeletonCategory;
