import React from 'react';
import styles from './nav-list.module.scss';
import { language } from '../../../../services/language';
import cn from 'classnames';

const NavList = ({ isLeftDrawer }: { isLeftDrawer?: boolean }) => {
  const leftDrawerClass = isLeftDrawer && styles.LeftDrawer;

  return (
    <div className={cn(styles.NavbarList, leftDrawerClass)}>
      <div className={cn(styles.NavSection, leftDrawerClass)}>
        {isLeftDrawer && (
          <div className={styles.LeftDrawerHello}>Hello [userName]</div>
        )}
        <div className={styles.NavLeft}>
          <span>LOGO</span>

          {isLeftDrawer && (
            <div className={styles.LeftDrawer}>
              <div>MY LISTS / הרשימות שלי</div>
              <div>Grocery Lists / רשימת מוצרים</div>
              <div>favorites / מועדפים</div>
            </div>
          )}
        </div>
      </div>

      <div className={cn(styles.NavSection, leftDrawerClass)}>
        <div>
          {' '}
          {/* will be replaced with component */}
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
