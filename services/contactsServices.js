import Contact from "../models/contact.js";

export const listContacts = (filter = {}, setting = {}) => Contact.find(filter, null, setting);
export const addContact = (data) => Contact.create(data);

export const getContactById = (filter) => {
  const contact = Contact.findOne(filter);
  return contact;
};

export const totalContacts = (filter) => Contact.countDocuments(filter);

export const removeContact = (filter) => Contact.findByIdAndDelete(filter);

export const updateContactById = (filter, data) => Contact.findByIdAndUpdate(filter, data);

export const updateStatusContact = (filter, data) => Contact.findByIdAndUpdate(filter, data);

