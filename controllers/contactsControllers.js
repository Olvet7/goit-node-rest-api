import * as contactsServices from "../services/contactsServices.js";
import ctrlWrapper from "../middlewares/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const data = await contactsServices.listContacts({ owner }, {skip, limit});
  const total = await contactsServices.totalContacts({owner})
  res.json({data, total});
};

const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  const data = await contactsServices.addContact({ ...req.body, owner });
  res.status(201).json(data);
};

const getOneContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const data = await contactsServices.getContactById({ owner, _id: id });
  if (data === null) {
    throw HttpError(404, "Contact not found");
  }
  res.json(data);
};

const deleteContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const data = await contactsServices.removeContact({ owner, _id: id });
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.send(data);
};

const updateStatus = async (req, res) => {
  const { id } = res.params;
  const favoriteContact = await contactsServices.updateStatusContact(
    id,
    req.body,
    { new: true }
  );
  if (!favoriteContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(favoriteContact);
};

const updateContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const data = await contactsServices.updateContactById(
    { owner, _id: id },
    req.body
  );
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
  updateStatus: ctrlWrapper(updateStatus),
};
