import React from 'react';
import styles from './layout.module.scss';
import Navbar from './navbar/navbar';
import groceryImage from '../../assets/images/grocery-main-page.png';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.Layout}>
      <Navbar></Navbar>
      <div className={styles.MainBackground} />
      <img className={styles.GroceryImage} src={groceryImage} alt="grocery-main-page" />
      <main className={styles.Layout}>{children}</main>;
    </div>
  );
};

export default Layout;
