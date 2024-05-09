import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

export async function updateAllContacts(contact) {
  fs.writeFile(contactsPath, JSON.stringify(contact, null, 2)) 
}

export async function listContacts() {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
  }

export async function getContactById(contactId) {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  const parsedContacts = JSON.parse(contacts);  
  const contact = parsedContacts.find(contact => contactId === contact.id);
  return contact || null;
}

export async function addContact (name, email, phone ) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone
  }
  contacts.push(newContact);
  await updateAllContacts(contacts);
  return newContact;
}

export async function updateContactById (id, data) {
  const contacts = await getAllContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if(index === -1) {
    return null;
  }
  contacts[index] = {...contacts[index], ...data};
  await updateAllContacts(contacts);

  return contacts[index];
}

export async function removeContact(id) {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === id);
    if(index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
}
