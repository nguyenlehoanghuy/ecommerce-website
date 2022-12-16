import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2';
import { Skeleton } from '@mui/material';

ProductSkeletonList.propTypes = {
    length: PropTypes.number,
};

ProductSkeletonList.defaultProps = {
    length: 6,
};

function ProductSkeletonList(props) {
    const { length: listLength } = props;
    return (
        <Box>
            <Grid container>
                {Array.from({ length: listLength }).map((product, index) => (
                    <Grid key={index} xs={12} sm={6} md={4} lg={3}>
                        <Box>
                            <Skeleton variant="rectangular" width="100%" height={200} />
                            <Skeleton />
                            <Skeleton width="60%" />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default ProductSkeletonList;
