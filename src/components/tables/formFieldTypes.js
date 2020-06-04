import React from 'react';

function DropDownField (props) {
  const options = props.optionList.map(element => {
    return (
      <option
        key={element}
        value={element}
      >
        {element}
      </option>
    );
  });

  return (
    // <span style={{ border: '1px solid black', padding: '1px' }}>
    <span className='data-cell'>
      <select
        id={props.entry[0]}
        name={props.entry[0]}
        defaultValue={props.entry[1]}
        onChange={e => props.handleChange(e)}
      >
        {options}
      </select>
    </span>
  );
}

function BoolField (props) {
  return (
    <span className='data-cell'>
      <input
        type='checkbox'
        id={props.entry[0]}
        name={props.entry[0]}
        // data needs parsing on state
        checked={props.entry[1]}
        onChange={(e) => props.handleChange(e)}
      />
    </span>
  );
}

function TextField (props) {
  return (
    <span className='data-cell'>
      <input
        id={props.entry[0]}
        name={props.entry[0]}
        size={16}
        value={props.entry[1] || ''}
        onChange={(e) => props.handleChange(e)}
      />
    </span>
  );
}

function NumberField (props) {
  return (
    <span className='data-cell'>
      <input
        id={props.entry[0]}
        name={props.entry[0]}
        type='number'
        min={0}
        value={props.entry[1]}
        onChange={(e) => props.handleChange(e)}
      />
    </span>
  );
}

export {
  DropDownField,
  BoolField,
  TextField,
  NumberField
};

// {
//   "id": 31,
//   "status": null,
//   "levelId": 1,
//   "rewardId": 15,
//   "patronId": 6,
//   "createdAt": "2020-05-10T12:08:20.456Z",
//   "updatedAt": "2020-05-10T12:08:20.456Z",
//   "patronInService": {
//       "patronId": 1,
//       "notes": null,
//       "active": true,
//       "supportAmount": 100,
//       "patron": {
//           "name": "mietek",
//           "email": "mietek@maila.ma"
//       }
//   },
//   "reward": {
//       "name": "DoIthemAllAtOnceMonthly for mietek from 2020-5"
//   },
//   "level": {
//       "serviceId": 1
//   }
// }
