import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authOperations } from 'redux/auth';
import { useForm } from 'react-hook-form';
import s from './RegisterView.module.css';

export default function RegisterView() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, handleSubmit, errors } = useForm();

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        return setName(value);
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };

  const onSubmit = data => {
    const { name, email, password } = data;
    dispatch(authOperations.register({ name, email, password }));
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
          onChange={handleChange}
        />
        {errors.name && (
          <p className={s.errorText}>
            Name must be at least 3 characters and maximum 15 characters
          </p>
        )}
      </label>
      <label className={s.label}>
        Email
        <input
          ref={register({
            required: true,
          })}
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
      </label>
      <label className={s.label}>
        Password
        <input
          ref={register({
            required: true,
            minLength: 7,
            maxLength: 20,
          })}
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        {errors.password && (
          <p className={s.errorText}>
            Password must contain at least 7 characters
          </p>
        )}
      </label>
      <button className={s.button}>Registration</button>
    </form>
  );
}
