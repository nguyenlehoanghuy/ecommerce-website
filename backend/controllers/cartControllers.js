import {
    getAllCartItemDB,
    deleteAllCartItemDB,
    addCartItemDB,
    getSpecificCartItemDB,
    updateSpecificCartItemDB,
    deleteSpecificCartItemDB,
} from '../models/cartModel.js';

const getAllCartItem = (req, res) => {
    const data = {
        cart_id: req.query.cart_id,
        customer_id: req.decoded.result,
    };

    getAllCartItemDB(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        if (!results) {
            return res.status(404).json({
                message: 'Khong co san pham nao trong gio',
                quantity: 0,
            });
        } else {
            return res.json({
                success: 1,
                data: results,
                quantity: results.length,
            });
        }
    });
};

const addCartItem = (req, res) => {
    const data = {
        customer_id: req.decoded.result,
        product_id: req.body.product_id,
        quantity: req.body.quantity,
    };

    getSpecificCartItemDB(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        if (!results) {
            addCartItemDB(data, (err, results) => {
                if (err) {
                    console.log(err);
                    return;
                }

                if (results.affectedRows === 0) {
                    return res.status(404).json({
                        success: 0,
                        message: 'Them san pham that bai',
                    });
                } else {
                    getAllCartItemDB(data, (err, results) => {
                        if (err) {
                            console.log(err);
                        }

                        if (!results) {
                            return res.status(404).json({
                                message: 'Lay danh sach san pham that bai',
                                quantity: 0,
                            });
                        } else {
                            return res.json({
                                success: 1,
                                message: 'Da them san pham vao gio',
                                data: results,
                                quantity: results.length,
                            });
                        }
                    });
                }
            });
        } else {
            data.quantity += results.quantity;
            updateSpecificCartItemDB(data, (err, results) => {
                if (err) {
                    console.log(err);
                    return;
                }

                if (results.affectedRows === 0) {
                    return res.status(404).json({
                        success: 0,
                        message: 'Cap nhat san pham that bai',
                    });
                } else {
                    getAllCartItemDB(data, (err, results) => {
                        if (err) {
                            console.log(err);
                        }

                        if (!results) {
                            return res.status(404).json({
                                message: 'Lay danh sach san pham that bai',
                                quantity: 0,
                            });
                        } else {
                            return res.json({
                                success: 1,
                                message: 'Da them san pham vao gio',
                                data: results,
                                quantity: results.length,
                            });
                        }
                    });
                }
            });
        }
    });
};

const editSpecificCartItem = (req, res) => {
    const data = {
        customer_id: req.decoded.result,
        product_id: req.params.productId,
        quantity: req.body.quantity,
    };

    getSpecificCartItemDB(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        if (!results) {
            return res.status(404).json({
                success: 0,
                message: 'San pham nay khong co trong gio',
            });
        } else {
            updateSpecificCartItemDB(data, (err, results) => {
                if (err) {
                    console.log(err);
                    return;
                }

                if (results.affectedRows === 0) {
                    return res.status(404).json({
                        success: 0,
                        message: 'Cap nhat san pham that bai',
                    });
                } else {
                    getAllCartItemDB(data, (err, results) => {
                        if (err) {
                            console.log(err);
                        }

                        if (!results) {
                            return res.status(404).json({
                                message: 'Lay danh sach san pham that bai',
                                quantity: 0,
                            });
                        } else {
                            return res.json({
                                success: 1,
                                message: 'Da cap nhat san pham vao gio',
                                data: results,
                                quantity: results.length,
                            });
                        }
                    });
                }
            });
        }
    });
};

const removeSpecificCartItem = (req, res) => {
    const data = {
        customer_id: req.decoded.result,
        product_id: req.params.productId,
    };

    deleteSpecificCartItemDB(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                success: 0,
                message: 'Xoa san pham khoi gio that bai',
            });
        } else {
            getAllCartItemDB(data, (err, results) => {
                if (err) {
                    console.log(err);
                    return;
                }

                if (!results) {
                    return res.status(404).json({
                        message: 'Lay danh sach san pham that bai',
                        quantity: 0,
                    });
                } else {
                    return res.json({
                        success: 1,
                        message: 'Da xoa san pham khoi gio',
                        data: results,
                        quantity: results.length,
                    });
                }
            });
        }
    });
};

const removeAllCartItem = (req, res) => {
    const data = {
        customer_id: req.decoded.result,
    };

    deleteAllCartItemDB(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                success: 0,
                message: 'Xoa san pham khoi gio that bai',
            });
        } else {
            getAllCartItemDB(data, (err, results) => {
                if (err) {
                    console.log(err);
                    return;
                }

                if (!results) {
                    return res.status(404).json({
                        message: 'Lay danh sach san pham that bai',
                        quantity: 0,
                    });
                } else {
                    return res.json({
                        success: 1,
                        message: 'Da xoa tat ca san pham khoi gio',
                        data: results,
                        quantity: results.length,
                    });
                }
            });
        }
    });
};

export {
    getAllCartItem,
    addCartItem,
    removeAllCartItem,
    editSpecificCartItem,
    removeSpecificCartItem,
};
