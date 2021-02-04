import { useDispatch, useSelector } from 'react-redux';
import { authSelectors, authOperations } from 'redux/auth';
import defaultAvatar from 'images/default-avatar.jpg';
import { ReactComponent as LogOutIcon } from 'icons/logout.svg';

import s from './UserMenu.module.css';

export default function UserMenu() {
  const dispatch = useDispatch();
  const name = useSelector(authSelectors.getUserName);
  const avatar = defaultAvatar;

  return (
    <div className={s.container}>
      <img src={avatar} alt="avatar" width="32" className={s.avatar} />
      <span className={s.name}>Welcom, {name}</span>
      <button
        className={s.button}
        type="button"
        onClick={() => dispatch(authOperations.logOut())}
      >
        <LogOutIcon />
      </button>
    </div>
  );
}
