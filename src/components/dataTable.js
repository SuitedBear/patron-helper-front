import React from 'react';

function DataRow (props) {
  const row = [];
  for (const key of props.keys) {
    row.push(
      <span
        style={{ border: '1px solid black', padding: '1px' }}
        key={key}
        onDoubleClick={(e) => props.onRowClick(e, props.data)}
      >
        {`${props.data[key]}`}
      </span>
    );
  }

  return (
    <li style={{ padding: '2px 0' }}>
      {row}
    </li>
  );
}

class DataTable extends React.Component {
  constructor (props) {
    super(props);
    const sortMap = new Map();
    this.props.data.keys.forEach(key => {
      sortMap.set(key, true);
    });
    this.state = {
      sortedTable: this.props.data.dataTable,
      sortMap: sortMap
    };
  }

  handleSort (key) {
    const sortMap = this.state.sortMap;
    const table = this.state.sortedTable.sort((a, b) => {
      if (a[key] === b[key]) return 0;
      if (sortMap.get(key)) {
        return (a[key] > b[key]) ? 1 : -1;
      } else {
        return (a[key] < b[key]) ? 1 : -1;
      }
    });
    sortMap.set(key, !sortMap.get(key));
    this.setState({
      sortedTable: table,
      sortMap: sortMap
    });
  }

  handleDataRow (event, dataObj) {
    console.log(event.target);
    console.log(event.target.parentNode);
    console.log(dataObj);
  }

  render () {
    const titleRow = this.props.data.keys.map(key => (
      <button
        key={key}
        onClick={() => this.handleSort(key)}
      >
        {key}
      </button>
    ));

    const rows = this.state.sortedTable.map((entry) => (
      <DataRow
        key={entry[this.props.data.keys[0]]}
        data={entry}
        keys={this.props.data.keys}
        onRowClick={this.handleDataRow}
      />
    ));

    return (
      <ul style={{ listStyle: 'none' }}>
        <li>{titleRow}</li>
        {rows}
      </ul>
    );
  }
}

export default DataTable;
