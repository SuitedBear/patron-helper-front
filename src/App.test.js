import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders welcome text', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/alive/i);
  expect(linkElement).toBeInTheDocument();
});
