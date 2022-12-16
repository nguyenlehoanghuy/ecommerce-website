// import { unwrapResult } from '@reduxjs/toolkit';
import React from 'react';
// import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import InvoiceSearchForm from '../InvoiceSearchForm';
// import { useNavigate } from 'react-router-dom';

InvoiceSearch.propTypes = {
    closeDialog: PropTypes.func,
};

function InvoiceSearch(props) {
    // const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    // const navigate = useNavigate();

    const handleSubmit = async (data) => {
        try {
            console.log('Mã hoá đơn cần tìm là: ', data);
            // const fectProduct = async () => {
            //     try {
            //         const { data } = await productAPI.getAll({ isPromotion: true });
            //         setProductList(data);
            //     } catch (error) {
            //         console.log('Failed to fetch product list: ', error);
            //     }
            //     setLoading(false);
            // };
            // fectProduct();
        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 });
        }
    };

    return (
        <div>
            <InvoiceSearchForm onSubmit={handleSubmit} />
        </div>
    );
}

export default InvoiceSearch;
