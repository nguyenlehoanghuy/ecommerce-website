import {
    createUserDB,
    updateUserDB,
    deleteUserDB,
    getUserByUserEmailDB,
    updatePasswordUserDB,
    updateUserRefeshTokenByEmailDB,
    deleteUserRefeshTokenDB,
    getUserByUserIdDB,
    updateUserRefeshTokenByIdDB,
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
    getNewInvoiceDB,
    getAcceptInvoiceDB,
    getCancelInvoiceDB,
} from '../models/userModel.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import generateToken from '../ultils/generateToken.js' token

// @desc    Register new user
// @route   POST /users
// @access  Public
const { hashSync, genSaltSync, compareSync } = bcrypt;
const registerUser = (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.customer_password = hashSync(body.customer_password, salt);
    createUserDB(body, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: 'Database connection error',
            });
        }
        const jsontoken = jwt.sign({ result: results }, process.env.JWT_KEY, {
            expiresIn: '30m',
        });
        const jsonresfeshtoken = jwt.sign(
            { result: results.customer_id },
            process.env.REFESH_TOKEN_KEY,
            {
                expiresIn: '5d',
            }
        );
        updateUserRefeshTokenByEmailDB(body.customer_email, jsonresfeshtoken, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({
                    success: 0,
                    message: 'Record not found, Cant update RefeshToken',
                });
            } else {
                getUserByUserEmailDB(body.customer_email, (err, results) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (results.affectedRows === 0) {
                        return res.status(401).json({
                            success: 0,
                            message: 'Record not found, Cant update RefeshToken',
                        });
                    }
                    return res.json({
                        success: 1,
                        message: 'Register user successfully',
                        token: jsontoken,
                        user: results,
                    });
                });
            }
        });
    });
};
const updateUser = (req, res) => {
    const body = req.body;
    const userId = req.decoded.result;
    const salt = genSaltSync(10);
    updateUserDB(body, userId, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({
                success: 0,
                message: 'Record not found',
            });
        }
        getUserByUserIdDB(userId, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (results.affectedRows === 0) {
                return res.status(401).json({
                    success: 0,
                    message: 'Record not found, Cant update RefeshToken',
                });
            }
            return res.json({
                success: 1,
                message: 'updated successfully',
                user: results,
            });
        });
    });
};

const changePasswordUser = (req, res) => {
    const body = req.body;
    const userId = req.decoded.result;
    const salt = genSaltSync(10);
    body.customer_password_new = hashSync(body.customer_password_new, salt);

    getUserByUserIdDB(userId, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        if (!results) {
            return res.status(400).json({
                success: 0,
                data: 'Khong tim thay userId',
            });
        } else {
            if (compareSync(body.customer_password, results.customer_password)) {
                updatePasswordUserDB(userId, body, (err, results) => {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    if (results.affectedRows === 0) {
                        return res.status(404).json({
                            success: 0,
                            message: 'Doi mat khau that bai',
                        });
                    } else {
                        return res.json({
                            success: 1,
                            message: 'Updated successfully',
                        });
                    }
                });
            } else {
                return res.status(400).json({
                    success: 0,
                    message: 'Sai mat khau',
                });
            }
        }
    });
};

const deleteUser = (req, res) => {
    const userId = req.decoded.result;
    deleteUserDB(userId, (err, results) => {
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

const login = (req, res) => {
    const body = req.body;
    getUserByUserEmailDB(body.customer_email, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        if (!results) {
            return res.status(400).json({
                success: 0,
                data: 'Invalid email or password',
            });
        }
        const result = compareSync(body.customer_password, results.customer_password);
        if (result) {
            results.customer_password = undefined;
            const jsontoken = jwt.sign({ result: results.customer_id }, process.env.JWT_KEY, {
                expiresIn: '30m',
            });
            const jsonresfeshtoken = jwt.sign(
                { result: results.customer_id },
                process.env.REFESH_TOKEN_KEY,
                {
                    expiresIn: '7d',
                }
            );
            updateUserRefeshTokenByEmailDB(
                body.customer_email,
                jsonresfeshtoken,
                (err, results) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (results.affectedRows === 0) {
                        return res.status(404).json({
                            success: 0,
                            message: 'Record not found, Cant update RefeshToken',
                        });
                    } else {
                        getUserByUserEmailDB(body.customer_email, (err, results) => {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            if (results.affectedRows === 0) {
                                return res.status(401).json({
                                    success: 0,
                                    message: 'Record not found, Cant update RefeshToken',
                                });
                            }
                            return res.json({
                                success: 1,
                                message: 'login and updated refeshtoken successfully',
                                token: jsontoken,
                                user: results,
                            });
                        });
                    }
                }
            );
        } else {
            return res.status(400).json({
                success: 0,
                data: 'Invalid email or password',
            });
        }
    });
};

const logOutUser = (req, res) => {
    const userId = req.body.customer_id;
    deleteUserRefeshTokenDB(userId, (err, results) => {
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
            message: 'User deleted refeshtoken successfully',
        });
    });
};

const getUser = (req, res) => {
    const body = req.body;
    getUserByUserEmailDB(body.customer_email, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        if (!results) {
            return res.status(400).json({
                success: 0,
                data: 'Invalid email',
            });
        }
        return res.json({
            success: 1,
            message: 'Get user successfully',
            user: results,
        });
    });
};

const refeshToken = (req, res) => {
    const userId = req.decoded.result;
    getUserByUserIdDB(userId, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        if (!results) {
            return res.status(400).json({
                success: 0,
                data: 'Cant Refeshtoken wrong userID',
            });
        }
        const jsontoken = jwt.sign({ result: results.customer_id }, process.env.JWT_KEY, {
            expiresIn: '30m',
        });

        return res.json({
            success: 1,
            message: 'refeshtoken successfully',
            token: jsontoken,
            user: results,
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

const getAllAddress = (req, res) => {
    const data = {};

    getAllAddressDB(data, (err, results) => {
        if (err) {
            return res.status(501).json({
                success: 0,
                message: err,
            });
        }

        if (!results) {
            return res.status(200).json({
                success: 1,
                message: 'Khong co address',
            });
        } else {
            return res.status(200).json({
                success: 1,
                data: results,
                quantity: results.length,
            });
        }
    });
};

const removeAllAddress = (req, res) => {
    const data = {};

    deleteAllAddressDB(data, (err, results) => {
        if (err) {
            return res.status(501).json({
                success: 0,
                message: err,
            });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                success: 0,
                message: 'Xoa tat ca dia chi that bai',
            });
        } else {
            return res.status(200).json({
                success: 1,
                message: 'Da xoa tat ca dia chi',
            });
        }
    });
};

const getSpecificAddress = (req, res) => {
    const data = {
        address_id: req.params.addressId,
    };

    getSpecificAddressDB(data, (err, results) => {
        if (err) {
            return res.status(501).json({
                success: 0,
                message: err,
            });
        }

        if (!results) {
            return res.status(404).json({
                success: 0,
                message: 'Khong co address ID can tim',
            });
        } else {
            return res.status(200).json({
                success: 1,
                data: results,
            });
        }
    });
};

const editSpecificAddress = (req, res) => {
    const data = {
        country: req.body.country,
        city: req.body.city,
        district: req.body.district,
        ward: req.body.ward,
        descriptions: req.body.descriptions,
        phones: req.body.phones,
        emails: req.body.emails,
        address_id: req.params.addressId,
    };

    updateSpecificAddressDB(data, (err, results) => {
        if (err) {
            return res.status(501).json({
                success: 0,
                message: err,
            });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                success: 0,
                message: 'Cap nhat dia chi that bai',
            });
        } else {
            return res.status(200).json({
                success: 1,
                message: 'Da cap nhat dia chi',
            });
        }
    });
};

const removeSpecificAddress = (req, res) => {
    const data = {
        address_id: req.params.addressId,
    };

    deleteSpecificAddressDB(data, (err, results) => {
        if (err) {
            return res.status(501).json({
                success: 0,
                message: err,
            });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                success: 0,
                message: 'Xoa dia chi that bai',
            });
        } else {
            return res.status(200).json({
                success: 1,
                message: 'Da xoa dia chi',
            });
        }
    });
};

const getAllAddressByUserId = (req, res) => {
    const data = {
        customer_id: req.params.userId,
    };

    getAllAddressByUserIdDB(data, (err, results) => {
        if (err) {
            return res.status(501).json({
                success: 0,
                message: err,
            });
        }

        if (!results) {
            return res.status(404).json({
                success: 0,
                message: 'Khong co address can tim',
            });
        } else {
            return res.status(200).json({
                success: 1,
                data: results,
            });
        }
    });
};

const addAddress = (req, res) => {
    const data = {
        country: req.body.country,
        city: req.body.city,
        district: req.body.district,
        ward: req.body.ward,
        descriptions: req.body.descriptions,
        phones: req.body.phones,
        emails: req.body.emails,
        customer_id: req.params.userId,
    };

    addAddressDB(data, (err, results) => {
        if (err) {
            return res.status(501).json({
                success: 0,
                message: err,
            });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                success: 0,
                message: 'Them dia chi that bai',
            });
        } else {
            return res.json({
                success: 1,
                message: 'Them dia chi thanh cong',
            });
        }
    });
};

const removeAllAddressByUserId = (req, res) => {
    const data = {
        customer_id: req.params.userId,
    };

    deleteAllAddressByUserIdDB(data, (err, results) => {
        if (err) {
            return res.status(501).json({
                success: 0,
                message: err,
            });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                success: 0,
                message: 'Xoa dia chi that bai',
            });
        } else {
            return res.status(200).json({
                success: 1,
                message: 'Da xoa dia chi',
            });
        }
    });
};

const getNewInvoice = (req, res) => {
    const data = {
        customer_id: req.params.userId,
    };

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
    const data = {
        customer_id: req.params.userId,
    };

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
    const data = {
        customer_id: req.params.userId,
    };

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

export {
    registerUser,
    updateUser,
    deleteUser,
    getSpecificUser,
    updateSpecificUser,
    removeSpecificUser,
    getAllAddress,
    removeAllAddress,
    getSpecificAddress,
    editSpecificAddress,
    removeSpecificAddress,
    getAllAddressByUserId,
    addAddress,
    removeAllAddressByUserId,
    getAllInvoiceByUserId,
    removeAllInvoiceByUserId,
    getAllInvoice,
    addInvoice,
    removeAllInvoice,
    getSpecificInvoice,
    editSpecificInvoice,
    removeSpecificInvoice,
    changePasswordUser,
    login,
    refeshToken,
    getUser,
    logOutUser,
    getNewInvoice,
    getAcceptInvoice,
    getCancelInvoice,
};
