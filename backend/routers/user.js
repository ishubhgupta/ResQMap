import express from "express";
import { login, logout, signup, verifyEmail, forgetPassword, resetPassword, checkAuth, getUserProfile, updateUserProfile} from "../controllers/user.js";
import { verifyToken } from "../middlewares/authentication.js";
const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

router.post('/verify-email', verifyEmail);

router.post('/forget-password', forgetPassword);

router.post('/reset-password/:token', resetPassword);

router.get('/check-auth', verifyToken, checkAuth);

router.get('/profile', verifyToken , getUserProfile);

router.put('/profile', verifyToken, updateUserProfile);

export default router;