import React from 'react';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import MobileStickyList from './Components/MobileStickyList';
import PhoneStickyList from './Components/PhoneStickyList';
import TabletStickyList from './Components/TabletStickyList';
import AccessoriesStickyList from './Components/AccessoriesStickyList';

const useStyles = makeStyles({
    root: {},
});

function ProductSticky(props) {
    const classes = useStyles();
    return (
        <Box padding={1} className={classes.root}>
            <MobileStickyList />
            <TabletStickyList />
            <PhoneStickyList />
            <AccessoriesStickyList />
        </Box>
    );
}

export default ProductSticky;
