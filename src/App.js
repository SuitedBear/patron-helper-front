import React from 'react';
import './App.css';
import DataView from './components/DataView';

const statuses = ['done', 'for shipment', 'in progress', 'new'];

const mockJson = [
  {
    id: 1,
    user: 'Mietek',
    mail: 'mietek@ma.maila',
    active: true,
    value: 100,
    status: statuses[0]
  },
  {
    id: 2,
    user: 'Henio',
    mail: 'henryk@poczta.kom',
    active: true,
    value: 250,
    status: statuses[3]
  },
  {
    id: 3,
    user: 'Zenek',
    mail: 'zenon@ma.w.domu',
    active: false,
    value: 200,
    status: statuses[0]
  },
  {
    id: 4,
    user: 'Bogumiła',
    mail: 'bogu@jest.mila',
    active: true,
    value: 200,
    status: statuses[3]
  }
];

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      userData: {
        dataTable: mockJson
      }
    };
  }

  render () {
    return (
      <div id='App'>
        <div>it's alive</div>
        <DataView data={this.state.userData.dataTable} />
      </div>
    );
  }
}

export default App;
