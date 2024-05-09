import * as contactsServices from "../services/contactsServices.js";
import ctrlWrapper from "../middlewares/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";

const getAllContacts = async (req, res) => {
  const data = await contactsServices.listContacts();
  res.json(data);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const data = await contactsServices.getContactById(id);
  if (!data) {
    throw HttpError(404, "Not found");
  }
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const data = await contactsServices.removeContact(id);
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.json(data);
};

const createContact = async (req, res) => {
  const data = await contactsServices.addContact(req.body);
  res.status(200).json(data);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const data = await contactsServices.updateContactById(id, req.body);
  const emptyBody = Object.keys(req.body).length === 0;
  if (emptyBody) throw HttpError(400, "Please fill contact info");
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.json(data);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
};