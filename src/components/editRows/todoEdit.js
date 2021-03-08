import React from 'react';
import { DropDownField, TextField } from '../tables/formFieldTypes';

const TodoEdit = (props) => {
  const { entryKey, keys } = props;
  const nullString = '';
  const [fieldStates, setFieldStates] = React.useState(props.entry);
  // const [fields, setFields] = React.useState([]);

  const changeHandler = (evt) => {
    const newFieldStates = { ...fieldStates };
    // wont work for bool
    newFieldStates[evt.target.id] = evt.target.value;
    setFieldStates(newFieldStates);
  };

  const fields = (
    keys.map(key => {
      const entry = fieldStates[key];
      switch (key) {
        case 'status.name':
          return (
            <DropDownField
              key={key}
              optionList={props.statusList}
              entry={[key, entry]}
              handleChange={(e) => {
                changeHandler(e);
              }}
            />
          );
        case 'reward.name':
          return (
            <DropDownField
              key={key}
              optionList={props.rewardList}
              entry={[key, entry]}
              handleChange={(e) => {
                changeHandler(e);
              }}
            />
          );
        case 'patronInService.notes':
        case 'patronInService.patron.address':
          return (
            <TextField
              key={key}
              entry={[key, entry]}
              handleChange={(e) => {
                changeHandler(e);
              }}
            />
          );
        default:
          return (
            <div
              key={key}
              className='data-cell'
            >
              {`${entry || nullString}`}
            </div>
          );
      }
    })
  );

  return (
    <div
      key={entryKey}
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
  );
};

export { TodoEdit };
