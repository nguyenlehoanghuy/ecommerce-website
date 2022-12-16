import axiosAdmin from './axiosAdmin';

const adminAPI = {
    upload(data) {
        const url = '/3/image';
        return axiosAdmin.post(url, data);
    },
};

export default adminAPI;
