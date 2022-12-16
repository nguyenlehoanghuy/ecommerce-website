import axiosClient from './axiosClient';

const voucherAPI = {
    getAll(params) {
        const url = '/voucher';
        return axiosClient.get(url, { params }); // chỉ định thêm object config
    },
    get(id) {
        const url = `/voucher/${id}`;
        return axiosClient.get(url);
    },
    add(data) {
        const url = '/voucher';
        return axiosClient.post(url, data); // post(url,data,objectconfig)
    },
    update(data) {
        const url = `/voucher/${data.id}`;
        return axiosClient.patch(url, data); // or push
    },
    remove(id) {
        const url = `/voucher/${id}`;
        return axiosClient.delete(url);
    },
};

export default voucherAPI;
