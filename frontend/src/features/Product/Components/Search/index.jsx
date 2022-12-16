// import { unwrapResult } from '@reduxjs/toolkit';
import React from 'react';
// import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import SearchForm from '../SearchForm';
import { useNavigate } from 'react-router-dom';

Search.propTypes = {
    closeDialog: PropTypes.func,
};

function Search(props) {
    // const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const handleSubmit = async (data) => {
        try {
            console.log('Tên sản phẩm cần tìm là: ', data);
            navigate(`/product?name=${data.product_name}`);
        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 });
        }
    };

    return (
        <div>
            <SearchForm onSubmit={handleSubmit} />
        </div>
    );
}

export default Search;
