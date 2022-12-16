import axiosClient from './axiosClient';

const productAPI = {
    async getAll(params) {
        const result = await axiosClient.get('/products', { params });
        console.log(params);
        return {
            data: result.products,
            pagination: result.pagination,
        };
    },
    get(id) {
        const url = `/products/${id}`;
        return axiosClient.get(url);
    },
    update(id, data) {
        const url = `/products/${id}`;
        return axiosClient.patch(url, data);
    },
    add(data) {
        const url = `/products`;
        return axiosClient.post(url, data);
    },
    delete(id) {
        const url = `/products/${id}`;
        return axiosClient.delete(url);
    },
};

export default productAPI;
