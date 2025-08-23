// rafce
import React, { useState } from 'react';
import ShoppingItem from '../shopping-item';
import styles from './shopping-list.module.scss';

const ShoppingList = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Milk', quantity: 1, purchased: false },
    { id: 2, name: 'Bread', quantity: 2, purchased: true },
    { id: 3, name: 'Eggs', quantity: 12, purchased: false },
    { id: 4, name: 'Cheese', quantity: 1, purchased: false },
    { id: 5, name: 'Tomatoes', quantity: 6, purchased: false },
    { id: 6, name: 'Cucumber', quantity: 3, purchased: true },
    { id: 7, name: 'Chicken Breast', quantity: 2, purchased: false },
    { id: 8, name: 'Rice', quantity: 1, purchased: false },
    { id: 9, name: 'Pasta', quantity: 2, purchased: false },
    { id: 10, name: 'Olive Oil', quantity: 1, purchased: false },
  ]);
  return (
    <>
      <ul className={styles.ShoppingList}>
        {products.map((product) => (
          <ShoppingItem product={product}></ShoppingItem>
        ))}
      </ul>
    </>
  );
};

export default ShoppingList;
