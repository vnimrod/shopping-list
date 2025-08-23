import { render, screen } from '@testing-library/react';
import Drawer from './drawer';

test('renders Drawer component', () => {
  render(<Drawer open={true} />);
  expect(screen.getByText(/add item/i)).toBeInTheDocument();
});
