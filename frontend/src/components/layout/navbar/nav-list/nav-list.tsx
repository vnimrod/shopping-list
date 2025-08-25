import React from 'react';
import styles from './nav-list.module.scss';
import { language } from '../../../../services/language';

const NavList = () => {
  return (
    <div className={styles.NavbarList}>
      <div className={styles.NavSection}>
        <div>LOGO</div>

        <div>MY LISTS / הרשימות שלי</div>
        <div>Grocery Lists / רשימת מוצרים</div>
        <div>favorites / מועדפים</div>
      </div>

      <div className={styles.NavSection}>
        <div>
          {' '}
          {/* will be replaced with component */}
          <button onClick={() => language.setLanguage('en-us')}>english</button>
          <button onClick={() => language.setLanguage('he-il')}>hebrew</button>
        </div>

        <div>
          <div>Login/התחבר</div>

          <div>userName</div>
        </div>
      </div>
    </div>
  );
};

export default NavList;
