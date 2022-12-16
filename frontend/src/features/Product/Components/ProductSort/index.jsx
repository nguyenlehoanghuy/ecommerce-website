import React from 'react';
import PropTypes from 'prop-types';
import { Box, Tab, Tabs } from '@mui/material';

ProductSort.propTypes = {
    onChange: PropTypes.func,
    currentSort: PropTypes.string,
};

function ProductSort({ onChange, currentSort }) {
    const handlechange = (e, value) => {
        if (onChange) onChange(value);
    };

    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs onChange={handlechange} value={currentSort}>
                <Tab label="GIÁ THẤP ⟶ CAO" value="salePrice:ASC"></Tab>
                <Tab label="Từ CAO ⟶ THẤP" value="salePrice:DESC" />
            </Tabs>
        </Box>
    );
}

export default ProductSort;
