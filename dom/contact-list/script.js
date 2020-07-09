'use strict';

const contactsList = document.getElementsByClassName('contacts-list')[0];
let contacts = JSON.parse(loadContacts());
                

function addContact(contact) {
  let li = document.createElement('li');
  li.setAttribute('data-email', contact.email);
  li.setAttribute('data-phone', contact.phone);
  contactsList.appendChild(li);              
  let strong = document.createElement('strong');
  strong.innerHTML = contact.name;
  li.appendChild(strong);
}

function addContacts(list) {
  for(let contact of list) {
    addContact(contact);
   } 
}

function deleteContacts(list) {
  while(list.firstChild) {
    list.removeChild(list.firstChild);
  }
}

deleteContacts(contactsList);
addContacts(contacts);