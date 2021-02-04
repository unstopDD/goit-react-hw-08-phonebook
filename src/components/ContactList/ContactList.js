import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ContactItem from './ContactItem';
import { getVisibleContacts } from 'redux/contacts/contacts-selectors';
import { deleteContact } from 'redux/contacts/contacts-operations';
import PropTypes from 'prop-types';
import s from './ContactList.module.css';

const ContactList = () => {
  const names = useSelector(getVisibleContacts);
  const dispatch = useDispatch();

  const onDeleteContact = id => dispatch(deleteContact(id));

  return (
    <ul className={s.list}>
      {names.map(({ id, name, number }) => (
        <ContactItem
          key={id}
          name={name}
          number={number}
          onDeleteContact={() => onDeleteContact(id)}
        />
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  onDeleteContact: PropTypes.func,
  names: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired,
  ),
};

export default ContactList;
