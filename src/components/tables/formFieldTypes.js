import React, { useState } from 'react';

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
    <span style={{ border: '1px solid black', padding: '1px' }}>
      <select
        id={props.entry[0]}
        name={props.entry[0]}
        defaultValue={props.entry[1]}
      >
        {options}
      </select>
    </span>
  );
}

function BoolField (props) {
  return (
    <span style={{ border: '1px solid black', padding: '1px' }}>
      <input
        type='checkbox'
        id={props.entry[0]}
        name={props.entry[0]}
        defaultChecked={(props.entry[1] === 'true')}
      />
    </span>
  );
}

function TextField (props) {
  const [value, setValue] = useState(props.entry[1]);

  return (
    <span style={{ border: '1px solid black', padding: '1px' }}>
      <input
        id={props.entry[0]}
        name={props.entry[0]}
        size={16}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </span>
  );
}

function NumberField (props) {
  return (
    <span style={{ border: '1px solid black', padding: '1px' }}>
      <input
        id={props.entry[0]}
        name={props.entry[0]}
        type='number'
        min={0}
        defaultValue={props.entry[1]}
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
