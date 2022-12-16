import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    current: false,
};

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        showLoading: (state) => {
            state.current = true
        },
        hideLoading: (state) => {
            state.current = false
        },
    },
});

const { actions, reducer } = loadingSlice;
export const { showLoading, hideLoading } = actions;
export default reducer;
