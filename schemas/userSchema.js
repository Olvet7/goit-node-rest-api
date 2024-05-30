import Joi from "joi";

import { emailRegexp } from "../expressions/user-expression.js";

const registerSchema = Joi.object({
  password: Joi.string()
    .required()
    .messages({ "any.required": "Password is required" }),
  email: Joi.string()
    .required()
    .pattern(emailRegexp)
    .messages({ "any.required": "Email is required" })
    .lowercase(),
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .default("starter"),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const userEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
})

export { registerSchema, loginSchema, userEmailSchema };

