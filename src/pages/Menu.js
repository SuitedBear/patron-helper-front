import React from 'react';
import { Link } from 'react-router-dom';

function Menu (props) {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Services list</Link>
        </li>
        <li>
          <Link to='/user'>Edit user</Link>
        </li>
        {
          (props.serviceId > 0)
            ? (
              <>
                <li>
                  <Link to={`/${props.serviceId}`}>
                    Service info
                  </Link>
                </li>
                <li>
                  <Link to={`/${props.serviceId}/levels`}>
                    Levels
                  </Link>
                </li>
              </>
            )
            : <li />
        }
        <li>
          <Link to='/'>Logout</Link>
        </li>
      </ul>
    </nav>
  );
}

export { Menu };
