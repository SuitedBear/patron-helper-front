import React from 'react';

function DataRow (props) {
  const row = [];
  const nullString = '';
  for (const colName of props.keys) {
    row.push(
      <div
        className='data-cell'
        key={colName}
        onDoubleClick={(e) => props.onRowClick(e, props.data)}
      >
        {`${(props.data[colName]) ? props.data[colName] : nullString}`}
      </div>
    );
  }

  return (
    <div className='data-row'>
      {row}
    </div>
  );
}

export { DataRow };
