import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import FilterByCategory from '../Filter/FilterByCategory';
import FilterByPrice from '../Filter/FilterByPrice';
import FilterByService from '../Filter/FilterByService';

ProductFilter.propTypes = {
    filters: PropTypes.object,
    onChange: PropTypes.func,
};

function ProductFilter(props) {
    const { onChange, filters } = props;

    const handleChange = (newFilters) => {
        if (onChange) onChange(newFilters);
    };

    return (
        <Box>
            <FilterByCategory filters={filters} onChange={handleChange} />
            <FilterByPrice filters={filters} onChange={handleChange} />
            <FilterByService filters={filters} onChange={handleChange} />
        </Box>
    );
}

export default ProductFilter;
