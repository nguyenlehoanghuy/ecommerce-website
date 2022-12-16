import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userAPI from 'api/userAPI';
import StorageKeys from 'constants/storage-key';

export const register = createAsyncThunk('user/register', async (payload) => {
    const response = await userAPI.register(payload);
    // save data to local storage
    localStorage.setItem(StorageKeys.TOKEN, response.token);
    localStorage.setItem(StorageKeys.REFESHTOKEN, response.user.customer_refeshtoken);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(response.user));

    // return user data
    return response.user;
});
export const login = createAsyncThunk('user/login', async (payload) => {
    const response = await userAPI.login(payload);

    // save data to local storage
    localStorage.setItem(StorageKeys.TOKEN, response.token);
    localStorage.setItem(StorageKeys.REFESHTOKEN, response.user.customer_refeshtoken);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(response.user));

    // return user data
    return response.user;
});

export const logOut = createAsyncThunk('user/logout', async (data) => {
    localStorage.removeItem(StorageKeys.TOKEN);
    localStorage.removeItem(StorageKeys.REFESHTOKEN);
    localStorage.removeItem(StorageKeys.USER);
    localStorage.removeItem(StorageKeys.CART);

    const response = await userAPI.logout(data);
    return response
});

export const update = createAsyncThunk('user/update', async (payload) => {
    const response = await userAPI.update(payload);

    // save data to local storage
    localStorage.setItem(StorageKeys.USER, JSON.stringify(response.user));

    // return user data
    return response.user;
});

const initialState = {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
    settings: {},
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    extraReducers: {
        [register.fulfilled]: (state, action) => {
            state.current = action.payload;
        },
        [login.fulfilled]: (state, action) => {
            state.current = action.payload;
        },
        [logOut.fulfilled]: (state, action) => {
            state.current = {};
        },
        [logOut.rejected]: (state, action) => {
            state.current = {};
        },
        [update.fulfilled]: (state, action) => {
            state.current = action.payload;
        },
    },
});

/*
    const { actions, reducer } = userSlice;
    export const { } = actions;
*/

const { reducer } = userSlice;

export default reducer;
