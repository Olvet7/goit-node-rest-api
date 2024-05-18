import Joi from "joi";

export const createUserSchema = Joi.object({
    password: Joi.string().required().messages("Password is required"),
    email: Joi.string().required().messages("Email is required").lowercase(),
    enum: Joi.string().valid("starte", "pro", "business").default("starter"),
    token: Joi.string().allow(null).default(null)
})
