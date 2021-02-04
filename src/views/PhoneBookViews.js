import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList';
import Section from 'components/Section';
import { contactsOperations, contactsSelectors } from 'redux/contacts';

export default function PhoneBookViews() {
  const [filter, setFilter] = useState('');
  const contacts = useSelector(contactsSelectors.getContacts);
  const dispatch = useDispatch();

  useEffect(() => dispatch(contactsOperations.fetchContacts()), [dispatch]);

  const handleChangeFilter = e => {
    setFilter(e.target.value);
  };

  return (
    <Section title="Phonebook">
      <ContactForm />

      {contacts.length > 1 && (
        <Filter value={filter} onChangeFilter={handleChangeFilter} />
      )}
      <h2>Contacts</h2>
      <ContactList />
    </Section>
  );
}
