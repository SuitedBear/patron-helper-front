import React from 'react';
import { TextField } from '../tables/formFieldTypes';

  // patronMap
  // ['patron.address', TextField],
  // ['notes', TextField],
  // ['patron.name', TextField]

const PatronEdit = (props) => {
  const { entryKey, keys } = props;
  const nullString = '';
  const editables = new Set(['patron.name', 'patron.address', 'notes']);
  const [fieldStates, setFieldStates] = React.useState(props.entry);

  const changeHandler = (evt) => {
    const newFieldStates = {...fieldStates};
    // wont work for bool
    newFieldStates[evt.target.id] = evt.target.value;
    setFieldStates(newFieldStates);
  };

  const fields = (
    keys.map(key => {
      const entry = fieldStates[key];
      if (editables.has(key)) {
        return (
          <TextField
            key={key}
            entry={[key, entry]}
            handleChange={e => {
              changeHandler(e);
            }}
          />
        );
      }
      return (
        <div
          key={key}
          className='data-cell'
        >
          {`${entry || nullString}`}
        </div>
      );
    })
  );

  return (
    <div
      onBlur={(e) => {
        if (e.relatedTarget === null) {
          e.preventDefault();
          props.clickHandler(entryKey, fieldStates);
          console.log('on blur');
        }
      }}
      className='data-row'    
    >
      {fields}
    </div>
  )
}

export { PatronEdit };
