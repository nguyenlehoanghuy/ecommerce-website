import { unwrapResult } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { update } from 'features/auth/userSlice';
import UpdateInfoForm from '../UpdateInfoForm';

UpdateInfo.propTypes = {
    closeDialog: PropTypes.func,
};

function UpdateInfo(props) {
    const dispatch = useDispatch();
    const { closeDialog } = props;
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (data) => {
        try {
            const action = update(data);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);
            // do some thing here on login successfully
            console.log(user);
            enqueueSnackbar('Update successfully 🔔', {
                variant: 'success',
                autoHideDuration: 1000,
            });
            // close dialog
            if (closeDialog) closeDialog();
        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 });
        }
    };

    return (
        <div>
            <UpdateInfoForm onSubmit={handleSubmit} />
        </div>
    );
}

export default UpdateInfo;
