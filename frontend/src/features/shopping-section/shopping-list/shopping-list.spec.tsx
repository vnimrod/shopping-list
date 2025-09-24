import { render, screen } from '@testing-library/react';
import ShoppingList from './shopping-list';

test('renders ShoppingList component', () => {
  render(
    <ShoppingList
      shoppingList={[]}
      addNewItem={() => {}}
      removeItem={() => {}}
      updateQuantity={() => {}}
      addNewCategory={() => {}}
      addCategoryAboveItem={() => {}}
      updateCategory={() => {}}
    />
  );
  expect(screen.getByText(/add item/i)).toBeInTheDocument();
});
