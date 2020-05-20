// name email pass
// return user: { email, name }

import React from 'react';

class SignupForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit (event) {
    event.preventDefault();
    const signupData = { ...this.state };
    this.props.onSignup(signupData);
  }

  render () {
    return (
      <div>
        <div>Sign up</div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label htmlFor='name'>
            User name:
            <input
              name='name'
              id='name'
              type='text'
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor='email'>
            e-mail:
            <input
              name='email'
              id='email'
              type='email'
              value={this.state.email}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor='password'>
            password:
            <input
              name='password'
              id='password'
              type='password'
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
          <input type='submit' value='Sign Up' />
        </form>
        <button onClick={() => this.props.onStateChange(0)}>Login</button>
      </div>
    );
  }
}

export { SignupForm };
