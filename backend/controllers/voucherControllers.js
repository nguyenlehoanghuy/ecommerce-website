import {
    getAllVoucherDB,
    addVoucherDB,
    deleteAllVoucherDB,
    getSpecificVoucherDB,
    updateSpecificVoucherDB,
    deleteSpecificVoucherDB
} from '../models/voucherModel.js'

const getAllVoucher = (req, res) => {
    const data = {
        
    };

    getAllVoucherDB(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        if (!results) {
            return res.status(404).json({
                "message": "Khong co ma voucher nao",
                "quantity": 0,
            });
        } else {
            return res.json({
                "success": 1,
                "data": results,
                "quantity": results.length
            });
        }
    })
}

const addVoucher = (req, res) => {
    const data = {
        voucher_code: req.body.voucher_code,
        voucher_start: req.body.voucher_start,
        voucher_end: req.body.voucher_end,
        voucher_percent: req.body.voucher_percent,
        voucher_quantity: req.body.voucher_quantity
    };

    getSpecificVoucherDB(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        if (!results) {
            addVoucherDB(data, (err, results) => {
                if (err) {
                    console.log(err);
                    return;
                }

                if (results.affectedRows === 0) {
                    return res.status(404).json({
                        "success": 0,
                        "message": "Them voucher that bai"
                    });
                } else {
                    return res.json({
                        "success": 1,
                        "message": "Them voucher thanh cong"
                    });
                }
            })
        } else {
            data.voucher_quantity += results.voucher_quantity;
            updateSpecificVoucherDB(data, (err, results) => {
                if (err) {
                    console.log(err);
                    return;
                }

                if (results.affectedRows === 0) {
                    return res.status(404).json({
                        "success": 0,
                        "message": "Cap nhat voucher that bai"
                    });
                } else {
                    return res.json({
                        "success": 1, 
                        "message": "Da them san pham vao gio"
                    });
                }
            })
        }
    })
}

const removeAllVoucher = (req, res) => {
    const data = {

    };

    deleteAllVoucherDB(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                "success": 0,
                "message": "Xoa san voucher that bai"
            });
        } else {
            return res.json({
                "success": 1,
                "message": "Da xoa tat ca voucher"
            });
        }
    })
}

const getSpecificVoucher = (req, res) => {
    const data = {
        voucher_code: req.params.voucherCode
    };

    getSpecificVoucherDB(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        if (!results) {
            return res.status(404).json({
                "message": "Khong co ma voucher",
                "quantity": 0
            });
        } else {
            return res.json({
                "success": 1,
                "data": results
            });
        }
    })
}

const editSpecificVoucher = (req, res) => {
    const data = {
        voucher_code: req.params.voucherCode,
        voucher_start: req.body.voucher_start,
        voucher_end: req.body.voucher_end,
        voucher_percent: req.body.voucher_percent,
        voucher_quantity: req.body.voucher_quantity
    };

    getSpecificVoucherDB(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        if (!results) {
            return res.status(404).json({
                "success": 0,
                "message": "Khong co voucher"
            });
        } else {
            updateSpecificVoucherDB(data, (err, results) => {
                if (err) {
                    console.log(err);
                    return;
                }

                if (results.affectedRows === 0) {
                    return res.status(404).json({
                        "success": 0,
                        "message": "Cap nhat voucher that bai"
                    });
                } else {
                    return res.json({
                        "success": 1,
                        "message": "Da cap nhat voucher"
                    });
                }
            })
        }
    })
}

const removeSpecificVoucher = (req, res) => {
    const data = {
        voucher_code: req.params.voucherCode
    };

    deleteSpecificVoucherDB(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                "success": 0,
                "message": "Xoa voucher that bai"
            });
        } else {
            return res.json({
                "success": 1,
                "message": "Da xoa voucher"
            });
        }
    })
}

export {
    getAllVoucher,
    addVoucher,
    removeAllVoucher,
    getSpecificVoucher,
    editSpecificVoucher,
    removeSpecificVoucher,
}