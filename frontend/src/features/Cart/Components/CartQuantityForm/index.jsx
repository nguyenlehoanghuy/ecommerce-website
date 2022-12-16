import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import CartQuantityField from '../CartQuantityField';
import { removeItem, updateItem } from 'features/Cart/cartSlice';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Typography } from '@mui/material';
import { hideLoading, showLoading } from 'Components/Loading/loadingSlice';
import { useEffect } from 'react';

CartQuantityForm.propTypes = {
    productId: PropTypes.number.isRequired,
};
const useStyles = makeStyles({
    root: {},
    buy: {
        backgroundColor: '#1435c3',
        color: 'white',
        padding: '7px 50px',
        '&:hover': {
            backgroundColor: '#1735b4',
            color: 'white',
        },
        marginRight: '8px',
    },
    add: {
        backgroundColor: 'white',
        color: '#1435c3',
        border: '1px solid',
        '&:hover': {
            backgroundColor: '#f6f6f6',
        },
    },
    quantity: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    wrapProgess: {
        position: 'relative',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'red',
        width: '500px',
        height: '500px',
    },
    progress: {
        position: 'absolute',
    },
});

function CartQuantityForm({ productId }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const schema = yup
        .object()
        .shape({
            quantity: yup.number().required('Please enter quantity'),
        })
        .required();

    const { control, handleSubmit, formState } = useForm({
        defaultValues: {
            quantity: 1,
        },
        resolver: yupResolver(schema),
    });

    const { isSubmitting } = formState;

    const onSubmit = async (data) => {
        try {
            const UpdateItemAction = updateItem({
                product_id: productId,
                quantity: data.quantity,
            });
            const resultUpdateItemAction = await dispatch(UpdateItemAction);
            // do some thing here on login successfully
            const cart = unwrapResult(resultUpdateItemAction);
            console.log('cập nhật thành công: ', cart);
        } catch (error) {
            console.log(error);
        }
    };

    const handleClickRemove = async (data) => {
        try {
            const RemoveItemAction = removeItem({
                product_id: productId,
            });
            const resultRemoveItemAction = await dispatch(RemoveItemAction);
            // do some thing here on login successfully
            const cart = unwrapResult(resultRemoveItemAction);
            console.log('xoá thành công: ', cart);
        } catch (error) {
            console.log(error);
        }
    };
    // if (isSubmitting) dispatch(showLoading());
    useEffect(() => {
        if (isSubmitting) dispatch(showLoading());
        else dispatch(hideLoading());
    }, [isSubmitting, dispatch]);
    return (
        <Box className={classes.root}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                onChange={handleSubmit(onSubmit)}
                className={classes.form}
            >
                <Box className={classes.quantity}>
                    <CartQuantityField
                        name="quantity"
                        control={control}
                        formState={formState}
                        size="small"
                        margin="none"
                        productId={productId}
                    />
                    <Typography variant="caption" onClick={handleClickRemove}>
                        Xoá
                    </Typography>
                </Box>
            </form>
        </Box>
    );
}

export default CartQuantityForm;
