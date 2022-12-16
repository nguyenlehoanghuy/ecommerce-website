import { unwrapResult } from '@reduxjs/toolkit';
import { register } from 'features/auth/userSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import RegisterForm from '../RegisterForm';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { getCart } from 'features/Cart/cartSlice';
import moment from 'moment';

Register.propTypes = {
    closeDialog: PropTypes.func,
};

function Register(props) {
    const dispatch = useDispatch();
    const { closeDialog } = props;
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (data) => {
        try {
            // auto set username = email
            data.customer_username = data.customer_email;
            data.customer_datebirth = moment(data.customer_datebirth).format('YYYY-MM-DD');
            const action = register(data);
            const resultAction = await dispatch(action);
            unwrapResult(resultAction);
            enqueueSnackbar('Register successfully 🔔', {
                variant: 'success',
                autoHideDuration: 1000,
            });
            const getCartAction = getCart();
            await dispatch(getCartAction);
            // close dialog
            if (closeDialog) closeDialog();
        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 });
        }
    };

    return (
        <div>
            <RegisterForm onSubmit={handleSubmit} />
        </div>
    );
}

export default Register;
