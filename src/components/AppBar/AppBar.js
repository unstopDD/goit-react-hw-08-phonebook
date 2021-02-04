import Navigation from '../Navigation';
import UserMenu from '../UserMenu';
import AuthNav from '../AuthNav';
import { authSelectors } from 'redux/auth';
import { useSelector } from 'react-redux';

import s from './AppBar.module.css';

export default function AppBar() {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return (
    <header className={s.header}>
      <Navigation />

      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
}
