import React from 'react';
import styles from './drawer.module.scss';
import cn from 'classnames';

const Drawer = ({ open, onClose }: { open: boolean; onClose?: () => void }) => {
  return (
    <>
      {open && <div className={styles.backdrop} onClick={onClose} />}
      <div className={cn(styles.Drawer, { [styles.open]: open })}>
        <div>LOGO</div>
        <div>MY LISTS / הרשימות שלי</div>
        <div>Grocery Lists / רשימת מוצרים</div>
        <div>favorites / מועדפים</div>
      </div>
    </>
  );
};

export default Drawer;
