import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from './contacts.js';

import yargs from 'yargs';
import argv from 'yargs';

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      listContacts();
      break;

    case 'get':
      getContactById(id);
      break;

    case 'add':
      addContact(name, email, phone);
      break;

    case 'remove':
      removeContact(id);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);

// addContact('Anna', 'anna@mail.com', '565656566');

// console.table(await listContacts());
// console.table(await getContactById(3));
// console.table(await removeContact(3));
// console.table(await addContact('Mango', 'mango@gmail.com', '322-22-22'));
