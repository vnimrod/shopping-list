import React from 'react';
import styles from './layout.module.scss';
import Navbar from './navbar/navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar></Navbar>
      <main className={styles.Layout}>{children}</main>;
    </>
  );
};

export default Layout;
