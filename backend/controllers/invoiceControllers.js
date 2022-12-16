import {
    getAllInvoiceDB,
    addInvoiceDB,
    deleteAllInvoiceDB,
    getSpecificInvoiceDB,
    updateSpecificInvoiceDB,
    deleteSpecificInvoiceDB
} from '../models/invoiceModel.js'

const getAllInvoice = (req, res) => {
    const data = {
        
    };

    getAllInvoiceDB(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        if (!results) {
            return res.status(404).json({
                "message": "Khong co hoa don nao",
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

const addInvoice = (req, res) => {
    const data = {
        invoice_date: req.body.invoice_date,
        invoice_total: req.body.invoice_total,
        invoice_status: req.body.invoice_status,
        customer_id: req.body.customer_id,
        voucher_code: req.body.voucher_code,
        address_id: req.body.address_id
    };

    addInvoiceDB(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                "success": 0,
                "message": "Them hoa don that bai"
            });
        } else {
            return res.json({
                "success": 1,
                "message": "Them hoa don thanh cong"
            });
        }
    })
}

const removeAllInvoice = (req, res) => {
    const data = {

    };

    deleteAllInvoiceDB(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                "success": 0,
                "message": "Xoa hoa don that bai"
            });
        } else {
            return res.json({
                "success": 1,
                "message": "Da xoa tat ca hoa don"
            });
        }
    })
}

const getSpecificInvoice = (req, res) => {
    const data = {
        customer_id: req.params.userId,
        invoice_id: req.params.invoice_id
    };

    getSpecificInvoiceDB(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        if (!results) {
            return res.status(404).json({
                "message": "Khong co hoa don",
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

const editSpecificInvoice = (req, res) => {
    const data = {
        invoice_date: req.body.invoice_date,
        invoice_total: req.body.invoice_total,
        invoice_status: req.body.invoice_status,
        cart_id: req.body.cart_id,
        voucher_code: req.body.voucher_code,
        address_id: req.body.address_id,
        invoice_id: req.params.invoiceId
    };

    getSpecificInvoiceDB(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        if (!results) {
            return res.status(404).json({
                "success": 0,
                "message": "Khong co hoa don"
            });
        } else {
            updateSpecificInvoiceDB(data, (err, results) => {
                if (err) {
                    console.log(err);
                    return;
                }

                if (results.affectedRows === 0) {
                    return res.status(404).json({
                        "success": 0,
                        "message": "Cap nhat hoa don that bai"
                    });
                } else {
                    return res.json({
                        "success": 1,
                        "message": "Da cap nhat hoa don"
                    });
                }
            })
        }
    })
}

const removeSpecificInvoice = (req, res) => {
    const data = {
        invoice_id: req.params.invoiceId
    };

    deleteSpecificInvoiceDB(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                "success": 0,
                "message": "Xoa hoa don that bai"
            });
        } else {
            return res.json({
                "success": 1,
                "message": "Da xoa hoa don"
            });
        }
    })
}

export {
    getAllInvoice,
    getSpecificInvoice,
    addInvoice,
    removeAllInvoice,
    editSpecificInvoice,
    removeSpecificInvoice
}