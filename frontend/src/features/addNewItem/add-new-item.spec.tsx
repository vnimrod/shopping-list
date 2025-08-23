import { render, screen } from '@testing-library/react';
import AddNewItem from './add-new-item';

test('renders AddNewItem component', () => {
  render(<AddNewItem />);
  expect(screen.getByText(/add item/i)).toBeInTheDocument();
});
