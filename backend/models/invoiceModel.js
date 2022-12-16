import connectDB from "../config/db.js"

const getAllInvoiceDB = (data, callBack) => {
    connectDB.query(
        `SELECT * FROM invoice;`,
        [],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
}

const addInvoiceDB = (data, callBack) => {
    connectDB.query(
        `START TRANSACTION;
        SET COLLATION_CONNECTION=utf8mb4_general_ci;
        SET @customer_id = ?;
        SET @voucher_code = ?;
        SET @invoice_total = ?;
        SET @address_id = ?;
        SET @cart_id = (
            SELECT crt.cart_id FROM cart crt, customer ctm
            WHERE crt.customer_id = ctm.customer_id 
            AND crt.customer_id = @customer_id 
            AND cart_id NOT IN (SELECT ivc.cart_id FROM invoice ivc, cart crt WHERE ivc.cart_id = crt.cart_id)
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
        [
            data.customer_id,
            data.voucher_code,
            data.invoice_total,
            data.address_id
        ],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
}

const deleteAllInvoiceDB = (data, callBack) => {
    connectDB.query(
        `DELETE FROM invoice;`,
        [],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
}

const getSpecificInvoiceDB = (data, callBack) => {
    connectDB.query(
        `SELECT inv.invoice_id, inv.invoice_date, inv.invoice_total, inv.invoice_status, inv.cart_id, inv.voucher_code, inv.address_id FROM invoice inv, cart crt
        WHERE crt.cart_id = inv.cart_id
        AND crt.cart_id IN (SELECT crt.cart_id FROM cart crt, customer ctm
                    WHERE crt.customer_id = ctm.customer_id 
                    AND crt.customer_id = ?)
        AND inv.invoice_id = IF(? IS NULL, inv.invoice_id, ?);`,
        [
            data.customer_id,
            data.invoice_id,
            data.invoice_id
        ],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
}

const updateSpecificInvoiceDB = (data, callBack) => {
    connectDB.query(
        `UPDATE invoice SET invoice_date = ?, invoice_total = ?, invoice_status = ?, cart_id = ?, voucher_code = ?, address_id = ?
        WHERE invoice_id = ?;`,
        [
            data.invoice_date,
            data.invoice_total,
            data.invoice_status,
            data.cart_id,
            data.voucher_code,
            data.address_id,
            data.invoice_id
        ],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
}

const deleteSpecificInvoiceDB = (data, callBack) => {
    connectDB.query(
        `DELETE FROM invoice 
        WHERE invoice_id = ?;`,
        [data.invoice_id],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
}

export {
    getAllInvoiceDB,
    addInvoiceDB,
    deleteAllInvoiceDB,
    getSpecificInvoiceDB,
    updateSpecificInvoiceDB,
    deleteSpecificInvoiceDB
}