import {
    getProductDB,
    getProductTotalDB,
    getProductByIdDB,
    addProductDB,
    removeAllProductDB,
    removeSpecificProductDB,
    editSpecificProductDB,
    removeSpecificImageDB,
    updateSpecificImageDB,
    getSpecificImageDB,
    removeAllImageByProductIdDB,
    getAllImageByProductIdDB,
    addImageByProductIdDB,
} from '../models/productModel.js';

const getProductList = (req, res) => {
    //Pagination
    const _limit = req.query._limit || 10;
    const _page = parseInt(req.query._page) || 1;
    const _offset = (_page - 1) * _limit;

    let _sort = req.query._sort || 'asc';

    if (_sort === 'salePrice:ASC') {
        _sort = 'asc';
    } else if (_sort === 'salePrice:DESC') {
        _sort = 'desc';
    }

    const category_id = req.query.category_id;
    const salePrice_gte = req.query.salePrice_gte;
    const salePrice_lte = req.query.salePrice_lte;
    const isPromotion = req.query.isPromotion;
    const productName = req.query.name;
    const isLimit = req.query.isLimit || true;
    const option = {
        _limit,
        _page,
        _offset,
        _sort,
        category_id,
        salePrice_gte,
        salePrice_lte,
        isPromotion,
        productName,
        isLimit,
    };

    getProductDB(option, (err, products) => {
        if (err) {
            console.log(err);
            return;
        }
        if (!products) {
            return res.status(400).json({
                success: 0,
                data: 'Get product error',
            });
        }
        if (isLimit === false) {
            return res.json({
                success: 1,
                message: 'Get product successfully',
                products,
            });
        }
        getProductTotalDB(option, (err, total) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!total) {
                return res.status(400).json({
                    success: 0,
                    data: 'Get product total error',
                });
            }
            return res.json({
                success: 1,
                message: 'Get product successfully',
                products,
                pagination: {
                    page: _page,
                    limit: _limit,
                    total: total['count(*)'],
                },
            });
        });
    });
};

const getProductById = (req, res) => {
    const productId = req.params.id;
    getProductByIdDB(productId, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        if (!results) {
            return res.status(400).json({
                success: 0,
                data: 'product not found',
            });
        }
        return res.json({
            success: 1,
            message: 'get product successfully',
            data: results,
        });
    });
};

const addProduct = (req, res) => {
    const data = {
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_url: req.body.product_url,
        product_post: req.body.product_post,
        product_sticky: req.body.product_sticky,
        category_id: req.body.category_id,
        promotion_id: req.body.promotion_id,
    };

    addProductDB(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                success: 0,
                message: 'Them sp that bai',
            });
        } else {
            return res.status(200).json({
                success: 1,
                message: 'Them sp thanh cong',
            });
        }
    });
};

const removeAllProduct = (req, res) => {
    const data = {};

    removeAllProductDB(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                success: 0,
                message: 'Xoa sp that bai',
            });
        } else {
            return res.json({
                success: 1,
                message: 'Da xoa tat ca sp',
            });
        }
    });
};

const addImageByProductID = (req, res) => {
    const data = {
        product_id: req.params.productId,
        urls: req.body.urls,
        descriptions: req.body.descriptions,
    };

    addImageByProductIdDB(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                success: 0,
                message: 'Them sp that bai',
            });
        } else {
            return res.status(200).json({
                success: 1,
                message: 'Them sp thanh cong',
            });
        }
    });
};

const getAllImageByProductID = (req, res) => {
    const data = {
        product_id: req.params.productId,
    };

    getAllImageByProductIdDB(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        if (!results) {
            return res.status(400).json({
                success: 0,
                data: 'product not found',
            });
        }
        return res.json({
            success: 1,
            message: 'get product successfully',
            data: results,
        });
    });
};

const removeAllImageByProductID = (req, res) => {
    const data = {
        product_id: req.params.productId,
    };

    removeAllImageByProductIdDB(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                success: 0,
                message: 'Xoa sp that bai',
            });
        } else {
            return res.json({
                success: 1,
                message: 'Da xoa sp',
            });
        }
    });
};

const getSpecificImage = (req, res) => {
    const data = {
        image_id: req.params.imageId,
    };

    getSpecificImageDB(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        if (!results) {
            return res.status(400).json({
                success: 0,
                data: 'product not found',
            });
        }
        return res.json({
            success: 1,
            message: 'get product successfully',
            data: results,
        });
    });
};

const removeSpecificProduct = (req, res) => {
    const data = {
        product_id: req.params.id,
    };

    removeSpecificProductDB(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                success: 0,
                message: 'Xoa sp that bai',
            });
        } else {
            return res.json({
                success: 1,
                message: 'Da xoa sp',
            });
        }
    });
};

const updateSpecificImage = (req, res) => {
    const data = {
        urls: req.body.urls,
        descriptions: req.body.descriptions,
        image_id: req.params.imageId,
    };

    updateSpecificImageDB(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                success: 0,
                message: 'Cap nhat sp that bai',
            });
        } else {
            return res.json({
                success: 1,
                message: 'Da cap nhat sp',
            });
        }
    });
};

const removeSpecificImage = (req, res) => {
    const data = {
        image_id: req.params.imageId,
    };

    removeSpecificImageDB(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                success: 0,
                message: 'Xoa sp that bai',
            });
        } else {
            return res.json({
                success: 1,
                message: 'Da xoa sp',
            });
        }
    });
};

const editSpecificProduct = (req, res) => {
    const data = {
        product_id: req.params.id,
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_url: req.body.product_url,
        product_post: req.body.product_post,
        product_sticky: req.body.product_sticky,
        category_id: req.body.category_id,
        promotion_id: req.body.promotion_id,
    };

    editSpecificProductDB(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                success: 0,
                message: 'Cap nhat sp that bai',
            });
        } else {
            return res.json({
                success: 1,
                message: 'Da cap nhat sp',
            });
        }
    });
};

export {
    getProductList,
    getProductById,
    addProduct,
    removeAllProduct,
    editSpecificProduct,
    removeSpecificProduct,
    getSpecificImage,
    updateSpecificImage,
    removeSpecificImage,
    getAllImageByProductID,
    addImageByProductID,
    removeAllImageByProductID,
};
