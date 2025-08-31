import React from 'react';
import styles from './add-new-shopping-list.module.scss';
import { Link } from 'react-router-dom';

const AddNewShoppingList = () => {
  return (
    <div className={styles.AddNewShoppingList}>
      <Link to="/lists/add">
        <span className={styles.btnPrimary}>Add New List +</span>
      </Link>
    </div>
  );
};

export default AddNewShoppingList;
