// name email pass
// return user: { email, name }

import React from 'react';

export default function SignupForm (props) {
  return (
    <>
      <div>Sign up</div>
      <button onClick={() => props.onStateChange(1)}>Login</button>
    </>
  );
}
