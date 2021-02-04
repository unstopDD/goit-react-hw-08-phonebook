import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as DeleteContact } from 'icons/delete.svg';
import s from './ContactItem.module.css';

const ContactItem = ({ name, number, onDeleteContact }) => {
  return (
    <li className={s.item}>
      <p className={s.text}>
        {name}: {number}
        <button
          className={s.button}
          type="button"
          onClick={onDeleteContact}
          aria-label="delete contact"
        >
          <DeleteContact width="36" height="36" />
        </button>
      </p>
    </li>
  );
};

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactItem;
