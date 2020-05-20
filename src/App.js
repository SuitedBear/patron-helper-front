import React from 'react';

import './App.css';
// import DataView from './components/DataView';
import LoginForm from './components/LoginForm';
import { SignupForm } from './components/SignupForm';
import { UserPanel } from './pages/UserPanel';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.serverAddress = props.serverAddress;
    this.userStates = ['logged out', 'logged in', 'signing up'];
    this.state = {
      userState: 0,
      token: null,
      failedLogin: false
    };
    this.handleUserState = this.handleUserState.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handlePage (userState) {
    switch (userState) {
      case (1):
        return (
          <UserPanel
            serverAddress={this.serverAddress}
            onStateChange={this.handleUserState}
            token={this.state.token}
          />
        );
      case (2):
        return (
          <SignupForm
            onStateChange={this.handleUserState}
            onSignup={this.handleSignup}
          />
        );
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
    window.fetch(`${this.serverAddress}/login`, {
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

  handleSignup (signupData) {
    console.log(signupData);
    window.fetch(`${this.serverAddress}/signup`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signupData)
    })
      .then(res => {
        if (res.status < 400) {
          return res.json();
        } else {
          return 'signup failed';
        }
      })
      .then(data => {
        console.log(data);
        this.setState({ userState: 0 });
        return 'signup successfull';
      })
      .catch(e => console.log(e));
  }

  render () {
    return (
      <div id='App'>
        <div>
          current state: {this.userStates[this.state.userState]}
        </div>
        {this.handlePage(this.state.userState)}
      </div>
    );
  }
}

export default App;
