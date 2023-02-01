import express from "express";
import {
  checkAdmin,
  checkCustomer,
  checkRefreshToken,
} from "../middleware/authentication.js";
import {
  register,
  getUsers,
  deleteUsers,
} from "../controllers/controller.users.js";

const router = express.Router();

router.route("/").post(register);
router.route("/").get(checkAdmin, getUsers);
router.route("/").delete(checkAdmin, deleteUsers);

export default router;
