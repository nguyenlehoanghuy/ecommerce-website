import StorageKeys from 'constants/storage-key';
import axiosClient from './axiosClient';

const cartAPI = {
    getAll(params) {
        const url = '/cart';
        return axiosClient.get(url, { params }); // chỉ định thêm object config
    },
    get(id) {
        const url = `/cart/${id}`;
        return axiosClient.get(url);
    },
    add(data) {
        const url = '/cart';
        return axiosClient.post(url, data);
    },
    update(data) {
        const url = `/cart/${data.product_id}`;
        return axiosClient.patch(url, data);
    },
    remove(data) {
        const url = `/cart/${data.product_id}`;
        return axiosClient.delete(url);
    },
    removeAll() {
        const url = `/cart`;
        return axiosClient.delete(url);
    },
    purchase(data) {
        const user = JSON.parse(localStorage.getItem(StorageKeys.USER));
        const userId = user?.customer_id;
        const url = `/users/${userId}/invoices`;
        console.log(userId);
        return axiosClient.post(url, data);
    },
};

export default cartAPI;
