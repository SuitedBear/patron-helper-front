import React from 'react';
import { TextField } from '../tables/formFieldTypes';

const RewardEdit = (props) => {
  const { entryKey, keys } = props;
  const nullString = '';
  const [fieldStates, setFieldStates] = React.useState(props.entry);

  const changeHandler = (evt) => {
    const newFieldStates = {...fieldStates};
    newFieldStates[evt.target.id] = evt.target.value;
    setFieldStates(newFieldStates);
  }

  const fields = (
    keys.map(key => {
      const entry = fieldStates[key];
      if (key === 'name') {
        return (
          <TextField
            key={key}
            entry={[key, entry]}
            handleChange={e => {changeHandler(e)}}
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
        }
      }}
      className='data-row'
    >
      {fields}
    </div>
  )
}

export { RewardEdit };
