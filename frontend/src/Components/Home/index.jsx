import { Box, Container } from '@mui/material';
import NavCategory from 'features/Product/Components/NavCategory';
import ProductPromotion from 'features/Product/Components/ProductPromotion';
import React from 'react';
import HotNews from 'features/Product/Components/HotNews';
import IntroduceProduct from 'features/Product/Components/IntroduceProduct';
import ProductSticky from 'features/Product/Components/ProductSticky';
function Home(props) {
    return (
        <Box>
            <NavCategory />
            <Container sx={{ maxWidth: '1250px' }} maxWidth={false}>
                <IntroduceProduct />
                <HotNews />
                <ProductPromotion />
                <ProductSticky />
            </Container>
        </Box>
    );
}

export default Home;
