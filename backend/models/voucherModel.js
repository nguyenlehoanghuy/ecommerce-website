import connectDB from "../config/db.js"

const getAllVoucherDB = (data, callBack) => {
    connectDB.query(
        `SELECT * FROM voucher;`,
        [],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
}

const addVoucherDB = (data, callBack) => {
    connectDB.query(
        `INSERT INTO voucher (voucher_code, voucher_start, voucher_end, voucher_percent, voucher_quantity) VALUES 
        (?, ?, ?, ?, ?);`,
        [
            data.voucher_code,
            data.voucher_start,
            data.voucher_end,
            data.voucher_percent,
            data.voucher_quantity
        ],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
}

const deleteAllVoucherDB = (data, callBack) => {
    connectDB.query(
        `DELETE FROM voucher;`,
        [],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
}

const getSpecificVoucherDB = (data, callBack) => {
    connectDB.query(
        `SELECT * FROM voucher 
        WHERE voucher_code = ?;`,
        [data.voucher_code],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
        }
    );
}

const updateSpecificVoucherDB = (data, callBack) => {
    connectDB.query(
        `UPDATE voucher SET voucher_start = ?, voucher_end = ?, voucher_percent = ?, voucher_quantity = ?
        WHERE voucher_code = ?;`,
        [
            data.voucher_start,
            data.voucher_end,
            data.voucher_percent,
            data.voucher_quantity,
            data.voucher_code
        ],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
}

const deleteSpecificVoucherDB = (data, callBack) => {
    connectDB.query(
        `DELETE FROM voucher 
        WHERE voucher_code = ?;`,
        [data.voucher_code],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
}

export {
    getAllVoucherDB,
    addVoucherDB,
    deleteAllVoucherDB,
    getSpecificVoucherDB,
    updateSpecificVoucherDB,
    deleteSpecificVoucherDB
}