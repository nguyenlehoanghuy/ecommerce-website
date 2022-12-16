import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import categoryAPI from 'api/categoryAPI';
import { makeStyles } from '@mui/styles';
import { GRAY_COLOR } from 'constants/index';
import ProductSkeletonCategory from '../Skeleton/ProductSkeletonCategory';

FilterByCategory.propTypes = {
    onChange: PropTypes.func,
    filters: PropTypes.object,
};

const useStyles = makeStyles({
    root: { padding: 20 },
    menu: {
        listStyle: 'none',
        padding: 0,
        '& > li': {
            padding: 2,
            margin: '10px 0',
            '&:hover': {
                transition: 'all 0.2s',
                cursor: 'pointer',
                color: 'darkslateblue',
                backgroundColor: GRAY_COLOR,
            },
        },
    },
});

function FilterByCategory({ onChange, filters }) {
    const classes = useStyles();
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        try {
            const fetchCategory = async () => {
                const list = await categoryAPI.getAll();
                setCategoryList(list.data);
                setLoading(false);
            };
            fetchCategory();
        } catch (error) {
            console.log('Failed to fetch Category: ', error);
        }
    }, []);
    const handleCategoryClick = (category) => {
        if (onChange) onChange({ ...filters, category_id: category.category_id, _page: 1 });
    };
    return (
        <Box>
            {loading ? (
                <ProductSkeletonCategory length={6} />
            ) : (
                <Box className={classes.root}>
                    <Typography variant="subtitle1" fontWeight="bold">
                        DANH MỤC SẢN PHẨM
                    </Typography>
                    <ul className={classes.menu}>
                        {categoryList.map((category) => (
                            <li
                                key={category.category_id}
                                onClick={() => handleCategoryClick(category)}
                            >
                                <Typography variant="body1"> {category.category_name}</Typography>
                            </li>
                        ))}
                    </ul>
                </Box>
            )}
        </Box>
    );
}

export default FilterByCategory;
