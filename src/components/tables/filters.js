import React from 'react';

function Filters (props) {
  const filters = [];
  for (const entry of props.filterMap) {
    filters.push(
      <div
        className='filter-check'
        key={entry[0]}
      >
        <input
          type='checkbox'
          id={entry[0]}
          checked={entry[1][1]}
          onChange={() => props.onFilterChange(entry[0])}
        />
        <label htmlFor={entry[0]}>{entry[1][0]}</label>
      </div>
    );
  }
  return (
    <div>
      {filters}
    </div>
  );
}

export { Filters };
