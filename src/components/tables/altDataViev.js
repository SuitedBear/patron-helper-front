/*
  props:
    data
    columns
*/

import React from 'react';
import { flattener } from '../../utils/flattener';
import { DataRow } from './dataRow';
import './dataView.css';
import { Filters } from './filters';

function DataView (props) {
  const buildTitleRow = (keys, sortMap) => {
    return keys.map(key => (
      <div
        className='data-header-cell'
        key={key}
        onClick={() => handleSort(key)}
      >
        {sortMap.get(key)[0]}
      </div>
    ));
  }

  const [data, setData] = React.useState(null);
  const dataTable = buildTableFromData();

  React.useEffect(() => {
    function buildDataMap (sortMap) {
      const dataMap = new Map();
      const flattenedData = props.data.map(pos => flattener(pos));
      flattenedData.forEach(dataObj => {
        const newObj = {};
        for (const entry of Object.entries(dataObj)) {
          if (sortMap.has(entry[0])) {
            newObj[entry[0]] = entry[1];
          }
        }
        dataMap.set(dataObj.id, newObj);
      });
      return dataMap;
    }

    const sortMap = new Map();
    for (const [name, columnName] of props.columns.entries()) {
      sortMap.set(name, [columnName, true, true]);
    }
    const dataMap = buildDataMap(sortMap);

    setData({
      sortMap: sortMap,
      dataMap: dataMap
    });
  }, [props.data, props.columns]);

  function useFilter (name) {
    const newFilterMap = new Map(data.sortMap);
    const dataMapCopy = new Map(data.dataMap);
    const changedFilter = newFilterMap.get(name);
    changedFilter[1] = !changedFilter[1];
    newFilterMap.set(name, changedFilter);
    setData({
      sortMap: newFilterMap,
      dataMap: dataMapCopy
    });
  }

  const sorter = (a, b) => {
    if (a === b) return 0;
    if (a === null) return 1;
    if (b === null) return -1;
    if (typeof a === 'string' && typeof b === 'string') {
      const a_lower = a.toLowerCase();
      const b_lower = b.toLowerCase();
      return (a_lower > b_lower) ? 1 : -1;
    }
    return a - b;
  }

  function handleSort (key) {
    const sortMap = new Map(data.sortMap);
    const sortKey = sortMap.get(key);
    const table = [...data.dataMap.values()].sort((a, b) => {
      return (sortKey[2])
        ? sorter(a[key], b[key])
        : sorter(b[key], a[key])
    });
    const dataMap = new Map();
    table.forEach(dataObj => dataMap.set(dataObj.id, dataObj));
    sortKey[2] = !sortKey[2];
    sortMap.set(key, sortKey);
    setData({
      dataMap: dataMap,
      sortMap: sortMap
    });
  }

  function buildTableFromData () {
    if (!data) return null;

    const keys = Array.from(data.sortMap.keys())
      .filter(key => data.sortMap.get(key)[1]);
    const titleRow = buildTitleRow(keys, data.sortMap);

    const rows = [];
    for (const entry of data.dataMap) {
      if (entry[0] === props.editFocus) {
        rows.push(
          props.editRow(entry[0], entry[1], keys)
        );
      } else {
        rows.push(
          <DataRow
            key={entry[0]}
            data={entry[1]}
            keys={keys}
            onRowClick={e => props.handleFocus(e, entry[1])}
          />
        );
      }
    }

    return (
      <>
        <div>
          <Filters
            filterMap={data.sortMap}
            onFilterChange={useFilter}
          />
        </div>
        <div className='data-table'>
          <div className='data-row'>
            {titleRow}
          </div>
          {rows}
        </div>
      </>
    );
  }

  return (
    <div>
      <button
        className='filter-check'
        onClick={() => props.handleSave()}
      >
        Save
      </button>
      {dataTable || 'Loading Table'}
    </div>
  );
}

export { DataView };
