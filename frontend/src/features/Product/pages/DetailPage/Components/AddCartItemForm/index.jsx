import { unwrapResult } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import QuantityField from 'Components/FormControl/QuantityField';
import { addItem } from 'features/Cart/cartSlice';
import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Login from 'features/auth/Components/Login';
import Register from 'features/auth/Components/Register';
import { IconButton } from '@mui/material';
import { Close } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';

QuantityField.propTypes = {
    productId: PropTypes.number,
};

const MODE = {
    LOGIN: 'login',
    REGISTER: 'register',
};

const useStyles = makeStyles({
    closebtn: {
        position: 'absolute',
        right: '4px',
        top: '10px',
    },
});

function AddCartItemForm({ productId }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState(MODE.LOGIN);
    const loggedInUser = useSelector((state) => state.user.current);
    const isLoggedIn = !!loggedInUser.customer_id;

    const handleClose = () => {
        setOpen(false);
        setMode(MODE.LOGIN);
    };

    const handleBuySubmit = async (data) => {
        try {
            if (!isLoggedIn) setOpen(true);
            else {
                const AddItemAction = addItem({
                    product_id: productId,
                    quantity: data.quantity,
                });
                const resultAddItemAction = await dispatch(AddItemAction);
                // do some thing here on login successfully
                const cart = unwrapResult(resultAddItemAction);
                enqueueSnackbar('🛒 Sản phẩm được thêm vào giỏ hàng', {
                    variant: 'default',
                    autoHideDuration: 1000,
                });
                console.log(cart);
                navigate(`/cart`);
            }
        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 });
        }
    };

    const handleAddSubmit = async (data) => {
        try {
            if (!isLoggedIn) setOpen(true);
            else {
                const AddItemAction = addItem({
                    product_id: productId,
                    quantity: data.quantity,
                });
                const resultAddItemAction = await dispatch(AddItemAction);
                // do some thing here on login successfully
                const cart = unwrapResult(resultAddItemAction);
                enqueueSnackbar('🛒 Sản phẩm được thêm vào giỏ hàng', {
                    variant: 'default',
                    autoHideDuration: 1000,
                });
                console.log(cart);
            }
        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 });
        }
    };

    return (
        <div>
            <QuantityField onBuySubmit={handleBuySubmit} onAddSubmit={handleAddSubmit} />
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                disableEscapeKeyDown
            >
                <IconButton onClick={handleClose} className={classes.closebtn}>
                    <Close />
                </IconButton>
                <DialogContent>
                    {mode === MODE.LOGIN && (
                        <>
                            <Login closeDialog={handleClose} />
                            <Box textAlign="center">
                                <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                                    Dont have an account. Register here
                                </Button>
                            </Box>
                        </>
                    )}
                    {mode === MODE.REGISTER && (
                        <>
                            <Register closeDialog={handleClose} />
                            <Box textAlign="center">
                                <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                                    Already have an account. Login here
                                </Button>
                            </Box>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddCartItemForm;
