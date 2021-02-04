import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import * as contactsActions from './contacts-actions';
import {
  fetchContacts,
  addContact,
  deleteContact,
} from './contacts-operations';

const filter = createReducer('', {
  [contactsActions.changeFilter]: (_, { payload }) => payload,
});

const items = createReducer([], {
  [fetchContacts.fulfilled]: (_, { payload }) => payload,
  [addContact.fulfilled]: (state, { payload }) => [...state, payload],
  [deleteContact.fulfilled]: (state, { payload }) =>
    state.filter(contact => contact.id !== payload),
});

const isLoading = createReducer(false, {
  [fetchContacts.pending]: () => true,
  [fetchContacts.fulfilled]: () => false,
  [fetchContacts.rejected]: () => false,

  [addContact.pending]: () => true,
  [addContact.fulfilled]: () => false,
  [addContact.rejected]: () => false,

  [deleteContact.pending]: () => true,
  [deleteContact.fulfilled]: () => false,
  [deleteContact.rejected]: () => false,
});

const error = createReducer(null, {
  [fetchContacts.rejected]: () => (_, action) => action.payload,
  [fetchContacts.pending]: () => null,

  [addContact.rejected]: (_, action) => action.payload,
  [addContact.pending]: () => null,

  [deleteContact.rejected]: (_, action) => action.payload,
  [deleteContact.pending]: () => null,
});

export default combineReducers({
  items,
  filter,
  isLoading,
  error,
});

// const items = createReducer([], {
//   [contactsActions.fetchContactsSuccess]: (_, { payload }) => payload,
//   [contactsActions.addContactSuccess]: (state, { payload }) => [
//     ...state,
//     payload,
//   ],
//   [contactsActions.deletContactSuccess]: (state, { payload }) =>
//     state.filter(contact => contact.id !== payload),
// });

// const isLoading = createReducer(false, {
//   [contactsActions.fetchContactsRequest]: () => true,
//   [contactsActions.fetchContactsSuccess]: () => false,
//   [contactsActions.fetchContactsError]: () => false,
//   [contactsActions.addContactRequest]: () => true,
//   [contactsActions.addContactSuccess]: () => false,
//   [contactsActions.addContactError]: () => false,
//   [contactsActions.deletContactRequest]: () => true,
//   [contactsActions.deletContactSuccess]: () => false,
//   [contactsActions.deletContactError]: () => false,
// });

// const error = createReducer(null, {
//   [contactsActions.fetchContactsError]: () => (_, action) => action.payload,
//   [contactsActions.fetchContactsRequest]: () => null,
// });
