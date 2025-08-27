import { render, screen } from '@testing-library/react';
import CardItem from './card-item';

test('renders AddNewItem component', () => {
  render(<CardItem />);
  expect(screen.getByText(/add item/i)).toBeInTheDocument();
});
