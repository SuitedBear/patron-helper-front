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
    <span style={{ border: '1px solid black', padding: '1px' }}>
      <label htmlFor={props.entry[0]} />
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
      <label htmlFor={props.entry[0]} />
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
  return (
    <span style={{ border: '1px solid black', padding: '1px' }}>
      <label htmlFor={props.entry[0]} />
      <input
        id={props.entry[0]}
        name={props.entry[0]}
        size={16}
        defaultValue={props.entry[1]}
      />
    </span>
  );
}

function NumberField (props) {
  return (
    <span style={{ border: '1px solid black', padding: '1px' }}>
      <label htmlFor={props.entry[0]} />
      <input
        id={props.entry[0]}
        name={props.entry[0]}
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
