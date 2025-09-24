import React, { useState, useEffect } from 'react';
import ShoppingList from './shopping-list/shopping-list';
import styles from './shopping-section.module.scss';
import * as _ from 'lodash';

const ShoppingSection = () => {
  const [shoppingList, setShoppingList] = useState<
    {
      id: number;
      name: string;
      quantity: number;
      purchased: boolean;
      category?: string;
      isCategoryHeader?: boolean;
      createdAt?: string;
      updatedAt?: string;
    }[]
  >([
    // General category header
    {
      id: 1,
      name: 'General',
      quantity: 0,
      purchased: false,
      category: 'General',
      isCategoryHeader: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    // Items under General category
    { id: 2, name: 'חלב', quantity: 1, purchased: false, category: 'מקרר', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 3, name: 'לחם', quantity: 2, purchased: true, category: 'קשים', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 4, name: 'ביצים', quantity: 12, purchased: false, category: 'מקרר', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 5, name: 'גבינץ', quantity: 1, purchased: false, category: 'מקרר', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 6, name: 'עגבניות', quantity: 6, purchased: false, category: 'פירות וירקות', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 7, name: 'מלפפון', quantity: 3, purchased: true, category: 'פירות וירקות', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 8, name: 'חזה עוף', quantity: 2, purchased: false, category: 'מקפיא', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 9, name: 'אורז', quantity: 1, purchased: false, category: 'קשים', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 10, name: 'פסטה', quantity: 2, purchased: false, category: 'קשים', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 11, name: 'טונה', quantity: 1, purchased: false, category: 'קשים', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  ]);

  // Function to organize items by categories
  const organizeItemsByCategories = (items: typeof shoppingList) => {
    const organizedItems: typeof shoppingList = [];
    const categoryMap = new Map<string, typeof shoppingList>();
    
    // Group items by category
    items.forEach(item => {
      if (item.isCategoryHeader) {
        // Keep category headers as is
        if (!categoryMap.has(item.category || '')) {
          categoryMap.set(item.category || '', []);
        }
        categoryMap.get(item.category || '')!.unshift(item); // Add header at the beginning
      } else {
        // Only process items that have a category (not empty or undefined)
        const itemCategory = item.category && item.category.trim() ? item.category : 'General';
        
        if (!categoryMap.has(itemCategory)) {
          categoryMap.set(itemCategory, []);
        }
        categoryMap.get(itemCategory)!.push(item);
      }
    });
    
    // Create category headers for categories that don't have them (except General)
    categoryMap.forEach((categoryItems, categoryName) => {
      const hasHeader = categoryItems.some(item => item.isCategoryHeader);
      if (!hasHeader && categoryName !== 'General') {
        const header = {
          id: Date.now() + Math.random(),
          name: categoryName,
          quantity: 0,
          purchased: false,
          category: categoryName,
          isCategoryHeader: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        categoryItems.unshift(header);
      }
    });
    
    // Sort categories: non-General first, then General (only if General has items)
    const sortedCategories = Array.from(categoryMap.entries()).sort(([a], [b]) => {
      if (a === 'General') return 1;
      if (b === 'General') return -1;
      return a.localeCompare(b);
    });
    
    // Flatten the organized structure, but only include General if it has items
    sortedCategories.forEach(([categoryName, items]) => {
      // Only add General category if it has items (not just the header)
      if (categoryName === 'General') {
        const hasItems = items.some(item => !item.isCategoryHeader);
        if (hasItems) {
          organizedItems.push(...items);
        }
      } else {
        // Add all other categories
        organizedItems.push(...items);
      }
    });
    
    return organizedItems;
  };

  // Apply organization on component mount and when shoppingList changes
  useEffect(() => {
    const organized = organizeItemsByCategories(shoppingList);
    if (JSON.stringify(organized) !== JSON.stringify(shoppingList)) {
      setShoppingList(organized);
    }
  }, []);

  const moveItemToCategory = (itemId: number, categoryName: string) => {
    const itemIndex = shoppingList.findIndex((item) => item.id === itemId);
    if (itemIndex === -1) return;

    const categoryIndex = findCategoryPosition(categoryName);
    const now = new Date().toISOString();
    
    if (categoryIndex !== -1) {
      // Category exists - move item to that category
      const item = shoppingList[itemIndex];
      const existingCategory = shoppingList[categoryIndex];
      const updatedItem = { 
        ...item, 
        category: existingCategory.name, // Use the original category name from existing category
        updatedAt: now
      };
      
      // Remove the item from its current position
      const newList = shoppingList.filter((_, index) => index !== itemIndex);
      
      // Find the position after the category header
      const categoryPosition = newList.findIndex(
        (listItem) => listItem.isCategoryHeader && listItem.name === existingCategory.name
      );
      
      // Insert the item right after the category header
      newList.splice(categoryPosition + 1, 0, updatedItem);
      setShoppingList(newList);
    } else {
      // Category doesn't exist - create new category above General and move item
      const item = shoppingList[itemIndex];
      const updatedItem = { 
        ...item, 
        category: categoryName,
        updatedAt: now
      };
      
      const categoryItem = {
        id: Date.now(),
        name: categoryName,
        quantity: 0,
        purchased: false,
        category: categoryName,
        isCategoryHeader: true,
        createdAt: now,
        updatedAt: now,
      };

      // Remove the item from its current position
      const newList = shoppingList.filter((_, index) => index !== itemIndex);
      
      // Find General category position to place new category above it
      const generalIndex = newList.findIndex(
        (listItem) => listItem.isCategoryHeader && listItem.name === 'General'
      );
      
      if (generalIndex !== -1) {
        // Insert category and item above General
        newList.splice(generalIndex, 0, categoryItem, updatedItem);
      } else {
        // Fallback - add at the beginning
        newList.unshift(categoryItem, updatedItem);
      }
      
      setShoppingList(newList);
    }
  };

  const addItemToCategory = (itemName: string, categoryName: string) => {
    const categoryIndex = findCategoryPosition(categoryName);
    const now = new Date().toISOString();
    
    if (categoryIndex !== -1) {
      // Category exists - add item after the category header
      const newItem = {
        id: Date.now(),
        name: itemName,
        quantity: 1,
        purchased: false,
        category: categoryName,
        createdAt: now,
        updatedAt: now,
      };
      
      const newList = [...shoppingList];
      newList.splice(categoryIndex + 1, 0, newItem);
      setShoppingList(newList);
    } else {
      // Category doesn't exist - add to General or create General
      addNewItem(itemName, 'General');
    }
  };

  const addNewItem = (itemName: string, category: string = 'General') => {
    const now = new Date().toISOString();
    const generalCategoryExists = findCategoryPosition('General') !== -1;
    
    if (!generalCategoryExists && category === 'General') {
      // Add General category first, then the item
      const generalCategory = {
        id: Date.now(),
        name: 'General',
        quantity: 0,
        purchased: false,
        category: 'General',
        isCategoryHeader: true,
        createdAt: now,
        updatedAt: now,
      };
      
      setShoppingList(() => [
        ...shoppingList,
        generalCategory,
        {
          id: Date.now() + 1,
          name: itemName,
          quantity: 1,
          purchased: false,
          category: category,
          createdAt: now,
          updatedAt: now,
        },
      ]);
    } else {
      // Add item normally - find General category and add after it
      const generalIndex = findCategoryPosition('General');
      if (generalIndex !== -1) {
        const newItem = {
          id: Date.now(),
          name: itemName,
          quantity: 1,
          purchased: false,
          category: category,
          createdAt: now,
          updatedAt: now,
        };
        
        const newList = [...shoppingList];
        newList.splice(generalIndex + 1, 0, newItem);
        setShoppingList(newList);
      } else {
        // Fallback - add to end
        setShoppingList(() => [
          ...shoppingList,
          {
            id: Date.now(),
            name: itemName,
            quantity: 1,
            purchased: false,
            category: category,
            createdAt: now,
            updatedAt: now,
          },
        ]);
      }
    }
  };

  const removeItem = (itemId: number) => {
    setShoppingList(shoppingList.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: number, newQuantity: number) => {
    setShoppingList(
      shoppingList.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, newQuantity), updatedAt: new Date().toISOString() }
          : item
      )
    );
  };

  const addNewCategory = (categoryName: string) => {
    const normalizedCategoryName = normalizeCategoryName(categoryName);
    const existingCategoryIndex = findCategoryPosition(categoryName);
    
    if (existingCategoryIndex !== -1) {
      // Category already exists with normalized name - don't create duplicate
      return;
    }
    
    const now = new Date().toISOString();
    // Add a category header item
    const categoryItem = {
      id: Date.now(), // Use timestamp for unique ID
      name: categoryName,
      quantity: 0,
      purchased: false,
      category: categoryName,
      isCategoryHeader: true,
      createdAt: now,
      updatedAt: now,
    };
    
    // Find General category position to place new category above it
    const generalIndex = shoppingList.findIndex(
      (listItem) => listItem.isCategoryHeader && listItem.name === 'General'
    );
    
    if (generalIndex !== -1) {
      // Insert category above General
      const newList = [...shoppingList];
      newList.splice(generalIndex, 0, categoryItem);
      setShoppingList(newList);
    } else {
      // Fallback - add at the beginning
      setShoppingList([categoryItem, ...shoppingList]);
    }
  };

  const normalizeCategoryName = (categoryName: string): string => {
    return categoryName
      .toLowerCase()
      .trim()
      .replace(/\s+/g, ' '); // Replace multiple spaces with single space
  };

  const findCategoryPosition = (categoryName: string): number => {
    const normalizedName = normalizeCategoryName(categoryName);
    const categoryIndex = shoppingList.findIndex(
      (item) => item.isCategoryHeader && normalizeCategoryName(item.name) === normalizedName
    );
    return categoryIndex;
  };

  const addCategoryAboveItem = (itemId: number, categoryName: string) => {
    const itemIndex = shoppingList.findIndex((item) => item.id === itemId);
    if (itemIndex === -1) return;

    const normalizedCategoryName = normalizeCategoryName(categoryName);
    const existingCategoryIndex = findCategoryPosition(categoryName);
    const now = new Date().toISOString();
    
    if (existingCategoryIndex !== -1) {
      // Category exists - move ONLY this specific item to the beginning of that category
      const item = shoppingList[itemIndex];
      const existingCategory = shoppingList[existingCategoryIndex];
      const updatedItem = { 
        ...item, 
        category: existingCategory.name, // Use the original category name from existing category
        updatedAt: now
      };
      
      // Remove the item from its current position
      const newList = shoppingList.filter((_, index) => index !== itemIndex);
      
      // Find the position after the category header
      const categoryPosition = newList.findIndex(
        (listItem) => listItem.isCategoryHeader && listItem.name === existingCategory.name
      );
      
      // Insert the item right after the category header
      newList.splice(categoryPosition + 1, 0, updatedItem);
      setShoppingList(newList);
    } else {
      // Category doesn't exist - create new category and move ONLY this item
      const item = shoppingList[itemIndex];
      const updatedItem = { 
        ...item, 
        category: categoryName,
        updatedAt: now
      };
      
      const categoryItem = {
        id: Date.now(),
        name: categoryName,
        quantity: 0,
        purchased: false,
        category: categoryName,
        isCategoryHeader: true,
        createdAt: now,
        updatedAt: now,
      };

      // Remove the item from its current position
      const newList = shoppingList.filter((_, index) => index !== itemIndex);
      
      // Find General category position to place new category above it
      const generalIndex = newList.findIndex(
        (listItem) => listItem.isCategoryHeader && listItem.name === 'General'
      );
      
      if (generalIndex !== -1) {
        // Insert category and item above General
        newList.splice(generalIndex, 0, categoryItem, updatedItem);
      } else {
        // Fallback - add at the beginning
        newList.unshift(categoryItem, updatedItem);
      }
      
      setShoppingList(newList);
    }
  };

  const updateCategory = (categoryId: number, newCategoryName: string) => {
    setShoppingList(
      shoppingList.map((item) =>
        item.id === categoryId && item.isCategoryHeader
          ? { ...item, name: newCategoryName, category: newCategoryName, updatedAt: new Date().toISOString() }
          : item
      )
    );
  };

  return (
    <div className={styles.ShoppingSection}>
      <div className={styles.ShoppingList}>
        {shoppingList.map((item) => (
          /*will be removed and replaced by server response*/
          <ShoppingList
            key={item.id}
            shoppingList={shoppingList}
            addNewItem={addNewItem}
            removeItem={removeItem}
            updateQuantity={updateQuantity}
            addNewCategory={addNewCategory}
            addCategoryAboveItem={addCategoryAboveItem}
            updateCategory={updateCategory}
          ></ShoppingList>
        ))}
      </div>
    </div>
  );
};

export default ShoppingSection;
