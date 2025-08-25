import React from 'react';
import styles from './drawer.module.scss';
import cn from 'classnames';

const Drawer = ({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose?: () => void;
  children: any;
}) => {
  return (
    <>
      {open && <div className={styles.backdrop} onClick={onClose} />}

      <div className={cn(styles.Drawer, { [styles.open]: open })}>
        {children}
      </div>
    </>
  );
};

export default Drawer;
