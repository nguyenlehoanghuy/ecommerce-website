import connectDB from '../config/db.js';
const createUserDB = (data, callBack) => {
    connectDB.query(
        `START TRANSACTION;
        insert into customer(customer_name, customer_gender, customer_email, customer_address, customer_phone, customer_username, customer_password, customer_datebirth) values(?,?,?,?,?,?,?,?);
        INSERT INTO cart(customer_id) VALUES (LAST_INSERT_ID());
        COMMIT;`,
        [
            data.customer_name,
            data.customer_gender,
            data.customer_email,
            data.customer_address,
            data.customer_phone,
            data.customer_username,
            data.customer_password,
            data.customer_datebirth,
        ],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[1].insertId);
        }
    );
};

const updateUserDB = (data, userId, callBack) => {
    connectDB.query(
        `update customer set customer_name=?, customer_gender=?, customer_address=?, customer_phone=?, customer_datebirth=? where customer_id = ?`,
        [
            data.customer_name,
            data.customer_gender,
            data.customer_address,
            data.customer_phone,
            data.customer_datebirth,
            userId,
        ],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
};

const updateUserRefeshTokenByEmailDB = (email, refeshtoken, callBack) => {
    connectDB.query(
        `update customer set customer_refeshtoken=? where customer_email = ?`,
        [refeshtoken, email],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
};

const updateUserRefeshTokenByIdDB = (userId, refeshtoken, callBack) => {
    connectDB.query(
        `update customer set customer_refeshtoken=? where customer_id = ?`,
        [refeshtoken, userId],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
};

const updatePasswordUserDB = (userId, data, callBack) => {
    connectDB.query(
        `update customer set customer_password=? where customer_id = ?`,
        [data.customer_password_new, userId],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
};

const deleteUserDB = (userId, callBack) => {
    connectDB.query(
        `delete from customer where customer_id = ?`,
        [userId],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
};

const deleteUserRefeshTokenDB = (userId, callBack) => {
    connectDB.query(
        `update customer set customer_refeshtoken=? where customer_id = ?`,
        [null, userId],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
};

const getUserByUserEmailDB = (email, callBack) => {
    connectDB.query(
        `select * from customer where customer_email = ?`,
        [email],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
        }
    );
};

const getUserByUserIdDB = (userId, callBack) => {
    connectDB.query(
        `select * from customer where customer_id = ?`,
        [userId],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
        }
    );
};

const getUserByRefeshTokenDB = (refeshtoken, callBack) => {
    connectDB.query(
        `select * from customer where customer_refeshtoken = ?`,
        [refeshtoken],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
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

const getUserRolesDB = (userId, callBack) => {
    connectDB.query(
        `select * from roles where customer_id = ?`,
        [userId],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
};

const getAllAddressByUserIdDB = (data, callBack) => {
    connectDB.query(
        `SELECT * FROM user_address WHERE customer_id = ?;`,
        [data.customer_id],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
};

const deleteAllAddressByUserIdDB = (data, callBack) => {
    connectDB.query(
        `DELETE FROM user_address
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

const getAllAddressDB = (data, callBack) => {
    connectDB.query(`SELECT * FROM user_address;`, [], (error, results, fields) => {
        if (error) {
            callBack(error);
        }
        return callBack(null, results);
    });
};

const addAddressDB = (data, callBack) => {
    connectDB.query(
        `INSERT INTO user_address (country, city, district, ward, descriptions, phones, emails, customer_id) VALUES
        (?, ?, ?, ?, ?, ?, ?, ?);`,
        [
            data.country,
            data.city,
            data.district,
            data.ward,
            data.descriptions,
            data.phones,
            data.emails,
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

const deleteAllAddressDB = (data, callBack) => {
    connectDB.query(`DELETE FROM user_address;`, [], (error, results, fields) => {
        if (error) {
            callBack(error);
        }
        return callBack(null, results);
    });
};

const getSpecificAddressDB = (data, callBack) => {
    connectDB.query(
        `SELECT * FROM user_address WHERE address_id = ?;`,
        [data.address_id],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
};

const updateSpecificAddressDB = (data, callBack) => {
    connectDB.query(
        `UPDATE user_address SET country = ?, city = ?, district = ?, ward = ?, descriptions = ?, phones = ?, emails = ?
        WHERE address_id = ?;`,
        [
            data.country,
            data.city,
            data.district,
            data.ward,
            data.descriptions,
            data.phones,
            data.emails,
            data.address_id,
        ],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
};

const deleteSpecificAddressDB = (data, callBack) => {
    connectDB.query(
        `DELETE FROM user_address
        WHERE address_id = ?;`,
        [data.address_id],
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
        `SELECT * FROM invoice WHERE cart_id IN (SELECT cart_id FROM cart WHERE customer_id = ?) AND invoice_status = 'New';`,
        [data.customer_id],
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
        `SELECT * FROM invoice WHERE cart_id IN (SELECT cart_id FROM cart WHERE customer_id = ?) AND invoice_status = 'Accept';`,
        [data.customer_id],
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
        `SELECT * FROM invoice WHERE cart_id IN (SELECT cart_id FROM cart WHERE customer_id = ?) AND invoice_status = 'Cancel';`,
        [data.customer_id],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
};

export {
    createUserDB,
    updateUserDB,
    updatePasswordUserDB,
    deleteUserDB,
    getSpecificUserDB,
    updateSpecificUserDB,
    deleteSpecificUserDB,
    getAllAddressDB,
    deleteAllAddressDB,
    getSpecificAddressDB,
    updateSpecificAddressDB,
    deleteSpecificAddressDB,
    getAllAddressByUserIdDB,
    addAddressDB,
    deleteAllAddressByUserIdDB,
    getAllInvoiceByUserIdDB,
    deleteAllInvoiceByUserIdDB,
    getAllInvoiceDB,
    addInvoiceDB,
    deleteAllInvoiceDB,
    getSpecificInvoiceDB,
    updateSpecificInvoiceDB,
    deleteSpecificInvoiceDB,
    getUserByUserEmailDB,
    getUserByRefeshTokenDB,
    updateUserRefeshTokenByEmailDB,
    deleteUserRefeshTokenDB,
    getUserByUserIdDB,
    updateUserRefeshTokenByIdDB,
    getUserRolesDB,
    getNewInvoiceDB,
    getAcceptInvoiceDB,
    getCancelInvoiceDB,
};
