import express from 'express';
import { checkToken, checkRefeshToken, isAdmin } from '../middleware/auth.js';
import {
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
} from '../controllers/userControllers.js';

const router = express.Router();

router.route('/').post(registerUser);
router.route('/').patch(checkToken, updateUser);
router.route('/').delete(checkToken, deleteUser);

router.route('/address').get(checkToken, getAllAddress);
router.route('/address').delete(checkToken, removeAllAddress);

router.route('/invoices').get(checkToken, getAllInvoice);
router.route('/invoices').delete(checkToken, removeAllInvoice);

router.route('/address/:addressId').get(checkToken, getSpecificAddress);
router.route('/address/:addressId').patch(checkToken, editSpecificAddress);
router.route('/address/:addressId').delete(checkToken, removeSpecificAddress);

router.route('/invoices/:invoiceId').get(checkToken, getSpecificInvoice);
router.route('/invoices/:invoiceId').patch(checkToken, editSpecificInvoice);
router.route('/invoices/:invoiceId').delete(checkToken, removeSpecificInvoice);

router.route('/:userId').get(checkToken, getSpecificUser);
router.route('/:userId').patch(checkToken, updateSpecificUser);
router.route('/:userId').delete(checkToken, removeSpecificUser);

router.route('/:userId/address').get(checkToken, getAllAddressByUserId);
router.route('/:userId/address').post(checkToken, addAddress);
router.route('/:userId/address').delete(checkToken, removeAllAddressByUserId);

router.route('/:userId/invoices').get(checkToken, getAllInvoiceByUserId);
router.route('/:userId/invoices').post(checkToken, addInvoice);
router.route('/:userId/invoices').delete(checkToken, removeAllInvoiceByUserId);

router.route('/:userId/invoices/new').get(checkToken, getNewInvoice);
router.route('/:userId/invoices/accept').get(checkToken, getAcceptInvoice);
router.route('/:userId/invoices/cancel').get(checkToken, getCancelInvoice);

router.route('/login').post(login);
router.route('/token').post(checkRefeshToken, refeshToken);
router.route('/logout').post(logOutUser);
router.route('/get').post(checkToken, getUser);
router.route('/password').patch(checkToken, changePasswordUser);

export default router;
