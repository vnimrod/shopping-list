import React from 'react';
import ShoppingList from './shopping-list/shopping-list';
import styles from './shopping-section.module.scss';

const ShoppingSection = () => {
  return (
    <div className={styles.ShoppingSection}>
      <ShoppingList></ShoppingList>
    </div>
  );
};

export default ShoppingSection;
