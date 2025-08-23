import { render, screen } from '@testing-library/react';
import ShoppingSection from './shopping-section';

test('renders ShoppingSection component', () => {
  render(<ShoppingSection />);
  expect(screen.getByText(/add item/i)).toBeInTheDocument();
});
