import React from 'react';

import s from './HomeView.module.css';

const HomeView = () => (
  <div className={s.container}>
    <h1 className={s.title}>
      You have entered the phone book application. Please register or log in
      <span role="img" aria-label="Иконка приветствия">
        💁‍♀️
      </span>
    </h1>
  </div>
);

export default HomeView;
