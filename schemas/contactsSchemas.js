import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().lowercase(),
    phone: Joi.string().required()
})

export const updateContactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().lowercase(),
    phone: Joi.string()
})

export const updateStatusSchema = Joi.object({
    favorire: Joi.boolean().required()
})

