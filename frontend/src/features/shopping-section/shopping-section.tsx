import React from 'react';
import ShoppingList from './shopping-list/shopping-list';
import AddNewItem from '../addNewItem/add-new-item';
import styles from './shopping-section.module.scss';

const ShoppingSection = () => {
  return (
    <div className={styles.ShoppingSection}>
      <AddNewItem></AddNewItem>
      <ShoppingList></ShoppingList>
    </div>
  );
};

export default ShoppingSection;
