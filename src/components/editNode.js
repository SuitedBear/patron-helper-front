import React from 'react';

function EditNode (props) {
  const data = Object.entries(props.dataPoint).map(entry => {
    return (
      <span key={entry[0]}>
        <label htmlFor={entry[0]} />
        {/* change defaultValue to value for dynamic editing */}
        <input name={entry[0]} defaultValue={entry[1]} />
      </span>
    );
  });

  return (
    <li style={{ padding: '2px 0' }}>
      <form onSubmit={(e) => props.onHandleEdit(e)}>
        {data}
        {/* <button onClick={(e) => props.onHandleReturn(e)}>Back</button> */}
        <button type='submit'>
          Save Changes
        </button>
      </form>
    </li>
  );
}

export default EditNode;
