import React from 'react';
import './App.css';
import DataTable from './components/dataTable';

const mockJson = [
  {
    id: 1,
    user: 'Mietek',
    mail: 'mietek@ma.maila',
    active: true,
    value: 100
  },
  {
    id: 2,
    user: 'Henio',
    mail: 'henryk@to.penis',
    active: true,
    value: 250
  },
  {
    id: 3,
    user: 'Zenek',
    mail: 'zenon@ma.w.domu',
    active: true,
    value: 200
  },
  {
    id: 4,
    user: 'Bogumiła',
    mail: 'bogu@jest.mila',
    active: true,
    value: 200
  }
];

function extractKeys (jsonPayload) {
  const keys = Object.keys(jsonPayload[0]);
  return keys;
}

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      userData: {
        dataTable: mockJson,
        keys: extractKeys(mockJson)
      }
    };
  }

  render () {
    return (
      <div id='App'>
        <div>it's alive</div>
        <DataTable data={this.state.userData} />
      </div>
    );
  }
}

export default App;
