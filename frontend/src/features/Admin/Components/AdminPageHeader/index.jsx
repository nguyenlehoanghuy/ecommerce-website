import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material';
import { AccountCircle } from '@material-ui/icons';
import { logOut } from 'features/auth/userSlice';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles({
    root: {
        background: 'white',
        borderRadius: 3,
        boxShadow: '0 2px 4px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 8%)',
        color: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '1px solid #cdcdcd',
    },
    toolBar: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row-reverse',
        width: '100%',
        alignItems: 'center',
        paddingRight: '50px',
        minHeight: '50px',
    },
    link: {
        color: 'black',
        textDecoration: 'none',
    },
    closebtn: {
        position: 'absolute',
        right: '4px',
        top: '10px',
    },
});

export default function AdminPageHeader() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [showLogOut, setShowLogOut] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);

    const { enqueueSnackbar } = useSnackbar();

    const handleUserClick = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleClickLogOut = () => {
        setAnchorEl(null);
        setShowLogOut(true);
    };

    const handleCloseLogOut = () => {
        setShowLogOut(false);
    };

    const handleLogOut = async () => {
        try {
            const action = logOut();
            await dispatch(action);

            window.location.reload();
        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 });
        }
    };

    const user = useSelector((state) => state.user.current);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" className={classes.root}>
                <Toolbar className={classes.toolBar}>
                    <Box className={classes.nav}>
                        <Button color="secondary" onClick={handleUserClick}>
                            <AccountCircle />
                            <Typography variant="subtitle2">{user.customer_name}</Typography>
                        </Button>
                    </Box>

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openMenu}
                        onClose={handleMenuClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClickLogOut}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            {showLogOut && (
                <Dialog
                    open={showLogOut}
                    keepMounted
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{'Thông báo'}</DialogTitle>
                    <DialogContent sx={{ pb: '10px' }}>
                        <DialogContentText>
                            Tài khoản của bạn sẽ đăng xuất khỏi máy chủ.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseLogOut}>Disagree</Button>
                        <Button onClick={handleLogOut}>Agree</Button>
                    </DialogActions>
                </Dialog>
            )}
        </Box>
    );
}
