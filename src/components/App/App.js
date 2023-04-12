import { useState, useEffect, useRef } from 'react';
import { Form } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { nanoid } from 'nanoid';
import { ContactList } from 'components/ContactList/ContactList/ContactList';
import { Container } from './App.styled';

const INITIAL_CONTACTS = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export function App() {
  const [contacts, setContacts] = useState(INITIAL_CONTACTS);
  const [filter, setFilter] = useState('');
  const isFirstRender = useRef(true);
  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (savedContacts) {
      setContacts(savedContacts);
    }
  }, []);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  //const componentDidMount = () => {
  //  const contacts1 = JSON.parse(localStorage.getItem('contacts'));
  //  if (contacts1) {
  //    this.setState({ contacts });
  //  }
  //};
  //const componentDidUpdate = (_, prevState) => {
  //  if (prevState.contacts.length !== contacts.length) {
  //    localStorage.setItem('contacts', JSON.stringify(contacts));
  //  }
  //};
  const addContact = (name, number) => {
    setContacts(state => [...state, { name, number, id: nanoid() }]);
  };
  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };
  const onChange = e => {
    setFilter(e.target.value);
  };

  const normalizedFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );
  return (
    <Container>
      <h1>Phonebook</h1>
      <Form onChange={addContact} onSubmit={contacts} />
      <h2>Contacts</h2>
      <Filter onChange={onChange} filter={filter} />
      <ContactList
        visibleContacts={visibleContacts}
        deleteContact={deleteContact}
      />
    </Container>
  );
}
