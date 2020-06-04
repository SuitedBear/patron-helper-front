import React from 'react';

function Menu (props) {
  return (
    <nav className='menu'>
      <ul style={{ listStyle: 'none' }}>
        <li onClick={() => props.setServiceId(0)}>
          Services list
        </li>
        <li onClick={() => props.setServiceId(-1)}>
          Edit user
        </li>
        {
          (props.serviceId > 0)
            ? (
              <>
                <li onClick={() => props.setSubService(0)}>
                  Service info
                </li>
                <li onClick={() => props.setSubService(1)}>
                  Levels
                </li>
                <li onClick={() => props.setSubService(2)}>
                  Patrons
                </li>
                <li onClick={() => props.setSubService(3)}>
                  To Do
                </li>
              </>
            )
            : <br />
        }
        <li onClick={() => props.onLogout(0)}>
          Logout
        </li>
      </ul>
    </nav>
  );
}

export { Menu };
