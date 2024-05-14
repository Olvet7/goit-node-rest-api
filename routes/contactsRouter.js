import express from "express";
import contactsControllers from "../controllers/contactsControllers.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import validateBody from "../helpers/validateBody.js";
import isValidId from "../middlewares/isValidId.js";

const contactsRouter = express.Router();
const jsonParcer = express.json();

contactsRouter.get("/", contactsControllers.getAllContacts);

contactsRouter.get("/:id", isValidId, contactsControllers.getOneContact);

// contactsRouter.delete("/:id", isValidId, contactsControllers.deleteContact);

contactsRouter.post(
  "/",
  jsonParcer,
  validateBody(createContactSchema),
  contactsControllers.createContact
);

// contactsRouter.put("/:id", jsonParcer, isValidId, validateBody(updateContactSchema), contactsControllers.updateContact);

export default contactsRouter;
