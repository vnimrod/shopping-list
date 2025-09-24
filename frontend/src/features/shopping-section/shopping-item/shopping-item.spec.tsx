import { render, screen } from '@testing-library/react';
import ShoppingItem from './shopping-item';

test('renders ShoppingItem component', () => {
  render(
    <ShoppingItem
      product={{
        id: 1,
        name: 'Milk',
        quantity: 1,
        purchased: false,
        category: 'Dairy',
      }}
      removeItem={() => {}}
      updateQuantity={() => {}}
      addCategoryAboveItem={() => {}}
      updateCategory={() => {}}
      allCategories={[]}
    />
  );
  expect(screen.getByText(/add item/i)).toBeInTheDocument();
});
