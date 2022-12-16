import connectDB from '../config/db.js';

const getAllCartItemDB = (data, callBack) => {
    let dbQuery = `SELECT * FROM product pro, cartitem cit WHERE cit.product_id = pro.product_id`;
    if (data.cart_id) {
        dbQuery += ` AND cit.cart_id = ${data.cart_id}`;
    } else {
        dbQuery += `  AND cit.cart_id = (
            SELECT crt.cart_id FROM cart crt, customer ctm 
            WHERE crt.customer_id = ctm.customer_id 
            AND crt.customer_id = ${data.customer_id} 
            AND cart_id NOT IN (SELECT ivc.cart_id FROM invoice ivc, cart crt WHERE ivc.cart_id = crt.cart_id)
            );`;
    }
    connectDB.query(dbQuery, (error, results, fields) => {
        if (error) {
            callBack(error);
        }
        return callBack(null, results);
    });
};

const getSpecificCartItemDB = (data, callBack) => {
    connectDB.query(
        `SELECT * FROM product pro, cartitem cit 
        WHERE cit.product_id = pro.product_id
        AND cit.cart_id = (
            SELECT crt.cart_id FROM cart crt, customer ctm 
            WHERE crt.customer_id = ctm.customer_id 
            AND crt.customer_id = ? 
            AND cart_id NOT IN (SELECT ivc.cart_id FROM invoice ivc, cart crt WHERE ivc.cart_id = crt.cart_id)
            ) 
        AND cit.product_id = ?;`,
        [data.customer_id, data.product_id],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
        }
    );
};

const addCartItemDB = (data, callBack) => {
    connectDB.query(
        `INSERT INTO cartitem (cart_id, product_id, quantity) VALUES 
        ((
            SELECT crt.cart_id FROM cart crt, customer ctm 
            WHERE crt.customer_id = ctm.customer_id 
            AND crt.customer_id = ? 
            AND cart_id NOT IN (
                SELECT ivc.cart_id FROM invoice ivc, cart crt 
                WHERE ivc.cart_id = crt.cart_id
                )), 
                ?, 
                ?
            );`,
        [data.customer_id, data.product_id, data.quantity],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
};

const updateSpecificCartItemDB = (data, callBack) => {
    connectDB.query(
        `UPDATE cartitem SET quantity = ? 
        WHERE cart_id = (
            SELECT crt.cart_id FROM cart crt, customer ctm 
            WHERE crt.customer_id = ctm.customer_id 
            AND crt.customer_id = ? 
            AND cart_id NOT IN (SELECT ivc.cart_id FROM invoice ivc, cart crt WHERE ivc.cart_id = crt.cart_id)
        ) 
        AND product_id = ?;`,
        [data.quantity, data.customer_id, data.product_id],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
};

const deleteAllCartItemDB = (data, callBack) => {
    connectDB.query(
        `DELETE FROM cartitem 
        WHERE cart_id = (
            SELECT crt.cart_id FROM cart crt, customer ctm 
            WHERE crt.customer_id = ctm.customer_id 
            AND crt.customer_id = ? 
            AND cart_id NOT IN (SELECT ivc.cart_id FROM invoice ivc, cart crt WHERE ivc.cart_id = crt.cart_id)
        );`,
        [data.customer_id],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
};

const deleteSpecificCartItemDB = (data, callBack) => {
    connectDB.query(
        `DELETE FROM cartitem 
        WHERE cart_id = (
            SELECT crt.cart_id FROM cart crt, customer ctm 
            WHERE crt.customer_id = ctm.customer_id 
            AND crt.customer_id = ? 
            AND cart_id NOT IN (SELECT ivc.cart_id FROM invoice ivc, cart crt WHERE ivc.cart_id = crt.cart_id)
        ) 
        AND product_id = ?;`,
        [data.customer_id, data.product_id],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
};

/*
const insertInvoiceDB = (data, callBack) => {
    connectDB.query(
        `START TRANSACTION;
        SET COLLATION_CONNECTION=utf8mb4_general_ci;
        SET @customer_id = ?;
        SET @voucher_code = ?;
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
        SET @total = (
            SELECT SUM(pro.product_price * (1 - cit.reduced_price / 100) * cit.quantity) FROM cartitem cit, product pro 
            WHERE pro.product_id = cit.product_id 
            AND cart_id = @cart_id
        );    
        INSERT INTO invoice (invoice_date, invoice_total, cart_id, voucher_code) VALUES 
        (
            NOW(), 
            @total,
            @cart_id,
            @voucher_code            
        );
        UPDATE voucher SET voucher_quantity = voucher_quantity - 1 WHERE voucher_code = @voucher_code;
        INSERT INTO cart (customer_id) VALUES(@customer_id);
        COMMIT;`,
        [
            data.customer_id,
            data.voucher_code
        ],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
}*/

export {
    getAllCartItemDB,
    getSpecificCartItemDB,
    addCartItemDB,
    updateSpecificCartItemDB,
    deleteAllCartItemDB,
    deleteSpecificCartItemDB,
};
