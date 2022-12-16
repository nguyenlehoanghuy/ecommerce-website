import express from 'express';
import { checkToken, checkRefeshToken, isAdmin } from '../middleware/auth.js';
import {
    getProductList,
    getProductById,
    addProduct,
    removeAllProduct,
    editSpecificProduct,
    removeSpecificProduct,
    getSpecificImage,
    updateSpecificImage,
    removeSpecificImage,
    getAllImageByProductID,
    addImageByProductID,
    removeAllImageByProductID,
} from '../controllers/productControllers.js';

const router = express.Router();

router.route('/').get(getProductList);
router.route('/').post(checkToken, isAdmin, addProduct);
router.route('/').delete(checkToken, isAdmin, removeAllProduct);

router.route('/:id').get(getProductById);
router.route('/:id').patch(checkToken, isAdmin, editSpecificProduct);
router.route('/:id').delete(checkToken, isAdmin, removeSpecificProduct);

router.route('/images/:imageId').get(checkToken, isAdmin, getSpecificImage);
router.route('/images/:imageId').patch(checkToken, isAdmin, updateSpecificImage);
router.route('/images/:imageId').delete(checkToken, isAdmin, removeSpecificImage);

//router.route('/specification/:specificationId').patch(checkToken, isAdmin, updateSpecification);

router.route('/:productId/images').get(checkToken, isAdmin, getAllImageByProductID);
router.route('/:productId/images').post(checkToken, isAdmin, addImageByProductID);
router.route('/:productId/images').delete(checkToken, isAdmin, removeAllImageByProductID);

// router.route('/:productId/specification').get(checkToken, isAdmin, getAllSpecificationByProductID);
// router.route('/:productId/specification').post(checkToken, isAdmin, addSpecificationByProductID);
// router.route('/:productId/specification').delete(checkToken, isAdmin, removeAllSpecificationByProductID);

export default router;
