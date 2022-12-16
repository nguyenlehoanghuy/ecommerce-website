import express from 'express';
import { checkToken, isAdmin } from '../middleware/auth.js';
import {
    getAllCartItem,
    addCartItem,
    removeAllCartItem,
    editSpecificCartItem,
    removeSpecificCartItem,
} from '../controllers/cartControllers.js';

const router = express.Router();

router.route('/').get(checkToken, getAllCartItem);
router.route('/').post(checkToken, addCartItem);
router.route('/').delete(checkToken, removeAllCartItem);
router.route('/:productId').patch(checkToken, editSpecificCartItem);
router.route('/:productId').delete(checkToken, removeSpecificCartItem);

export default router;
