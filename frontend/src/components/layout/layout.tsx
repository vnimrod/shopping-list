import React from 'react';
import styles from './layout.module.scss';
import Navbar from './navbar/navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.Layout}>
      <Navbar></Navbar>
      <main className={styles.Layout}>{children}</main>;
    </div>
  );
};

export default Layout;
