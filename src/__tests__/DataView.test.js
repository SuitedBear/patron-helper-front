import React from 'react';
import { render } from '@testing-library/react';
import DataView from '../components/DataView';

const mockJson = [
  {
    id: 1,
    user: 'Mietek',
    mail: 'mietek@ma.maila',
    active: true,
    value: 100
  },
  {
    id: 2,
    user: 'Henio',
    mail: 'henryk@poczta.kom',
    active: true,
    value: 250
  },
  {
    id: 3,
    user: 'Zenek',
    mail: 'zenon@ma.w.domu',
    active: true,
    value: 200
  },
  {
    id: 4,
    user: 'Bogumiła',
    mail: 'bogu@jest.mila',
    active: true,
    value: 200
  }
];

describe('DataView component methods', () => {
  describe('handleSort method', () => {
    test('should return map to state.sortMap', () => {
      const component = render(
        <DataView
          data={mockJson}
        />
      );
      expect(component.getByText('Zenek')).toBeInTheDocument();
    });
  });
});
