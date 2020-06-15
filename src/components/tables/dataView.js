import React from 'react';
import './dataView.css';
import { DataRow } from './dataRow';
import { EditRow } from './editRow';
import { Filters } from './filters';
import { flattener } from '../../utils/flattener';

/*
  props: data, types, columns, onSaveChanges()
*/
class DataView extends React.Component {
  constructor (props) {
    super(props);
    const sortMap = new Map();
    for (const [name, columnName] of props.columns.entries()) {
      // name: [column name, show, sort (true == asc)]
      sortMap.set(name, [columnName, true, true]);
    }
    const dataMap = new Map();
    const flattenedData = this.props.data.map(pos => flattener(pos));
    flattenedData.forEach(dataObj => {
      const newObj = {};
      for (const entry of Object.entries(dataObj)) {
        if (sortMap.has(entry[0])) {
          newObj[entry[0]] = entry[1];
        }
      }
      dataMap.set(dataObj.id, newObj);
    });
    this.types = (this.props.types || null);
    this.state = {
      editFocus: -1,
      sortMap: sortMap,
      dataMap: dataMap,
      unsavedChanges: false
    };
    this.handleFilter = this.handleFilter.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDataRow = this.handleDataRow.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSort (key) {
    const sortMap = new Map(this.state.sortMap);
    const sortKey = sortMap.get(key);
    const table = [...this.state.dataMap.values()].sort((a, b) => {
      if (a[key] === b[key]) return 0;
      return (sortKey[2])
        ? (a[key] > b[key]) ? 1 : -1
        : (a[key] < b[key]) ? 1 : -1;
    });
    const dataMap = new Map();
    table.forEach(dataObj => dataMap.set(dataObj.id, dataObj));
    sortKey[2] = !sortKey[2];
    sortMap.set(key, sortKey);
    this.setState({
      dataMap: dataMap,
      sortMap: sortMap
    });
  }

  handleFilter (name) {
    const newFilterMap = new Map(this.state.sortMap);
    const changedFilter = newFilterMap.get(name);
    changedFilter[1] = !changedFilter[1];
    newFilterMap.set(name, changedFilter);
    this.setState({ sortMap: newFilterMap });
  }

  handleDataRow (event, dataObj) {
    console.log(event.target);
    console.log(event.target.parentNode);
    console.log(dataObj);
    this.setState({ editFocus: dataObj.id });
  }

  handleEdit (data) {
    console.log(data);
    const newDataMap = new Map(this.state.dataMap);
    newDataMap.set(this.state.editFocus, data);
    this.setState({
      editFocus: -1,
      dataMap: newDataMap,
      unsavedChanges: true
    });
  }

  handleSave () {
    this.props.onSaveChanges(this.state.dataMap);
    this.setState({ unsavedChanges: false });
  }

  render () {
    const { dataMap, sortMap, editFocus } = this.state;
    const keys = Array.from(sortMap.keys())
      .filter(key => sortMap.get(key)[1]);
    const titleRow = keys.map(key => (
      <div
        className='data-header-cell'
        key={key}
        onClick={() => this.handleSort(key)}
      >
        {sortMap.get(key)[0]}
      </div>
    ));

    const rows = [];
    for (const entry of dataMap) {
      (entry[0] === editFocus)
        ? rows.push(
          <EditRow
            key={entry[0]}
            dataPoint={entry[1]}
            keys={keys}
            onHandleEdit={this.handleEdit}
            types={this.types}
          />
        )
        : rows.push(
          <DataRow
            key={entry[0]}
            data={entry[1]}
            keys={keys}
            onRowClick={this.handleDataRow}
          />
        );
    }

    return (
      <>
        <div>
          <button
            onClick={this.handleSave}
            className='filter-check'
          >
            Save
          </button>
        </div>
        <div>
          <Filters
            filterMap={this.state.sortMap}
            onFilterChange={this.handleFilter}
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
}

export { DataView };
