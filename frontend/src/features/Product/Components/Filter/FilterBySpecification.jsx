import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Unstable_Grid2';

FilterBySpecification.propTypes = {
    onChange: PropTypes.func,
    filters: PropTypes.object,
};

const useStyles = makeStyles({
    root: {
        marginBottom: '8px',
        padding: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: '18px',
        position: 'relative',
        '&::after': {
            content: '" "',
            position: 'absolute',
            top: '0',
            left: '-20px',
            marginTop: '2px',
            width: '3px',
            height: '21px',
            backgroundColor: 'rgb(51, 51, 51)',
        },
    },
});

function FilterBySpecification({ onChange, filters }) {
    const classes = useStyles();
    const [categoryList] = useState([]);
    useEffect(() => {
        try {
            const fetchCategory = async () => {
                // const list = await categoryAPI.getAll();
                // setCategoryList(list.data);
            };
            fetchCategory();
        } catch (error) {
            console.log('Failed to fetch Category: ', error);
        }
    }, []);
    const handleCategoryClick = (category) => {
        if (onChange) onChange({ ...filters, category_id: category.category_id });
    };
    return (
        <Box className={classes.root}>
            <div className={classes.title}>Bộ lọc</div>
            <Grid container spacing={2}>
                <Grid xs={3} sm={3} md={2}>
                    <div>Thương hiệu</div>
                </Grid>
                <Grid xs={9} sm={9} md={10}>
                    <div>Iphone</div>
                    <div>SamSung</div>
                    <div>Xiaomi</div>
                </Grid>
            </Grid>
            <ul className={classes.menu}>
                {categoryList.map((category) => (
                    <li key={category.category_id} onClick={() => handleCategoryClick(category)}>
                        <Typography variant="body1"> {category.category_name}</Typography>
                    </li>
                ))}
            </ul>
        </Box>
    );
}

export default FilterBySpecification;
