import axiosClient from './axiosClient';

const categoryAPI = {
    getAll(params) {
        const url = '/category';
        return axiosClient.get(url, { params }); // chỉ định thêm object config
    },
    get(id) {
        const url = `/category/${id}`;
        return axiosClient.get(url);
    },
    add(data) {
        const url = '/category';
        return axiosClient.post(url, data); // post(url,data,objectconfig)
    },
    update(data) {
        const url = `/category/${data.id}`;
        return axiosClient.patch(url, data); // or push
    },
    remove(id) {
        const url = `/category/${id}`;
        return axiosClient.delete(url);
    },
};

export default categoryAPI;
