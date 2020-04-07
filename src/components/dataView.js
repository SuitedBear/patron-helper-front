import React from 'react';
import DataRow from './DataRow';
import EditRow from './EditRow';

export class DataView extends React.Component {
  constructor (props) {
    super(props);
    const sortMap = new Map();
    for (const key of Object.keys(this.props.data[0])) {
      sortMap.set(key, true);
    }
    const dataMap = new Map();
    this.props.data.forEach(dataObj => dataMap.set(dataObj.id, dataObj));
    this.state = {
      editFocus: -1,
      sortedData: this.props.data,
      sortMap: sortMap,
      dataMap: dataMap
    };
    this.handleSort = this.handleSort.bind(this);
    this.handleDataRow = this.handleDataRow.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleSort (key) {
    const sortMap = new Map(this.state.sortMap);
    const table = [...this.state.dataMap.values()].sort((a, b) => {
      if (a[key] === b[key]) return 0;
      return (sortMap.get(key))
        ? (a[key] > b[key]) ? 1 : -1
        : (a[key] < b[key]) ? 1 : -1;
    });
    const dataMap = new Map();
    table.forEach(dataObj => dataMap.set(dataObj.id, dataObj));
    sortMap.set(key, !sortMap.get(key));
    this.setState({
      dataMap: dataMap,
      sortMap: sortMap
    });
  }

  handleDataRow (event, dataObj) {
    console.log(event.target);
    console.log(event.target.parentNode);
    console.log(dataObj);
    this.setState({ editFocus: dataObj.id });
  }

  handleEdit (event) {
    event.preventDefault();
    console.log(event);
    this.setState({ editFocus: -1 });
  }

  render () {
    const { dataMap, sortMap, editFocus } = this.state;
    const keys = Array.from(sortMap.keys());
    const titleRow = keys.map(key => (
      <button
        key={key}
        onClick={() => this.handleSort(key)}
      >
        {key}
      </button>
    ));

    const rows = [];
    for (const entry of dataMap) {
      (entry[0] === editFocus)
        ? rows.push(
          <EditRow
            key={entry[0]}
            dataPoint={dataMap.get(editFocus)}
            onHandleEdit={this.handleEdit}
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
      <ul style={{ listStyle: 'none' }}>
        <li>{titleRow}</li>
        {rows}
      </ul>
    );
  }
}

export default DataView;
