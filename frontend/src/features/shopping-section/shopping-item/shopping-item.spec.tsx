import { render, screen } from '@testing-library/react';
import ShoppingItem from './shopping-item';

test('renders ShoppingItem component', () => {
  render(<ShoppingItem />);
  expect(screen.getByText(/add item/i)).toBeInTheDocument();
});
