import express from 'express';
import { checkToken, isAdmin } from '../middleware/auth.js';
import {
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
} from '../controllers/adminControllers.js';

const router = express.Router();

router.route('/user').get(checkToken, isAdmin, getAllUser);
router.route('/user').delete(checkToken, isAdmin, removeAllUser);

router.route('/invoices').get(checkToken, isAdmin, getAllInvoice);
router.route('/invoices').delete(checkToken, isAdmin, removeAllInvoice);

router.route('/invoices/new').get(checkToken, isAdmin, getNewInvoice);
router.route('/invoices/accept').get(checkToken, isAdmin, getAcceptInvoice);
router.route('/invoices/cancel').get(checkToken, isAdmin, getCancelInvoice);

router.route('/invoices/:invoiceId').get(checkToken, isAdmin, getSpecificInvoice);
router.route('/invoices/:invoiceId').patch(checkToken, isAdmin, editSpecificInvoice);
router.route('/invoices/:invoiceId').delete(checkToken, isAdmin, removeSpecificInvoice);

router.route('/user/:userId').get(checkToken, isAdmin, getSpecificUser);
router.route('/user/:userId').patch(checkToken, isAdmin, updateSpecificUser);
router.route('/user/:userId').delete(checkToken, isAdmin, removeSpecificUser);

router.route('/user/:userId/invoices').get(checkToken, isAdmin, getAllInvoiceByUserId);
router.route('/user/:userId/invoices').post(checkToken, isAdmin, addInvoice);
router.route('/user/:userId/invoices').delete(checkToken, isAdmin, removeAllInvoiceByUserId);

export default router;
