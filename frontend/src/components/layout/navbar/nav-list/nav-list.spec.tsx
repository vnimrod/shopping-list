import { render, screen } from '@testing-library/react';
import NavList from './nav-list';

test('renders NavList component', () => {
  render(<NavList />);
  expect(screen.getByText(/add item/i)).toBeInTheDocument();
});
