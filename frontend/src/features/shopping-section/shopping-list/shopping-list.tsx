// rafce
import React, { useState } from 'react';
import ShoppingItem from '../shopping-item';
import styles from './shopping-list.module.scss';

const ShoppingList = ({
  shoppingList,
  addNewItem,
  removeItem,
  updateQuantity,
  addNewCategory,
  addCategoryAboveItem,
  updateCategory,
}: {
  shoppingList: { id: number; name: string; quantity: number; purchased: boolean; category?: string; isCategoryHeader?: boolean }[];
  addNewItem: (itemName: string, category?: string) => void;
  removeItem: (itemId: number) => void;
  updateQuantity: (itemId: number, newQuantity: number) => void;
  addNewCategory: (categoryName: string) => void;
  addCategoryAboveItem: (itemId: number, categoryName: string) => void;
  updateCategory: (categoryId: number, newCategoryName: string) => void;
}) => {
  const [isEnterNewItem, setIsEnterNewItem] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [isEnterNewCategory, setIsEnterNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const toggleNewItemInput = (): void => {
    setIsEnterNewItem(!isEnterNewItem);
  };

  const toggleNewCategoryInput = (): void => {
    setIsEnterNewCategory(!isEnterNewCategory);
  };

  const onAddNewItem = (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>): void => {
    if (newItemName.trim()) {
      addNewItem(newItemName.trim());
      setNewItemName(''); // Clear the input after adding
      toggleNewItemInput(); // Hide the input after adding
    }
  };

  const onAddNewCategory = (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>): void => {
    if (newCategoryName.trim()) {
      addNewCategory(newCategoryName.trim());
      setNewCategoryName(''); // Clear the input after adding
      toggleNewCategoryInput(); // Hide the input after adding
    }
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNewItemName(event.target.value);
  };

  const onCategoryInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNewCategoryName(event.target.value);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter' && newItemName.trim()) {
      onAddNewItem(event);
    }
  };

  const onCategoryKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter' && newCategoryName.trim()) {
      onAddNewCategory(event);
    }
  };

  // Get all existing categories
  const getAllCategories = (): string[] => {
    return shoppingList
      .filter(item => item.isCategoryHeader)
      .map(item => item.name);
  };

  return (
    <>
      <div className={styles.ListContainer}>
        <div className={styles.AddButtons}>
          <button className={styles.btnPrimary} onClick={toggleNewItemInput}>
            <span className={styles.text}>New Item +</span>
          </button>
          <button className={styles.btnPrimary} onClick={toggleNewCategoryInput}>
            <span className={styles.text}>New Category +</span>
          </button>
        </div>
        <ul className={styles.ShoppingList}>
          {shoppingList.map((product) => (
            <ShoppingItem 
              key={product.id} 
              product={product} 
              removeItem={removeItem}
              updateQuantity={updateQuantity}
              addCategoryAboveItem={addCategoryAboveItem}
              updateCategory={updateCategory}
              allCategories={getAllCategories()}
            ></ShoppingItem>
          ))}
          {isEnterNewItem && (
            <div className={styles.AddNewItem}>
              <input 
                type="text" 
                placeholder="Add New Item"
                value={newItemName}
                onChange={onInputChange}
                onKeyDown={onKeyDown}
                autoFocus
              />
              <button className={styles.btnPrimary} onClick={onAddNewItem}>
                <span className={styles.text}>Add</span>
              </button>
            </div>
          )}
          {isEnterNewCategory && (
            <div className={styles.AddNewItem}>
              <input 
                type="text" 
                placeholder="Add New Category"
                value={newCategoryName}
                onChange={onCategoryInputChange}
                onKeyDown={onCategoryKeyDown}
                autoFocus
              />
              <button className={styles.btnPrimary} onClick={onAddNewCategory}>
                <span className={styles.text}>Add</span>
              </button>
            </div>
          )}
        </ul>
      </div>
    </>
  );
};

export default ShoppingList;
