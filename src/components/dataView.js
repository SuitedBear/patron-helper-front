import React from 'react';
import DataTable from './DataTable';
import EditNode from './EditNode';

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
      focus: -1,
      sortedData: this.props.data,
      sortMap: sortMap,
      dataMap: dataMap
    };
    this.handleSort = this.handleSort.bind(this);
    this.handleDataRow = this.handleDataRow.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  // _handleSort (key) {
  //   const sortMap = new Map(this.state.sortMap);
  //   const table = this.state.sortedData.sort((a, b) => {
  //     if (a[key] === b[key]) return 0;
  //     return (sortMap.get(key))
  //       ? (a[key] > b[key]) ? 1 : -1
  //       : (a[key] < b[key]) ? 1 : -1;
  //   });
  //   sortMap.set(key, !sortMap.get(key));
  //   this.setState({
  //     sortedData: table,
  //     sortMap: sortMap
  //   });
  // }

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
    this.setState({ focus: dataObj.id });
  }

  handleReturn (event) {
    event.preventDefault();
    this.setState({ focus: -1 });
  }

  handleEdit (event) {
    event.preventDefault();
    console.log(event);
  }

  render () {
    return (
      <div>
        {
          (this.state.focus < 0)
            ? (
              <DataTable
                dataMap={this.state.dataMap}
                sortMap={this.state.sortMap}
                onHandleSort={this.handleSort}
                onHandleDataRow={this.handleDataRow}
              />
            )
            : (
              <EditNode
                dataPoint={this.state.dataMap.get(this.state.focus)}
                onHandleReturn={this.handleReturn}
                onHandleEdit={this.handleEdit}
              />
            )
        }
      </div>
    );
  }
}

export default DataView;
