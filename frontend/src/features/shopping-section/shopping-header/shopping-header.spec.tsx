import { render, screen } from '@testing-library/react';
import ShoppingHeader from './shopping-header';

test('renders ShoppingHeader component', () => {
  render(<ShoppingHeader />);
  expect(screen.getByText(/add item/i)).toBeInTheDocument();
});
