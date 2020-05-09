import React from 'react';
import './App.css';
import DataView from './components/DataView';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

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
    this.userStates = ['logged out', 'logged in', 'signing up'];
    this.state = {
      userData: {
        dataTable: mockJson
      },
      userState: 0,
      token: null,
      failedLogin: false
    };
    this.handleUserState = this.handleUserState.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handlePage (userState) {
    switch (userState) {
      case (1):
        return (
          <DataView
            data={this.state.userData.dataTable}
            onStateChange={this.handleUserState}
          />
        );
      case (2):
        return <SignupForm onStateChange={this.handleUserState} />;
      default:
        return (
          <LoginForm
            onStateChange={this.handleUserState}
            onLogin={this.handleLogin}
            failedLogin={this.state.failedLogin}
          />
        );
    }
  }

  // @param userState: index from userStates
  handleUserState (userState) {
    if (userState !== this.state.userState) {
      if (userState === 2) {
        this.setState({ userState });
      } else {
        this.setState({
          userState,
          token: null
        });
      }
    }
  }

  handleLogin (loginData) {
    console.log(loginData);
    window.fetch('http://127.0.0.1:3000/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    })
      .then(res => {
        if (res.status < 400) {
          return res.json();
        } else {
          this.setState({
            userState: 0,
            failedLogin: true
          });
          return 'login failed!';
        }
      })
      .then(data => {
        if (data.token) {
          this.setState({
            token: data.token,
            userState: 1,
            failedLogin: false
          });
        }
      })
      .catch(e => console.log(e));
  }

  render () {
    return (
      <div id='App'>
        <div>current state: {this.state.userState}</div>
        {this.handlePage(this.state.userState)}
      </div>
    );
  }
}

export default App;
