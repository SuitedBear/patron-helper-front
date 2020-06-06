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

function getValue (target, field) {
  let setValue = null;
  switch (field) {
    case (BoolField):
      setValue = target.checked;
      break;
    default:
      setValue = target.value;
  }
  console.log(setValue);
  return setValue;
}

export {
  DropDownField,
  BoolField,
  TextField,
  NumberField,
  getValue
};
