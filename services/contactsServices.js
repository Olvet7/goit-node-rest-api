import Contact from "../models/contact.js";

export const listContacts = () => Contact.find();
export const addContact = (data) => Contact.create(data);

export const getContactById = async (id) => {
  const contact = await Contact.findById(id);
  return contact;
};

export const removeContact = (id) => Contact.findByIdAndDelete(id);

export const updateContactById = (id, data) => Contact.findByIdAndUpdate(id, data);

export const updateStatusContact = (id, data) => Contact.findByIdAndUpdate(id, data);

