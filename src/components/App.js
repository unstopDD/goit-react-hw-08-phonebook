import React, { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';
import { authOperations, authSelectors } from '../redux/auth';
import Loader from './Loader';
import Container from './Container';
import AppBar from './AppBar';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PhoneBookViews = lazy(() =>
  import('../views/PhoneBookViews' /* webpackChunkName: "Phone-book-views" */),
);
const HomeView = lazy(() => import('../views/HomeView'));
const LoginView = lazy(() =>
  import('../views/LoginView' /* webpackChunkName: "Login-view" */),
);
const RegisterView = lazy(() =>
  import('../views/RegisterView' /* webpackChunkName: "Register-view" */),
);

export default function App() {
  const dispatch = useDispatch();
  const isFetchingCurrentUser = useSelector(authSelectors.getIsFetchingCurrent);

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);

  return (
    !isFetchingCurrentUser && (
      <Container>
        <AppBar />

        <Suspense fallback={<Loader />}>
          <Switch>
            <PublicRoute exact path="/">
              <HomeView />
            </PublicRoute>
            <PublicRoute path="/login" redirectTo="/contacts" restricted>
              <LoginView />
            </PublicRoute>
            <PublicRoute path="/register" redirectTo="/contacts" restricted>
              <RegisterView />
            </PublicRoute>

            <PrivateRoute path="/contacts" redirectTo="/login">
              <PhoneBookViews />
            </PrivateRoute>
          </Switch>
        </Suspense>

        <ToastContainer autoClose={3700} position="top-center" />
      </Container>
    )
  );
}
