import React, { useState } from 'react';
import styles from './navbar.module.scss';
import NavList from './nav-list';
import Drawer from '../drawer';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.Navbar}>
      <div className={styles.TopNav}>
        <NavList></NavList>
      </div>

      <div className={styles.LeftDrawer}>
        <button onClick={() => setOpen(true)}>☰</button>
        <Drawer open={open} onClose={() => setOpen(false)}>
          <NavList></NavList>
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;
