import { render, screen } from '@testing-library/react';
import ShoppingList from './shopping-list';

test('renders ShoppingList component', () => {
  render(<ShoppingList />);
  expect(screen.getByText(/add item/i)).toBeInTheDocument();
});
