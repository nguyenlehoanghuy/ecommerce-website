import express from 'express'
import { checkToken, checkRefeshToken, isAdmin } from '../middleware/auth.js'
import {
    getSpecificationById,
} from '../controllers/specificationControllers.js'

const router = express.Router()

router.route('/:id').get(getSpecificationById) // add
// router.route('/').post(registerUser) // add
// router.route("/").patch(checkToken, updateUser); // edit
// // router.route("/get").post(checkToken, getUser);
// router.route("/").delete(checkToken, deleteUser); // delete

export default router
