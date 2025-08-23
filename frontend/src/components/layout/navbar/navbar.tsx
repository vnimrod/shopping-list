import React from 'react';
import { language } from '../../../services/language';
import styles from './navbar.module.scss';

const Navbar = () => {
  return (
    <div className={styles.Navbar}>
      <div className={styles.NavbarLeft}>
        <div>LOGO</div>
      </div>

      <div className={styles.NavbarRight}>
        <div>
          <div>Login/התחבר</div>

          <div>userName</div>
        </div>

        <div>
          {' '}
          {/* will be replaced with component */}
          <button onClick={() => language.setLanguage('en-us')}>english</button>
          <button onClick={() => language.setLanguage('he-il')}>hebrew</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
