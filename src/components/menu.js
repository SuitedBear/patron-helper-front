import React from 'react';

const subServiceNames = [
  'Service info',
  'Levels',
  'Patrons',
  'Todo',
  'Rewards'
];

function Menu (props) {
  const subServiceMenu = [];
  for (let i = 0; i < 5; ++i) {
    subServiceMenu.push(
      <li
        className={(props.subService === i) ? 'selected' : ''}
        onClick={() => props.onMenuChange(i)}
        key={i}
      >
        {subServiceNames[i]}
      </li>
    )
  }
  return (
    <nav className='menu'>
      <div>Logged as:<p>{props.userName}</p></div>
      <ul>
        <li onClick={() => props.onMenuChange(10)}>
          Services list
        </li>
        <li onClick={() => props.onMenuChange(11)}>
          Edit user
        </li>
        {
          (props.service.id > 0)
            ? (
              <>
                <div>Service:<p>{props.service.name}</p></div>
                {/* <li onClick={() => props.onMenuChange(0)}>
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
                </li> */}
                {subServiceMenu}
                <br/>
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
