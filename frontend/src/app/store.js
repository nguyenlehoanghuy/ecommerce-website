import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'features/auth/userSlice';
import cartReducer from 'features/Cart/cartSlice';
import loadingReducer from 'Components/Loading/loadingSlice';


const rootReducer = {
    user: userReducer,
    cart: cartReducer,
    loading: loadingReducer,
};

export const store = configureStore({
    reducer: rootReducer,
});
