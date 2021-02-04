import { createSlice } from '@reduxjs/toolkit';
import authOperations from './auth-operations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isFetchingCurrentUser: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [authOperations.register.fulfilled](state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
      state.error = payload.error;
    },
    [authOperations.register.pending](state) {
      state.error = null;
    },
    [authOperations.register.rejected](state, { payload }) {
      state.error = payload;
    },

    [authOperations.logIn.fulfilled](state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
    },
    [authOperations.logIn.pending](state) {
      state.error = null;
    },
    [authOperations.logIn.rejected](state, { payload }) {
      state.error = payload;
    },

    [authOperations.logOut.fulfilled](state, action) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    },
    [authOperations.logOut.pending](state) {
      state.error = null;
    },
    [authOperations.logOut.rejected](state, { payload }) {
      state.error = payload;
    },

    [authOperations.fetchCurrentUser.pending](state) {
      state.isFetchingCurrentUser = true;

      state.error = null;
    },
    [authOperations.fetchCurrentUser.fulfilled](state, { payload }) {
      state.user = payload;
      state.isLoggedIn = true;
      state.isFetchingCurrentUser = false;
    },
    [authOperations.fetchCurrentUser.rejected](state, { payload }) {
      state.isFetchingCurrentUser = false;
      state.error = payload;
    },
  },
});

export default authSlice.reducer;
