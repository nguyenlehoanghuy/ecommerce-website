import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cartAPI from 'api/cartAPI';
import StorageKeys from 'constants/storage-key';

export const addItem = createAsyncThunk('cart/addItem', async (payload) => {
    const response = await cartAPI.add(payload);
    localStorage.setItem(StorageKeys.CART, JSON.stringify(response));
    return response.data;
});

export const getCart = createAsyncThunk('cart/getCart', async (params) => {
    const response = await cartAPI.getAll(params);
    localStorage.setItem(StorageKeys.CART, JSON.stringify(response));
    return response.data;
});

export const updateItem = createAsyncThunk('cart/updateItem', async (payload) => {
    const response = await cartAPI.update(payload);
    localStorage.setItem(StorageKeys.CART, JSON.stringify(response));
    return response.data;
});

export const removeItem = createAsyncThunk('cart/removeItem', async (payload) => {
    const response = await cartAPI.remove(payload);
    localStorage.setItem(StorageKeys.CART, JSON.stringify(response));
    return response.data;
});

export const removeAllItem = createAsyncThunk('cart/removeItem', async () => {
    const response = await cartAPI.removeAll();
    localStorage.setItem(StorageKeys.CART, JSON.stringify(response));
    return response.data;
});

export const purchase = createAsyncThunk('cart/purchase', async (payload) => {
    const response = await cartAPI.purchase(payload);
    localStorage.setItem(StorageKeys.CART, JSON.stringify({}));
    return response.data;
});

const initialState = {
    showMiniCart: false,
    cartItems: JSON.parse(localStorage.getItem(StorageKeys.CART))?.data || [],
    voucher: JSON.parse(localStorage.getItem(StorageKeys.VOUCHER)) || {},
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        showMiniCart: (state) => {
            state.showMiniCart = true;
        },
        hideMiniCart: (state) => {
            state.showMiniCart = false;
        },
        setVoucher: (state, action) => {
            state.voucher = action.payload;
        },
        removeVoucher: (state) => {
            state.voucher = {};
        },
    },
    extraReducers: {
        [addItem.fulfilled]: (state, action) => {
            state.cartItems = action.payload;
        },
        [getCart.fulfilled]: (state, action) => {
            state.cartItems = action.payload;
        },
        [getCart.rejected]: (state, action) => {
            state.cartItems = {};
        },
        [updateItem.fulfilled]: (state, action) => {
            state.cartItems = action.payload;
        },
        [removeItem.fulfilled]: (state, action) => {
            state.cartItems = action.payload;
        },
        [removeAllItem.fulfilled]: (state, action) => {
            state.cartItems = action.payload;
        },
        [purchase.fulfilled]: (state, action) => {
            state.cartItems = [];
        },
    },
});

const { actions, reducer } = cartSlice;
export const { showMiniCart, hideMiniCart, setVoucher, removeVoucher } = actions;
export default reducer;
