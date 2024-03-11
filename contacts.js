const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function updateContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function getContacts() {
  const contacts = await fs.readFile(contactsPath);

  return JSON.parse(contacts);
}

async function getContactById(id) {
  const contacts = await getContacts();
  const contactById = contacts.find((item) => item.id === id);

  return contactById || null;
}

async function removeContact(id) {
  const contacts = await getContacts();
  const index = contacts.findIndex((item) => item.id === id);

  if (index === -1) return null;

  const [result] = contacts.splice(index, 1);

  await updateContacts(contacts);

  return result;
}

async function addContact(data) {
  const contacts = await getContacts();

  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);

  await updateContacts(contacts);

  return newContact;
}

module.exports = {
  getContacts,
  getContactById,
  addContact,
  removeContact,
};
