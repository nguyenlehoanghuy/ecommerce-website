import axios from 'axios';
import StorageKeys from 'constants/storage-key';
import { logOut } from 'features/auth/userSlice';
import userAPI from './userAPI';

const setLocalStorage = (response) => {
    localStorage.setItem(StorageKeys.TOKEN, response.token);
    localStorage.setItem(StorageKeys.REFESHTOKEN, response.user.customer_refeshtoken);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(response.user));
}

const getRefeshToken = () => {
    return localStorage.getItem(StorageKeys.REFESHTOKEN);
}

const axiosClient = axios.create({
    baseURL: 'http://localhost:5000/',
});

axiosClient.interceptors.request.use(
    async config => {
        const access_token = localStorage.getItem('access_token');
        config.headers = {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });

// Redux store in non-component files?
let store
let _isRefeshingToken = false
export const injectStore = _store => {
    store = _store

    // Response interceptor for API calls
    axiosClient.interceptors.response.use((response) => {
        return response.data
    }, async function (error) {

        const { config, data, status } = error.response;

        // Throw Error when status 400
        const URLS = ['/users', '/users/login', '/users/token', '/users/logout', '/users/get', '/users/cart', '/users/update'];
        if (URLS.includes(config.url) && (status === 400 || status === 404)) {
            throw new Error(data.data);
        }
        // If userId not looking in database
        if (error.response.status === 400 && error.response.data.message === 'NotLookingUser') await store.dispatch(logOut());
        // When accesssToken expired (status code 401)
        if (error.response.status === 401 && !config._retry) {
            config._retry = true;

            const refeshToken = getRefeshToken() // if refeshToken null use not login
            // call API refeshToken
            if (!_isRefeshingToken && refeshToken !== null) { // Block loop, because when callAPI: get Error 401 (refeshToken expired) -> callAPI: Error 401 -> callAPI: Error 401 loop infinity
                _isRefeshingToken = true // Check _isRefeshingToken = true cant call refehToken API again when get error 401

                try {
                    const response = await userAPI.refeshToken({ customer_refeshToken: refeshToken });
                    _isRefeshingToken = false // Because call API sucessfull, dont have error 401, _isRefeshingToken=false we can call API again

                    setLocalStorage(response)

                    const { token } = response
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                } catch (error) {
                    _isRefeshingToken = false // If refeshToken expired - logout account - _isRefeshingToken=false we can call API again
                    await store.dispatch(logOut());
                }
            }
            return axiosClient(config);
        }
        return Promise.reject(error);
    });
}

export default axiosClient;
