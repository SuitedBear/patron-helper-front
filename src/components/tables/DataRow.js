import React from 'react';

function DataRow (props) {
  const row = [];
  for (const colName of props.keys) {
    row.push(
      <span
        style={{ border: '1px solid black', padding: '1px' }}
        key={colName}
        onDoubleClick={(e) => props.onRowClick(e, props.data)}
      >
        {`${props.data[colName]}`}
      </span>
    );
  }

  return (
    <li style={{ padding: '2px 0' }}>
      {row}
    </li>
  );
}

export { DataRow };
