import React from 'react';

function DataRow (props) {
  const row = [];
  for (const colName of props.keys) {
    row.push(
      <div
        className='data-cell'
        key={colName}
        onDoubleClick={(e) => props.onRowClick(e, props.data)}
      >
        {`${props.data[colName]}`}
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
