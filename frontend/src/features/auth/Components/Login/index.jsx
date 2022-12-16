import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import LoginForm from '../LoginForm';
import { login } from 'features/auth/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { getCart } from 'features/Cart/cartSlice';

Login.propTypes = {
    closeDialog: PropTypes.func,
};

function Login(props) {
    const dispatch = useDispatch();
    const { closeDialog } = props;
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (data) => {
        try {
            const loginAction = login(data);
            const resultLoginAction = await dispatch(loginAction);
            unwrapResult(resultLoginAction);

            const getCartAction = getCart();
            await dispatch(getCartAction);
            // window.location.reload();
            // close dialog
            if (closeDialog) closeDialog();
        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 });
        }
    };

    return (
        <div>
            <LoginForm onSubmit={handleSubmit} />
        </div>
    );
}

export default Login;
