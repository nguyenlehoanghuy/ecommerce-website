import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            sx={{ cursor: 'pointer' }}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </Box>
    );
}

export default TabPanel;
