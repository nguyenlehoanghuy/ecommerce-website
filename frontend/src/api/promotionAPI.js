import axiosClient from './axiosClient';

const promotionAPI = {
    getAll(params) {
        const url = '/promotion';
        return axiosClient.get(url, { params }); // chỉ định thêm object config
    },
    get(id) {
        const url = `/promotion/${id}`;
        return axiosClient.get(url);
    },
    add(data) {
        const url = '/promotion';
        return axiosClient.post(url, data); // post(url,data,objectconfig)
    },
    update(data) {
        const url = `/promotion/${data.id}`;
        return axiosClient.patch(url, data); // or push
    },
    remove(id) {
        const url = `/promotion/${id}`;
        return axiosClient.delete(url);
    },
};

export default promotionAPI;
