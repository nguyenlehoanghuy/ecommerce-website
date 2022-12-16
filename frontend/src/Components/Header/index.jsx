import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Login from 'features/auth/Components/Login';
import Register from 'features/auth/Components/Register';
import {
    DialogActions,
    DialogContentText,
    DialogTitle,
    IconButton,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material';
import { AccountCircle, Close } from '@material-ui/icons';
import { logOut } from 'features/auth/userSlice';
import { useSnackbar } from 'notistack';
import Search from 'features/Product/Components/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorageKeys from 'constants/storage-key';
import { useNavigate } from 'react-router-dom';
import { getCart } from 'features/Cart/cartSlice';
import MiniCart from 'features/Cart/Components/MiniCart';

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #F8F9FC 30%, #FFFFFF 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 2px 4px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 8%)',
        color: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100px',
    },
    toolBar: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        paddingLeft: '150px',
        paddingRight: '0px',
    },
    link: {
        color: 'black',
        textDecoration: 'none',
    },
    wrapImage: {
        position: 'relative',
        display: 'block',
        minWidth: '200px',
    },
    img: {
        height: '80px',
        width: '100%',
        objectFit: 'contain',
        position: 'absolute',
        top: '-41px',
        cursor: 'pointer',
    },
    closebtn: {
        position: 'absolute',
        right: '4px',
        top: '10px',
    },
    cartBtn: {
        position: 'relative',
        '&:before': {
            top: '6px',
            left: '-24px',
            width: '64px',
            height: '34px',
            content: '""',
            position: 'absolute',
        },
    },
    nav: {
        display: 'flex',
    },
    menuCart: {},
});

const MODE = {
    LOGIN: 'login',
    REGISTER: 'register',
};

export default function Header() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState(MODE.LOGIN);

    const loggedInUser = JSON.parse(localStorage.getItem(StorageKeys.USER));
    const isLoggedIn = !!loggedInUser?.customer_id;

    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);

    const [showCart, setShowCart] = useState(false);

    const [showLogOut, setShowLogOut] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setMode(MODE.LOGIN);
    };

    const handleCloseLogOut = () => {
        setOpen(false);
        setShowLogOut(false);
    };

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

    const handleLogOut = async () => {
        try {
            const user = JSON.parse(localStorage.getItem(StorageKeys.USER)) || {};
            const action = logOut({ customer_id: user.customer_id });
            await dispatch(action);

            // do some thing here on logOut successfully
            setShowLogOut(false);
            const getCartAction = getCart();
            await dispatch(getCartAction);
            // window.location.reload();
        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 });
        }
    };

    const handleClickCart = () => {
        navigate(`/cart`);
    };

    const handleClickAccount = () => {
        navigate(`/account`);
        setAnchorEl(null);
    };

    const handleMenuCartOpen = () => {
        setShowCart(true);
    };

    const handleMenuCartClose = () => {
        setShowCart(false);
    };

    const handleClickCartAccount = () => {
        setAnchorEl(null);
        navigate(`/invoice`);
    };

    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalProductType = cartItems.length;
    const user = useSelector((state) => state.user.current);
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" className={classes.root}>
                <Toolbar className={classes.toolBar}>
                    <div className={classes.wrapImage}>
                        <img
                            src="https://cbgf.com/wp-content/uploads/2021/09/shopperspluslogo.png"
                            alt="logo"
                            className={classes.img}
                            style={{ objectFit: 'contain' }}
                            onClick={() => navigate('/')}
                        ></img>
                    </div>
                    <Search className={classes.search} />
                    <Box className={classes.nav}>
                        {!isLoggedIn && (
                            <Button color="secondary" onClick={handleClickOpen}>
                                <AccountCircle />
                                <Typography variant="subtitle2">Đăng nhập / Đăng ký</Typography>
                            </Button>
                        )}

                        {isLoggedIn && (
                            <Button
                                color="secondary"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleUserClick}
                            >
                                <AccountCircle />
                                <Typography variant="subtitle2" sx={{ color: 'black' }}>
                                    {user.customer_name}
                                </Typography>
                            </Button>
                        )}
                        <Box
                            sx={{ position: 'relative' }}
                            onMouseEnter={handleMenuCartOpen}
                            onMouseLeave={handleMenuCartClose}
                            onClick={handleClickCart}
                        >
                            <IconButton className={classes.cartBtn}>
                                <Badge badgeContent={totalProductType} color="secondary">
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                            {isLoggedIn && showCart && (
                                <MiniCart total={totalProductType} cartItems={cartItems} />
                            )}
                        </Box>
                    </Box>

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
                                        <Button
                                            color="primary"
                                            onClick={() => setMode(MODE.REGISTER)}
                                        >
                                            Không có tài khoản. Đăng ký
                                        </Button>
                                    </Box>
                                </>
                            )}
                            {mode === MODE.REGISTER && (
                                <>
                                    <Register closeDialog={handleClose} />
                                    <Box textAlign="center">
                                        <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                                            Có tài khoản. Đăng nhập
                                        </Button>
                                    </Box>
                                </>
                            )}
                        </DialogContent>
                    </Dialog>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openMenu}
                        onClose={handleMenuClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClickAccount}>Tài Khoản Của Tôi</MenuItem>
                        <MenuItem onClick={handleClickCartAccount}>Đơn Mua</MenuItem>
                        <MenuItem onClick={handleClickLogOut}>Đăng Xuất</MenuItem>
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
