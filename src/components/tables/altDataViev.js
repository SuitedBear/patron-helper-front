/*
  props:
    data
    columns
*/

import React from 'react';
import { flattener } from '../../utils/flattener';
import { DataRow } from './dataRow';
import './dataView.css';

function DataView (props) {
  const [data, setData] = React.useState(null);

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
  }, [props]);

  function useData () {
    if (data) {
      const rows = [];
      const keys = Array.from(data.sortMap.keys())
        .filter(key => data.sortMap.get(key)[1]);
      const titleRow = keys.map(key => (
        <div
          className='data-header-cell'
          key={key}
          onClick={() => console.log(key)}
        >
          {data.sortMap.get(key)[0]}
        </div>
      ));

      for (const entry of data.dataMap) {
        rows.push(
          <DataRow
            key={entry[0]}
            data={entry[1]}
            keys={keys}
            // should set editFocus
            onRowClick={(_e, rowData) => console.log(rowData)}
          />
        );
      }

      return (
        <>
          <div>Filters</div>
          <div className='data-table'>
            <div className='data-row'>
              {titleRow}
            </div>
            {rows}
          </div>
        </>
      );
    }
    return null;
  }

  const dataTable = useData();

  return (
    <div>
      {dataTable || 'Loading Table'}
    </div>
  );
}

export { DataView };
