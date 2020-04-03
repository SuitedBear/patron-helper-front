import React from 'react';
import { render } from '@testing-library/react';
import DataTable from '../components/DataTable';

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

const sortMap = new Map();
for (const key of Object.keys(mockJson[0])) {
  sortMap.set(key, true);
}

const dataMap = new Map();
mockJson.forEach(dataObj => dataMap.set(dataObj.id, dataObj));

describe('DataTable component tests', () => {
  test('should find Zenek', () => {
    const component = render(
      <DataTable
        dataMap={dataMap}
        sortMap={sortMap}
      />
    );
    const zenek = component.getByText('Zenek');
    expect(zenek).toBeInTheDocument();
  });
});
