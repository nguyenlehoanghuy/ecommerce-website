import connectDB from '../config/db.js';

// Pagination
const getProductDB = (option, callBack) => {
    let dbQuery = `select * from product where 1=1`;

    if (option.category_id) {
        dbQuery += ` and category_id = ${option.category_id}`;
    }
    if (option.salePrice_gte || option.salePrice_lte) {
        dbQuery += ` and product_price > ${option.salePrice_gte} and product_price < ${option.salePrice_lte}`;
    }

    if (option.isPromotion === 'true') {
        dbQuery += ` and promotion_id is not null`;
    }
    if (option.productName) {
        dbQuery += ` and product_name like N'%${option.productName}%'`;
    }

    if (option.isLimit === true) {
        dbQuery += ` order by product_price ${option._sort} limit ${option._limit} offset ${option._offset}`;
    }

    connectDB.query(dbQuery, (error, results, fields) => {
        if (error) {
            callBack(error);
        }
        return callBack(null, results);
    });
};

// Pagination
const getProductTotalDB = (option, callBack) => {
    let haveFilters = false;
    let dbQuery = `select * from product where 1=1`;

    if (option.category_id) {
        dbQuery += ` and category_id = ${option.category_id}`;
        haveFilters = true;
    }
    if (option.salePrice_gte || option.salePrice_lte) {
        dbQuery += ` and product_price > ${option.salePrice_gte} and product_price < ${option.salePrice_lte}`;
        haveFilters = true;
    }
    if (option.isPromotion === 'true') {
        dbQuery += ` and promotion_id is not null`;
        haveFilters = true;
    }
    if (option.productName) {
        dbQuery += ` and product_name like N'%${option.productName}%'`;
        haveFilters = true;
    }

    // if dont have filters - count all product
    let dbCount = `select count(*) from product`;
    // if have filters - count product after filter
    if (haveFilters) {
        dbCount = `select count(*) from (${dbQuery}) AS a`;
    }
    connectDB.query(dbCount, (error, results, fields) => {
        if (error) {
            callBack(error);
        }
        return callBack(null, results[0]);
    });
};

const getProductByIdDB = (productId, callBack) => {
    connectDB.query(
        `select * from product where product_id = ?`,
        [productId],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
        }
    );
};

const addProductDB = (data, callBack) => {
    connectDB.query(
        `INSERT INTO product (product_name, product_price, product_url, product_post, product_sticky, category_id, promotion_id) VALUES (?, ?, ?, ?, ?, ?, ?);`,
        [
            data.product_name,
            data.product_price,
            data.product_url,
            data.product_post,
            data.product_sticky,
            data.category_id,
            data.promotion_id,
        ],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
};

const removeAllProductDB = (data, callBack) => {
    connectDB.query(`DELETE FROM product;`, [], (error, results, fields) => {
        if (error) {
            callBack(error);
        }
        return callBack(null, results);
    });
};

const removeSpecificProductDB = (data, callBack) => {
    connectDB.query(
        `DELETE FROM product WHERE product_id = ?;`,
        [data.product_id],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
};

const editSpecificProductDB = (data, callBack) => {
    connectDB.query(
        `UPDATE product SET product_name = ?, product_price = ?, product_url = ?, product_post = ?, product_sticky = ?, category_id = ?, promotion_id = ?
        WHERE product_id = ?;`,
        [
            data.product_name,
            data.product_price,
            data.product_url,
            data.product_post,
            data.product_sticky,
            data.category_id,
            data.promotion_id,
            data.product_id,
        ],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
};

const updateSpecificImageDB = (data, callBack) => {
    connectDB.query(
        `UPDATE images SET urls = ?, descriptions = ?
        WHERE image_id = ?;`,
        [data.urls, data.descriptions, data.image_id],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
};

const getAllImageByProductIdDB = (data, callBack) => {
    connectDB.query(
        `select * from images where product_id = ?`,
        [data.product_id],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
};

const getSpecificImageDB = (data, callBack) => {
    connectDB.query(
        `select * from images where image_id = ?`,
        [data.image_id],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
        }
    );
};

const addImageByProductIdDB = (data, callBack) => {
    connectDB.query(
        `INSERT INTO images (product_id, urls, descriptions) VALUES (?, ?, ?);`,
        [data.product_id, data.urls, data.descriptions],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
};

const removeAllImageByProductIdDB = (data, callBack) => {
    connectDB.query(
        `DELETE FROM images WHERE product_id = ?;`,
        [data.product_id],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
};

const removeSpecificImageDB = (data, callBack) => {
    connectDB.query(
        `DELETE FROM images WHERE image_id = ?;`,
        [data.image_id],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
};

export {
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
};
