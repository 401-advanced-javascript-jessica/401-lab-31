import React from 'react';
import Login from '../auth/login';

import styles from './header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <Login />
    </header>
  );
};

export default Header;
