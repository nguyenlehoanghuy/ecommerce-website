import connectDB from '../config/db.js';

const getAllUserDB = (data, callBack) => {
    connectDB.query(`SELECT * FROM customer;`, [], (error, results, fields) => {
        if (error) {
            callBack(error);
        }
        return callBack(null, results);
    });
};

const removeAllUserDB = (data, callBack) => {
    connectDB.query(`delete from customer`, [], (error, results, fields) => {
        if (error) {
            callBack(error);
        }
        return callBack(null, results);
    });
};

const removeSpecificUserDB = (data, callBack) => {
    connectDB.query(
        `delete from customer where customer_id = ?`,
        [data.customer_id],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
};

const getSpecificUserDB = (data, callBack) => {
    connectDB.query(
        `SELECT * FROM customer
        WHERE customer_id = ?;`,
        [data.customer_id],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
};

const updateSpecificUserDB = (data, callBack) => {
    connectDB.query(
        `UPDATE customer SET customer_name = ?, customer_gender = ?, customer_address = ?, customer_phone = ?, customer_datebirth = ?
        WHERE customer_id = ?;`,
        [
            data.customer_name,
            data.customer_gender,
            data.customer_address,
            data.customer_phone,
            data.customer_datebirth,
            data.customer_id,
        ],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
};

const deleteSpecificUserDB = (data, callBack) => {
    connectDB.query(
        `DELETE FROM customer 
        WHERE customer_id = ?;`,
        [data.customer_id],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
};

const getAllInvoiceByUserIdDB = (data, callBack) => {
    connectDB.query(
        `SELECT * FROM invoice WHERE cart_id IN (SELECT cart_id FROM cart WHERE customer_id = ?);`,
        [data.customer_id],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
};

const deleteAllInvoiceByUserIdDB = (data, callBack) => {
    connectDB.query(
        `DELETE FROM cartitem, invoice, cart
        USING cartitem, invoice, cart
        WHERE invoice.cart_id = cart.cart_id
        AND cartitem.cart_id = cart.cart_id 
        AND cart.customer_id = ?;`,
        [data.customer_id],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
};

const getAllInvoiceDB = (data, callBack) => {
    connectDB.query(`SELECT * FROM invoice;`, [], (error, results, fields) => {
        if (error) {
            callBack(error);
        }
        return callBack(null, results);
    });
};

const addInvoiceDB = (data, callBack) => {
    connectDB.query(
        `START TRANSACTION;
        SET COLLATION_CONNECTION=utf8mb4_general_ci;
        SET @customer_id = ?;
        SET @voucher_code = ?;
        SET @invoice_total = ?;
        SET @address_id = ?;
        SET @cart_id = (
            SELECT cart_id FROM cart 
            WHERE customer_id = @customer_id
            AND cart_id NOT IN (SELECT cart_id FROM invoice)
        );
        UPDATE cartitem 
        INNER JOIN product ON (cartitem.product_id = product.product_id) 
        INNER JOIN promotion ON (product.promotion_id = promotion.promotion_id) 
        SET cartitem.reduced_price = promotion.promotion_percent
        WHERE NOW() BETWEEN promotion.promotion_startdate AND promotion.promotion_enddate;
        INSERT INTO invoice (invoice_date, invoice_total, invoice_status, cart_id, voucher_code, address_id) VALUES
        (
            NOW(), 
            @invoice_total, 
            "New", 
            @cart_id, 
            @voucher_code, 
            @address_id
        ); 
        UPDATE voucher SET voucher_quantity = voucher_quantity - 1 WHERE voucher_code = @voucher_code;
        INSERT INTO cart (customer_id) VALUES(@customer_id);
        COMMIT;`,
        [data.customer_id, data.voucher_code, data.invoice_total, data.address_id],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
};

const deleteAllInvoiceDB = (data, callBack) => {
    connectDB.query(
        `DELETE FROM cartitem, invoice, cart
        USING cartitem, invoice, cart
        WHERE invoice.cart_id = cart.cart_id
        AND cartitem.cart_id = cart.cart_id;`,
        [],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
};

const getSpecificInvoiceDB = (data, callBack) => {
    connectDB.query(
        `SELECT * FROM invoice WHERE invoice_id = ?;`,
        [data.invoice_id],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
};

const getNewInvoiceDB = (data, callBack) => {
    connectDB.query(
        `SELECT * FROM invoice WHERE invoice_status = 'New';`,
        [],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
};

const getAcceptInvoiceDB = (data, callBack) => {
    connectDB.query(
        `SELECT * FROM invoice WHERE invoice_status = 'Accept';`,
        [],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
};

const getCancelInvoiceDB = (data, callBack) => {
    connectDB.query(
        `SELECT * FROM invoice WHERE invoice_status = 'Cancel';`,
        [],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
};

const updateSpecificInvoiceDB = (data, callBack) => {
    connectDB.query(
        `UPDATE invoice SET invoice_date = ?, invoice_total = ?, invoice_status = ?, voucher_code = ?, address_id = ?
        WHERE invoice_id = ?;`,
        [
            data.invoice_date,
            data.invoice_total,
            data.invoice_status,
            data.voucher_code,
            data.address_id,
            data.invoice_id,
        ],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
};

const deleteSpecificInvoiceDB = (data, callBack) => {
    connectDB.query(
        `SET @cart_id = (SELECT cart_id FROM invoice WHERE invoice_id = ?);
        DELETE FROM invoice
        WHERE cart_id = @cart_id;
        DELETE FROM cartitem
        WHERE cart_id = @cart_id;
        DELETE FROM cart
        WHERE cart_id = @cart_id;`,
        [data.invoice_id],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
};

export {
    getAllUserDB,
    removeAllUserDB,
    getCancelInvoiceDB,
    getNewInvoiceDB,
    getAcceptInvoiceDB,
    getSpecificUserDB,
    updateSpecificUserDB,
    deleteSpecificUserDB,
    getAllInvoiceByUserIdDB,
    deleteAllInvoiceByUserIdDB,
    getAllInvoiceDB,
    addInvoiceDB,
    deleteAllInvoiceDB,
    getSpecificInvoiceDB,
    updateSpecificInvoiceDB,
    deleteSpecificInvoiceDB,
};
