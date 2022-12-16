import axiosClient from './axiosClient';
import StorageKeys from 'constants/storage-key';

const user = JSON.parse(localStorage.getItem(StorageKeys.USER));
const userId = user?.customer_id;

const userAPI = {
    register(data) {
        const url = '/users';
        return axiosClient.post(url, data);
    },
    login(data) {
        const url = '/users/login';
        return axiosClient.post(url, data);
    },
    get(data) {
        const url = '/users/get';
        return axiosClient.post(url, data);
    },
    logout(data) {
        const url = '/users/logout';
        return axiosClient.post(url, data);
    },
    update(data) {
        const url = '/users';
        return axiosClient.patch(url, data);
    },
    refeshToken(data) {
        const url = '/users/token';
        return axiosClient.post(url, data);
    },
    getInvoice() {
        const url = `/users/${userId}/invoices`;
        return axiosClient.get(url);
    },
    getInvoiceByID(id) {
        const url = `/users/invoices/${id}`;
        return axiosClient.get(url);
    },
    getInvoiceNew() {
        const url = '/admins/invoices/new';
        return axiosClient.get(url);
    },
    getInvoiceAccept() {
        const url = '/admins/invoices/accept';
        return axiosClient.get(url);
    },
    getInvoiceCancel() {
        const url = '/admins/invoices/cancel';
        return axiosClient.get(url);
    },
    getUserInvoiceNew() {
        const url = `/users/${userId}/invoices/new`;
        return axiosClient.get(url);
    },
    getUserInvoiceAccept() {
        const url = `/users/${userId}/invoices/accept`;
        return axiosClient.get(url);
    },
    getUserInvoiceCancel() {
        const url = `/users/${userId}/invoices/cancel`;
        return axiosClient.get(url);
    },
};

export default userAPI;
