import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { authOperations } from 'redux/auth';
import { toast } from 'react-toastify';

import s from './LoginView.module.css';

export default function LoginView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const onSubmit = ({ email, password }) => {
    if (email.trim() === '' || password.trim() === '') {
      return toast.error('Please fill in all fields!');
    }
    dispatch(authOperations.logIn({ email, password }));
    setEmail('');
    setPassword('');
  };

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'email':
        setEmail(value);
        break;

      case 'password':
        setPassword(value);
        break;

      default:
        return;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className={s.label}>
        Email
        <input
          ref={register({ required: true })}
          type="text"
          name="email"
          value={email}
          onChange={handleChange}
          autoComplete="off"
        />
      </label>
      <label className={s.label}>
        Password
        <input
          ref={register}
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          autoComplete="off"
        />
      </label>
      <button className={s.button}>Login</button>
    </form>
  );
}
