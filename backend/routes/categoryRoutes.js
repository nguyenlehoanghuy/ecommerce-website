import express from 'express'
import { checkToken, checkRefeshToken, isAdmin } from '../middleware/auth.js'
import {
    getCategoryById,
    getCategory,
    addCategory,
    deleteAllCategory,
    updateSpecificCategory,
    deleteSpecificCategory
} from '../controllers/categoryControllers.js'

const router = express.Router();

router.route("/").get(getCategory);
router.route("/").post(addCategory);
router.route("/").delete(deleteAllCategory);

router.route('/:id').get(getCategoryById);
router.route('/:id').patch(updateSpecificCategory);
router.route('/:id').delete(deleteSpecificCategory);

export default router
