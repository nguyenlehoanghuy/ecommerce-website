import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import categoryAPI from 'api/categoryAPI';
import { makeStyles } from '@mui/styles';
import ProductSkeletonCategory from '../Skeleton/ProductSkeletonCategory';
import { useNavigate } from 'react-router-dom';

const icon = [
    {
        id: 1,
        url: 'https://didongthongminh.vn/images/menus/original/group_1635241065.png',
    },
    {
        id: 2,
        url: 'https://didongthongminh.vn/images/menus/original/group1_1635241194.png',
    },
    {
        id: 3,
        url: 'https://didongthongminh.vn/images/menus/original/phukien_1635241134.png',
    },
    {
        id: 4,
        url: 'https://didongthongminh.vn/images/menus/original/tainghe_1635241251.png',
    },
];

const useStyles = makeStyles({
    menu: {
        textAlign: 'center',
        justifyContent: 'center',
        position: 'relative',
        display: 'flex',
        color: 'white',
        listStyle: 'none',
        padding: '8px',
        margin: 0,
        background: '#1A1A1A',
        '& > li': {
            '&:hover': {
                transition: 'all 0.2s',
                cursor: 'pointer',
                color: 'darkslateblue',
            },
        },
    },
    category: {
        paddingLeft: '50px',
        display: 'flex',
        width: '100%',
        margin: 5,
        fontWeight: '500',
        fontSize: '13px',
    },
});

function NavCategory({ onChange, filters }) {
    const classes = useStyles();
    const navigate = useNavigate();
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
        navigate(`/product?category_id=${category.category_id}`);
    };
    return (
        <Box>
            {loading ? (
                <ProductSkeletonCategory length={6} />
            ) : (
                <Box className={classes.root}>
                    <ul className={classes.menu}>
                        {categoryList.map((category) => (
                            <li
                                key={category.category_id}
                                onClick={() => handleCategoryClick(category)}
                            >
                                <Typography className={classes.category}>
                                    <img src={icon[category.category_id - 1].url} alt="Icon" />
                                    &ensp; {category.category_name}
                                </Typography>
                            </li>
                        ))}
                    </ul>
                </Box>
            )}
        </Box>
    );
}

export default NavCategory;
