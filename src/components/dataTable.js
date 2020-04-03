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

function DataTable (props) {
  const { dataMap, sortMap } = props;
  const keys = Array.from(sortMap.keys());
  const titleRow = keys.map(key => (
    <button
      key={key}
      onClick={() => props.onHandleSort(key)}
    >
      {key}
    </button>
  ));

  const rows = [];
  for (const entry of dataMap) {
    rows.push(
      <DataRow
        key={entry[0]}
        data={entry[1]}
        keys={keys}
        onRowClick={props.onHandleDataRow}
      />
    );
  }

  return (
    <ul style={{ listStyle: 'none' }}>
      <li>{titleRow}</li>
      {rows}
    </ul>
  );
}

export default DataTable;
