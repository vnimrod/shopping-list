import React from 'react';
import cn from 'classnames';
import styles from './nav-list.module.scss';
import { language } from '../../../../services/language';
import note2cart from '../../../../assets/images/note2cart-logo.png';
import { Link } from 'react-router-dom';

const NavList = ({ isLeftDrawer }: { isLeftDrawer?: boolean }) => {
  const leftDrawerClass = isLeftDrawer && styles.LeftDrawer;

  return (
    <div className={cn(styles.NavbarList, leftDrawerClass)}>
      <div className={cn(styles.NavSection, leftDrawerClass)}>
        {isLeftDrawer && (
          <div className={styles.LeftDrawerHello}>Hello [userName]</div>
        )}

      <Link to="/">
        <img className={styles.Logo} src={note2cart} alt="grocery-main-page" />
      </Link>

        {isLeftDrawer && (
          <div className={styles.LeftDrawer}>
            <div>MY LISTS / הרשימות שלי</div>
            <div>Grocery Lists / רשימת מוצרים</div>
            <div>Favorites / מועדפים</div>
          </div>
        )}
      </div>

      <div className={cn(styles.NavSection, leftDrawerClass)}>
        <div>
          <button onClick={() => language.setLanguage('en-us')}>english</button>
          <button onClick={() => language.setLanguage('he-il')}>hebrew</button>
        </div>

        <div>
          <div>Login/התחבר</div>
          {!isLeftDrawer && <div>userName</div>}
        </div>
      </div>
    </div>
  );
};

export default NavList;
