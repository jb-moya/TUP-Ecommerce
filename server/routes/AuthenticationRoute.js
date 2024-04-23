import express from "express";
const router = express.Router();
import { register, login, logout } from "../controllers/registerController.js"

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);

export default router;