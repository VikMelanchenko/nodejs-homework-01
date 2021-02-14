import path from 'path';
import * as fs from 'fs/promises';
import crypto from 'crypto'; //для генерации случайного ID

import createDirname from './dirname.js';

const { __dirname } = createDirname(import.meta.url);
const contactsPath = path.join(__dirname, './db/contacts.json');

//выводит список контактов
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data.toString());
    return contacts;
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

//выводи контакт по id
async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data.toString());
    const getContact = contacts.find((contact) => contact.id === contactId);
    return getContact;
  } catch (error) {
    console.error(`Got an error trying to find the file: ${error.message}`);
  }
}

// удаляет контакт
async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data.toString());
    const deletedContact = contacts.filter(
      (contact) => contact.id !== contactId
    );

    if (contacts.length === deletedContact.length) {
      return console.error(`Contact with ID ${contactId} not found`);
    }
    await fs.writeFile(contactsPath, JSON.stringify(deletedContact));
    console.log(`Contact with ID ${contactId} removed succesfully`);
  } catch (error) {
    console.error(`Got an error trying to find the file: ${error.message}`);
  }
}

// добавляет контакт
async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data.toString());
    const newContact = {
      id: crypto.randomBytes(2).toString('hex'),
      name,
      email,
      phone,
    };
    if (!contactsPath) {
      return;
    }
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts.concat(newContact))
    );
    console.log(`Contact ${name} was added succesfully`);
    return newContact;
  } catch (error) {
    console.error(`Got an error trying to write to a file: ${error.message}`);
    return;
  }
}

export { listContacts, getContactById, removeContact, addContact };

// exports the variables and functions above so that other modules can use them
// var 1
// module.exports = listContacts;
// module.exports = getContactById;
// module.exports = removeContact;
// module.exports = addContact;

// var 2
// module.exports.listContacts = listContacts;
// module.exports.getContactById = getContactById;
// module.exports.removeContact = removeContact;
// module.exports.addContact = addContact;

// var 3
// module.exports = { listContacts, getContactById, removeContact, addContact };
