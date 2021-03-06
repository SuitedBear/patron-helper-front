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
    const dataMap = this.buildDataMap(sortMap);
    this.types = (this.props.types || null);
    this.state = {
      editFocus: -1,
      sortMap: sortMap,
      dataMap: dataMap,
      editedIds: new Set()
    };
    this.handleFilter = this.handleFilter.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDataRow = this.handleDataRow.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  buildDataMap (sortMap) {
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
    return dataMap;
  }

  componentWillUnmount () {
    if (this.state.editedIds.size > 0) {
      console.log('unsaved changes !');
    }
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
    console.log(dataObj.id);
    this.setState({ editFocus: dataObj.id });
  }

  handleEdit (data) {
    console.log(data);
    this.props.onChanges(true);
    const newDataMap = new Map(this.state.dataMap);
    newDataMap.set(this.state.editFocus, data);
    const newEditedIds = new Set(this.state.editedIds);
    newEditedIds.add(this.state.editFocus);
    this.setState({
      editFocus: -1,
      dataMap: newDataMap,
      editedIds: newEditedIds
    });
  }

  handleSave () {
    const editedIds = new Set(this.state.editedIds);
    this.setState({ editedIds: new Set() });
    this.props.onSaveChanges(
      this.state.dataMap,
      editedIds
    );
  }

  handleBack (saved) {
    if (saved) {
      const newDataMap = this.buildDataMap(this.state.sortMap);
      this.setState({
        dataMap: newDataMap,
        editFocus: -1
      });
    } else this.setState({ editFocus: -1 });
    this.props.onChanges(false);
  }

  generateTable () {
    const { dataMap, sortMap, editFocus } = this.state;
    const rows = [];

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

    for (const entry of dataMap) {
      (entry[0] === editFocus)
        ? rows.push(
          <EditRow
            key={entry[0]}
            dataPoint={entry[1]}
            keys={keys}
            onHandleEdit={this.handleEdit}
            options={this.props.options}
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
          {/* Hide filters button? */}
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

  handleNew () {
    // new level template should be injected with separateEdit params
    const newLevel = {
      name: 'nowy',
      value: 50,
      cyclic: 0,
      limit: 0,
      multi: false,
      individual: false,
      once: false
    };
    return (
      this.props.separateEdit(
        newLevel,
        this.handleBack,
        true
      )
    );
  }

  render () {
    let content = <span />;
    if (this.props.separateEdit !== undefined &&
        this.state.editFocus >= 0) {
      const editedLevel = this.props.data.filter((pos) => {
        return pos.id === this.state.editFocus;
      })[0];
      content = this.props.separateEdit(
        editedLevel,
        this.handleBack,
        false
      );
    } else if (this.state.editFocus === -2) {
      content = this.handleNew();
    } else {
      content = this.generateTable();
    }

    return (
      <>
        <div>
          {
            (this.state.editedIds.size > 0)
              ? (
                <button
                  onClick={this.handleSave}
                  className='filter-check'
                >
                  Save
                </button>
              )
              : <span />
          }
          {
            (this.props.newButton)
              ? (
                <button
                  onClick={() => this.setState({ editFocus: -2 })}
                  className='filter-check'
                >
                  New
                </button>
              )
              : <span />
          }
        </div>
        {content}
      </>
    );
  }
}

export { DataView };
