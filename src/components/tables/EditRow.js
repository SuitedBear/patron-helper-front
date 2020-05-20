import React from 'react';
import { DropDownField, BoolField, TextField, NumberField }
  from 'components/tables/formFieldTypes';

const statuses = ['done', 'for shipment', 'in progress', 'new'];
const typesFallback = new Map([
  ['user', TextField],
  ['active', BoolField],
  ['value', NumberField],
  ['status', DropDownField]
]);

function EditRow (props) {
  const types = (props.types || typesFallback);
  const formFields = Object.entries(props.dataPoint).map(entry => {
    const Ele = types.get(entry[0]);
    if (Ele) {
      return (
        <Ele
          key={entry[0]}
          entry={entry}
          optionList={statuses}
        />
      );
    } else {
      return (
        <span
          key={entry[0]}
          style={{ border: '1px solid black', padding: '1px' }}
        >
          {entry[1]}
        </span>
      );
    }
  });

  return (
    <li style={{ padding: '0' }}>
      <form onSubmit={(e) => props.onHandleEdit(e)}>
        {formFields}
        <input type='submit' value='Save' />
      </form>
    </li>
  );
}

export default EditRow;
