import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import InputMask from 'react-input-mask';
import { getContacts } from 'redux/contacts/contacts-selectors';
import { addContact } from 'redux/contacts/contacts-operations';

import s from './ContactForm.module.css';
import PropTypes from 'prop-types';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = data => {
    const { name, number } = data;
    // e.preventDefault();

    if (checkName(name)) {
      return alert(`${name} is already in contacts`);
    } else if (checkNumber(number)) {
      return alert(`${number} is already in contacts`);
    } else {
      dispatch(addContact(data));

      resetInputForm();
    }
  };

  const resetInputForm = () => {
    setName('');
    setNumber('');
  };

  const checkName = name => {
    return contacts.some(
      contact =>
        contact.name.toLowerCase().trim() === name.toLowerCase().trim(),
    );
  };

  const checkNumber = number => {
    return contacts.find(contact => contact.number === number);
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <label className={s.label}>
        Name
        <input
          ref={register({
            required: true,
            minLength: 3,
            maxLength: 15,
          })}
          type="text"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        {errors.name && (
          <p className={s.errorText}>
            Name must be at least 3 characters and maximum 15 characters
          </p>
        )}
      </label>
      <label className={s.label}>
        Number
        <InputMask
          ref={register({
            required: true,
            pattern: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){12}(\s*)?$/,
          })}
          type="tel"
          name="number"
          value={number}
          onChange={e => setNumber(e.target.value)}
          mask="+3 8(099) 999-99-99"
        />
        {errors.number && (
          <p className={s.errorText}>It must be a 12-character number</p>
        )}
      </label>
      <button className={s.button} type="submit">
        Add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  addContact: PropTypes.func,
  contacts: PropTypes.object,
};
