import express from 'express'
import {checkToken} from '../middleware/auth.js'
import {
    getAllInvoice,
    getSpecificInvoice,
    addInvoice,
    removeAllInvoice,
    editSpecificInvoice,
    removeSpecificInvoice
} from '../controllers/invoiceControllers.js'

const router = express.Router();

router.route("/").get(checkToken, getAllInvoice);
router.route("/").post(checkToken, addInvoice);
router.route("/").delete(checkToken, removeAllInvoice);
router.route("/:userId").get(checkToken, getSpecificInvoice);
router.route("/:invoiceId").get(checkToken, getSpecificInvoice);
router.route("/:invoiceId").patch(checkToken, editSpecificInvoice);
router.route("/:invoiceId").delete(checkToken, removeSpecificInvoice);

export default router