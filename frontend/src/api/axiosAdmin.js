import axios from 'axios';

const axiosAdmin = axios.create({
    baseURL: 'https://api.imgur.com/',
});

axiosAdmin.interceptors.request.use(
    async config => {
        config.headers = {
            'Authorization': `Client-ID 9159defb332202c`,
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });

axiosAdmin.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

export default axiosAdmin;
