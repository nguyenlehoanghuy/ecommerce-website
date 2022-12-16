import express from 'express'
import { checkToken, checkRefeshToken, isAdmin } from '../middleware/auth.js'
import {
    getPromotionById,
    getPromotion,
} from '../controllers/promotionControllers.js'

const router = express.Router()

router.route('/:id').get(getPromotionById) // add
router.route("/").get(getPromotion);
// router.route('/').post(registerUser) // add
// router.route("/").patch(checkToken, updateUser); // edit
// router.route("/").delete(checkToken, deleteUser); // delete

export default router
