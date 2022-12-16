import axiosClient from './axiosClient';
import StorageKeys from 'constants/storage-key';

const invoiceAPI = {
    setState(id, data) {
        const url = `admins/invoices/${id}`;
        return axiosClient.patch(url, data);
    },
};

export default invoiceAPI;
