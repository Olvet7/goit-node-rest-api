import express from "express";
import validateBody from "../helpers/validateBody.js";
import { registerSchema, loginSchema, userEmailSchema } from "../schemas/userSchema.js";
import authControllers from "../controllers/authControllers.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";
import avatarControllers from "../controllers/avatarControllers.js";

const router = express.Router();

router.post("/register", validateBody(registerSchema), authControllers.register);
router.post("/login", validateBody(loginSchema), authControllers.login);
router.get("/current", authenticate, authControllers.getCurrent);
router.post("/logout", authenticate, authControllers.logout);
router.patch("/updateSubscription", authenticate, authControllers.updateSubscription);
router.patch("/avatars", authenticate, upload.single("avatar"), avatarControllers.uploadAvatar);
router.get("/verify/:verificationToken", authControllers.verify);
router.post("/verify", validateBody(userEmailSchema), authControllers.resendVerify)

export default router;