import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Login from 'features/auth/Components/Login';
import Register from 'features/auth/Components/Register';
import { IconButton } from '@mui/material';
import { Close } from '@material-ui/icons';
import StorageKeys from 'constants/storage-key';
import NotFound from 'Components/NotFound';

const MODE = {
    LOGIN: 'login',
    REGISTER: 'register',
};

function PrivateRoute({ auth }) {
    const [open, setOpen] = useState(true);
    const [mode, setMode] = useState(MODE.LOGIN);
    const handleClose = () => {
        setOpen(false);
        setMode(MODE.LOGIN);
    };

    // Check account is login
    const loggedInUser = JSON.parse(localStorage.getItem(StorageKeys.USER));
    const isLoggedIn = !!loggedInUser?.customer_id;
    // Check acount is admin
    const isAdmin = true;
    if (auth === 'admin') return isLoggedIn && isAdmin ? <Outlet /> : <NotFound />;
    if (auth === 'user') {
        return isLoggedIn ? (
            <Outlet />
        ) : (
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                disableEscapeKeyDown
            >
                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: '4px',
                        top: '10px',
                    }}
                >
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
        );
    }
}

export default PrivateRoute;
