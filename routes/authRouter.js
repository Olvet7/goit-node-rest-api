import express from "express";
import validateBody from "../helpers/validateBody.js";
import { registerSchema, loginSchema } from "../schemas/userSchema.js";
// import schemas from "../models/user.js";
import authControllers from "../controllers/authControllers.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.post("/register", validateBody(registerSchema), authControllers.register);
router.post("/login", validateBody(loginSchema), authControllers.login);
router.get("/current", authenticate, authControllers.getCurrent);
router.post("/logout", authenticate, authControllers.logout);
router.patch("/updateSubscription", authenticate, authControllers.updateSubscription);

// router.post("/register", validateBody(schemas.registerSchema), authControllers.register);
// router.post("/login", validateBody(schemas.loginSchema), authControllers.login);

export default router;