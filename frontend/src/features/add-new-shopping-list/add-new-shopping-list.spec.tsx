import { render, screen } from '@testing-library/react';
import AddNewShoppingList from './add-new-shopping-list';

test('renders AddNewShoppingList component', () => {
  render(<AddNewShoppingList />);
  expect(screen.getByText(/add item/i)).toBeInTheDocument();
});
