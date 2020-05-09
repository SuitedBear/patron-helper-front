// email, pass
// return: { user, token }

import React from 'react';

class LoginForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    const loginData = { ...this.state };
    this.props.onLogin(loginData);
  }

  handleChange (event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleFailedLogin (failedLogin) {
    if (failedLogin) {
      return <div style={{ color: 'red' }}>Invalid email or password!</div>;
    }
  }

  render () {
    return (
      <div>
        {this.handleFailedLogin(this.props.failedLogin)}
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div>
            <label htmlFor='mail'>
              email:
              <input
                name='email'
                id='email'
                type='email'
                value={this.state.email}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor='pass'>
              password:
              <input
                name='password'
                id='password'
                type='password'
                value={this.state.password}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <input type='submit' value='Log in' />
        </form>
        <button onClick={() => this.props.onStateChange(2)}>Sign up</button>
      </div>
    );
  }
}

export default LoginForm;
