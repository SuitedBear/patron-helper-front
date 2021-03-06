import React from 'react';

import './app.css';
// import DataView from './components/DataView';
import { LoginForm } from './components/loginForm';
import { SignupForm } from './components/signupForm';
import { UserPanel } from './pages/userPanel';

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
        this.setState({
          userState: 0,
          failedLogin: false
        });
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

export { App };
