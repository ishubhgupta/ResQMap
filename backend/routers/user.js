import express from "express";
import { login, logout, signup, verifyEmail, forgetPassword, resetPassword, checkAuth } from "../controllers/user.js";
import { verifyToken } from "../middlewares/authentication.js";
const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

router.post('/verify-email', verifyEmail);

router.post('/forget-password', forgetPassword);

router.post('/reset-password/:token', resetPassword);

router.get('/check-auth', verifyToken, checkAuth);

export default router;