import {
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
} from '../models/adminModel.js';

const getAllUser = (req, res) => {
    const data = {};

    getAllUserDB(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        if (!results) {
            return res.status(400).json({
                success: 0,
                data: 'NO USER',
            });
        }
        return res.json({
            success: 1,
            message: 'Get user successfully',
            user: results,
        });
    });
};

const removeAllUser = (req, res) => {
    const data = {};
    removeAllUserDB(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        if (results.affectedRows === 0) {
            return res.status(400).json({
                success: 0,
                message: 'Record not found',
            });
        }
        return res.json({
            success: 1,
            message: 'User deleted successfully',
        });
    });
};

const getSpecificUser = (req, res) => {
    const data = {
        customer_id: req.params.userId,
    };

    getSpecificUserDB(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        if (!results) {
            return res.status(404).json({
                message: 'Khong co userID',
                quantity: 0,
            });
        } else {
            return res.json({
                success: 1,
                data: results,
            });
        }
    });
};

const updateSpecificUser = (req, res) => {
    const data = {
        customer_name: req.body.customer_name,
        customer_gender: req.body.customer_gender,
        customer_address: req.body.customer_address,
        customer_phone: req.body.customer_phone,
        customer_datebirth: req.body.customer_datebirth,
        customer_id: req.params.userId,
    };

    updateSpecificUserDB(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                success: 0,
                message: 'Cap nhat tai khoan that bai',
            });
        } else {
            return res.json({
                success: 1,
                message: 'Da cap nhat tai khoan',
            });
        }
    });
};

const removeSpecificUser = (req, res) => {
    const data = {
        customer_id: req.params.userId,
    };

    deleteSpecificUserDB(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                success: 0,
                message: 'Xoa tai khoan that bai',
            });
        } else {
            return res.json({
                success: 1,
                message: 'Da xoa tai khoan',
            });
        }
    });
};

const getAllInvoiceByUserId = (req, res) => {
    const data = {
        customer_id: req.params.userId,
    };

    getAllInvoiceByUserIdDB(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        if (!results) {
            return res.status(404).json({
                message: 'Khong co hoa don',
                quantity: 0,
            });
        } else {
            return res.json({
                success: 1,
                data: results,
            });
        }
    });
};

const addInvoice = (req, res) => {
    const data = {
        customer_id: req.params.userId,
        voucher_code: req.body.voucher_code,
        invoice_total: req.body.invoice_total,
        address_id: req.body.address_id,
    };
    addInvoiceDB(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                success: 0,
                message: 'Them hoa don that bai',
            });
        } else {
            return res.json({
                success: 1,
                message: 'Them hoa don thanh cong',
            });
        }
    });
};

const removeAllInvoiceByUserId = (req, res) => {
    const data = {
        customer_id: req.params.userId,
    };

    deleteAllInvoiceByUserIdDB(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                success: 0,
                message: 'Xoa hoa don that bai',
            });
        } else {
            return res.json({
                success: 1,
                message: 'Da xoa hoa don',
            });
        }
    });
};

const getAllInvoice = (req, res) => {
    const data = {};

    getAllInvoiceDB(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        if (!results) {
            return res.status(404).json({
                message: 'Khong co hoa don nao',
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

const removeAllInvoice = (req, res) => {
    const data = {};

    deleteAllInvoiceDB(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                success: 0,
                message: 'Xoa tat ca hoa don that bai',
            });
        } else {
            return res.json({
                success: 1,
                message: 'Da xoa tat ca hoa don',
            });
        }
    });
};

const getSpecificInvoice = (req, res) => {
    const data = {
        invoice_id: req.params.invoiceId,
    };

    getSpecificInvoiceDB(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        if (!results) {
            return res.status(404).json({
                message: 'Khong co hoa don',
                quantity: 0,
            });
        } else {
            return res.json({
                success: 1,
                data: results,
            });
        }
    });
};

const getNewInvoice = (req, res) => {
    const data = {};

    getNewInvoiceDB(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        if (!results) {
            return res.status(404).json({
                message: 'Khong co hoa don',
                quantity: 0,
            });
        } else {
            return res.json({
                success: 1,
                data: results,
            });
        }
    });
};

const getAcceptInvoice = (req, res) => {
    const data = {};

    getAcceptInvoiceDB(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        if (!results) {
            return res.status(404).json({
                message: 'Khong co hoa don',
                quantity: 0,
            });
        } else {
            return res.json({
                success: 1,
                data: results,
            });
        }
    });
};

const getCancelInvoice = (req, res) => {
    const data = {};

    getCancelInvoiceDB(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        if (!results) {
            return res.status(404).json({
                message: 'Khong co hoa don',
                quantity: 0,
            });
        } else {
            return res.json({
                success: 1,
                data: results,
            });
        }
    });
};

const editSpecificInvoice = (req, res) => {
    const data = {
        invoice_date: req.body.invoice_date,
        invoice_total: req.body.invoice_total,
        invoice_status: req.body.invoice_status,
        voucher_code: req.body.voucher_code,
        address_id: req.body.address_id,
        invoice_id: req.params.invoiceId,
    };

    getSpecificInvoiceDB(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        if (!results) {
            return res.status(404).json({
                success: 0,
                message: 'Khong co hoa don',
            });
        } else {
            updateSpecificInvoiceDB(data, (err, results) => {
                if (err) {
                    console.log(err);
                    return;
                }

                if (results.affectedRows === 0) {
                    return res.status(404).json({
                        success: 0,
                        message: 'Cap nhat hoa don that bai',
                    });
                } else {
                    return res.json({
                        success: 1,
                        message: 'Da cap nhat hoa don',
                    });
                }
            });
        }
    });
};

const removeSpecificInvoice = (req, res) => {
    const data = {
        invoice_id: req.params.invoiceId,
    };

    deleteSpecificInvoiceDB(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                success: 0,
                message: 'Xoa hoa don that bai',
            });
        } else {
            return res.json({
                success: 1,
                message: 'Da xoa hoa don',
            });
        }
    });
};

export {
    getAllUser,
    removeAllUser,
    getSpecificUser,
    updateSpecificUser,
    removeSpecificUser,
    getAllInvoiceByUserId,
    removeAllInvoiceByUserId,
    getAllInvoice,
    addInvoice,
    removeAllInvoice,
    getSpecificInvoice,
    editSpecificInvoice,
    removeSpecificInvoice,
    getNewInvoice,
    getAcceptInvoice,
    getCancelInvoice,
};
