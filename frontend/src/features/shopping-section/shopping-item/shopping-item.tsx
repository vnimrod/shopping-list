import React, { useState } from 'react';
import styles from './shopping-item.module.scss';

const ShoppingItem = ({ 
  product, 
  removeItem,
  updateQuantity,
  addCategoryAboveItem,
  updateCategory,
  allCategories
}: { 
  product: { id: number; name: string; quantity: number; purchased: boolean; category?: string; isCategoryHeader?: boolean };
  removeItem: (itemId: number) => void;
  updateQuantity: (itemId: number, newQuantity: number) => void;
  addCategoryAboveItem: (itemId: number, categoryName: string) => void;
  updateCategory: (categoryId: number, newCategoryName: string) => void;
  allCategories: string[];
}) => {
  const [isEditingQuantity, setIsEditingQuantity] = useState(false);
  const [tempQuantity, setTempQuantity] = useState(product.quantity.toString());
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [tempCategoryName, setTempCategoryName] = useState(product.name);
  const [categorySuggestions, setCategorySuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

  const handleRemove = () => {
    removeItem(product.id);
  };

  const handleQuantityClick = () => {
    setIsEditingQuantity(true);
    setTempQuantity(product.quantity.toString());
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempQuantity(event.target.value);
  };

  const handleQuantitySubmit = () => {
    const newQuantity = parseInt(tempQuantity);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      updateQuantity(product.id, newQuantity);
    }
    setIsEditingQuantity(false);
  };

  const handleQuantityKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleQuantitySubmit();
    } else if (event.key === 'Escape') {
      setIsEditingQuantity(false);
      setTempQuantity(product.quantity.toString());
    }
  };

  const handleQuantityBlur = () => {
    handleQuantitySubmit();
  };

  const handleAddCategoryClick = () => {
    setShowAddCategory(true);
    setNewCategoryName('');
  };

  const handleCategorySubmit = () => {
    if (newCategoryName.trim()) {
      addCategoryAboveItem(product.id, newCategoryName.trim());
      setNewCategoryName('');
      setShowAddCategory(false);
    }
  };

  const handleCategoryKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (selectedSuggestionIndex >= 0 && categorySuggestions[selectedSuggestionIndex]) {
        // Select the highlighted suggestion
        const selectedCategory = categorySuggestions[selectedSuggestionIndex];
        setNewCategoryName(selectedCategory);
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
      } else {
        handleCategorySubmit();
      }
    } else if (event.key === 'Escape') {
      setShowAddCategory(false);
      setNewCategoryName('');
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      setSelectedSuggestionIndex(prev => 
        prev < categorySuggestions.length - 1 ? prev + 1 : 0
      );
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSelectedSuggestionIndex(prev => 
        prev > 0 ? prev - 1 : categorySuggestions.length - 1
      );
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setNewCategoryName(suggestion);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
  };

  const getExistingCategories = (): string[] => {
    return allCategories;
  };

  const getCategorySuggestions = (input: string): string[] => {
    if (input.length < 1) return [];
    
    const existingCategories = getExistingCategories();
    const normalizedInput = input.toLowerCase().trim();
    
    return existingCategories.filter(category => 
      category.toLowerCase().includes(normalizedInput)
    );
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNewCategoryName(value);
    
    const suggestions = getCategorySuggestions(value);
    setCategorySuggestions(suggestions);
    setShowSuggestions(suggestions.length > 0 && value.length >= 1);
    setSelectedSuggestionIndex(-1);
  };

  const handleCategoryClick = () => {
    setIsEditingCategory(true);
    setTempCategoryName(product.name);
  };

  const handleCategoryNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempCategoryName(event.target.value);
  };

  const handleCategoryNameSubmit = () => {
    if (tempCategoryName.trim()) {
      updateCategory(product.id, tempCategoryName.trim());
    }
    setIsEditingCategory(false);
  };

  const handleCategoryNameKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleCategoryNameSubmit();
    } else if (event.key === 'Escape') {
      setIsEditingCategory(false);
      setTempCategoryName(product.name);
    }
  };

  const handleCategoryNameBlur = () => {
    handleCategoryNameSubmit();
  };

  // If it's a category header, render differently
  if (product.isCategoryHeader) {
    return (
      <li className={styles.CategoryHeader}>
        {isEditingCategory ? (
          <input
            type="text"
            value={tempCategoryName}
            onChange={handleCategoryNameChange}
            onKeyDown={handleCategoryNameKeyDown}
            onBlur={handleCategoryNameBlur}
            className={styles.CategoryNameInput}
            autoFocus
          />
        ) : (
          <span 
            className={styles.CategoryName}
            onClick={handleCategoryClick}
            title="edit category name"
          >
            {product.name}
          </span>
        )}
        <button 
          className={styles.RemoveButton} 
          onClick={handleRemove}
          title="Remove category"
        >
          ×
        </button>
      </li>
    );
  }

  return (
    <>
      <li className={styles.ShoppingItem}>
        <span className={styles.ItemName}>{product.name}</span>
        {isEditingQuantity ? (
          <input
            type="number"
            value={tempQuantity}
            onChange={handleQuantityChange}
            onKeyDown={handleQuantityKeyDown}
            onBlur={handleQuantityBlur}
            className={styles.QuantityInput}
            min="1"
            autoFocus
          />
        ) : (
          <span 
            className={styles.ItemQuantity} 
            onClick={handleQuantityClick}
            title="edit quantity"
          >
            {product.quantity}
          </span>
        )}
        <div className={styles.ItemActions}>
          <button 
            className={styles.AddCategoryButton} 
            onClick={handleAddCategoryClick}
            title="Add To Category"
          >
            + Category
          </button>
          <button 
            className={styles.RemoveButton} 
            onClick={handleRemove}
            title="Remove item"
          >
            ×
          </button>
        </div>
      </li>
      {showAddCategory && (
        <li className={styles.AddCategoryItem}>
          <div className={styles.CategoryInputContainer}>
            <input
              type="text"
              placeholder="Category name"
              value={newCategoryName}
              onChange={handleCategoryChange}
              onKeyDown={handleCategoryKeyDown}
              onBlur={() => {
                // Delay hiding suggestions to allow click events
                setTimeout(() => {
                  setShowSuggestions(false);
                  setSelectedSuggestionIndex(-1);
                }, 150);
              }}
              className={styles.CategoryInput}
              autoFocus
            />
            {showSuggestions && categorySuggestions.length > 0 && (
              <ul className={styles.SuggestionsList}>
                {categorySuggestions.map((suggestion, index) => (
                  <li
                    key={suggestion}
                    className={`${styles.SuggestionItem} ${
                      index === selectedSuggestionIndex ? styles.SuggestionItemSelected : ''
                    }`}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>
      )}
    </>
  );
};

export default ShoppingItem;
