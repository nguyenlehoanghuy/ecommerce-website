import express from 'express'
import {
    getAllVoucher,
    getSpecificVoucher,
    addVoucher,
    removeAllVoucher,
    editSpecificVoucher,
    removeSpecificVoucher,
} from '../controllers/voucherControllers.js'

const router = express.Router();

router.route("/").get(getAllVoucher);
router.route("/").post(addVoucher);
router.route("/").delete(removeAllVoucher);
router.route("/:voucherCode").get(getSpecificVoucher);
router.route("/:voucherCode").patch(editSpecificVoucher);
router.route("/:voucherCode").delete(removeSpecificVoucher);

export default router