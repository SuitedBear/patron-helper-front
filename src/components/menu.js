import React from 'react';

function Menu (props) {
  return (
    <nav className='menu'>
      <ul style={{ listStyle: 'none' }}>
        <li onClick={() => props.onMenuChange(10)}>
          Services list
        </li>
        <li onClick={() => props.onMenuChange(11)}>
          Edit user
        </li>
        {
          (props.serviceId > 0)
            ? (
              <>
                <li onClick={() => props.onMenuChange(0)}>
                  Service info
                </li>
                <li onClick={() => props.onMenuChange(1)}>
                  Levels
                </li>
                <li onClick={() => props.onMenuChange(2)}>
                  Patrons
                </li>
                <li onClick={() => props.onMenuChange(3)}>
                  To Do
                </li>
                <li onClick={() => props.onMenuChange(4)}>
                  Rewards
                </li>
              </>
            )
            : <br />
        }
        <li onClick={() => props.onMenuChange(-1)}>
          Logout
        </li>
      </ul>
    </nav>
  );
}

export { Menu };
