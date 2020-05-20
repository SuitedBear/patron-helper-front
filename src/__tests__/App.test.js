import React from 'react';
import { render } from '@testing-library/react';
import { App } from '../app';

test('renders welcome text', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/state/i);
  expect(linkElement).toBeInTheDocument();
});
