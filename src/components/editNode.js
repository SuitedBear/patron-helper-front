import React from 'react';

function EditNode (props) {
  const data = Object.entries(props.dataPoint).map(entry => {
    return (
      <li key={entry[0]}>
        <label htmlFor={entry[0]}>{`${entry[0]}: `}</label>
        {/* change defaultValue to value for dynamic editing */}
        <input name={entry[0]} defaultValue={entry[1]} />
      </li>
    );
  });

  return (
    <form onSubmit={(e) => props.onHandleEdit(e)}>
      <ul style={{ listStyle: 'none' }}>{data}</ul>
      <button onClick={(e) => props.onHandleReturn(e)}>Back</button>
      <button type='submit'>
        Save Changes
      </button>
    </form>

  );
}

export default EditNode;
