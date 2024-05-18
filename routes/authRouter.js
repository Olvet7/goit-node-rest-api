import express from "express";
import validateBody from "../helpers/validateBody.js";
import { registerSchema, loginSchema } from "../models/user.js";
import authControllers from "../controllers/authControllers.js";

const router = express.Router();

router.post("/register", validateBody(registerSchema), authControllers.register)

router.post("/login", validateBody(loginSchema), authControllers.login)

export default router;