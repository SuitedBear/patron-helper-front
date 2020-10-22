import React from 'react';

function LevelEdit (props) {
  const [level, setLevel] = React.useState(props.level);
  // const [statuses, setStatuses] = React.useState([]);

  // const sendChanges = async () => {
  //   const msgBody = {

  //   };
  //   const result = await window.fetch(
  //     `${props.serverAddress}/services/${props.serviceId}/levels/${props.level.id}`, {
  //       method: 'POST',
  //       mode: 'cors',
  //       headers: {
  //         Authorisation: `Bearer ${props.token}`,
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(msgBody)
  //     }
  //   );
  //   if (result.ok) {
  //     const editedLevel = await result.json();
  //     console.log(editedLevel);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await props.handleSendChanges(level, (props.create));
    props.handleBack(true);
  };

  // handle Blur

  console.log('editLevel render');
  return (
    <div>
      Level Edit
      <form onSubmit={handleSubmit}>
        <div>
          <button
            type='submit'
            className='filter-check'
          >
            Save Lvl
          </button>
          <button
            onClick={() => props.handleBack(false)}
            className='filter-check'
          >
            Cancel
          </button>
        </div>
        <div>
          <label htmlFor='name'>
            Nazwa:
            <input
              className='data-cell'
              name='name'
              id='name'
              type='text'
              value={level.name}
              onChange={e =>
                setLevel({ ...level, [e.target.id]: e.target.value })}
            />
          </label>
          <label htmlFor='value'>
            Próg:
            <input
              className='data-cell'
              name='value'
              id='value'
              type='number'
              value={level.value}
              onChange={e =>
                setLevel({
                  ...level,
                  [e.target.id]: Number.parseInt(e.target.value)
                })}
            />
          </label>
        </div>
        <div>
          <label htmlFor='cyclic'>
            Cykliczny:
            <input
              className='data-cell'
              name='cyclic'
              id='cyclic'
              type='number'
              value={level.cyclic}
              onChange={e =>
                setLevel({
                  ...level,
                  [e.target.id]: Number.parseInt(e.target.value)
                })}
            />
          </label>
          <label htmlFor='limit'>
            Limit:
            <input
              className='data-cell'
              name='limit'
              id='limit'
              type='number'
              value={level.limit}
              onChange={e =>
                setLevel({
                  ...level,
                  [e.target.id]: Number.parseInt(e.target.value)
                })}
            />
          </label>
        </div>
        <div>
          <label htmlFor='multi'>
            Multi:
            <input
              className='data-cell'
              name='multi'
              id='multi'
              type='checkbox'
              checked={level.multi}
              onChange={e =>
                setLevel({ ...level, [e.target.id]: e.target.checked })}
            />
          </label>
          <label htmlFor='individual'>
            Indywidualny:
            <input
              className='data-cell'
              name='individual'
              id='individual'
              type='checkbox'
              checked={level.individual}
              onChange={e =>
                setLevel({ ...level, [e.target.id]: e.target.checked })}
            />
          </label>
          <label htmlFor='once'>
            Jednorazowy:
            <input
              className='data-cell'
              name='once'
              id='once'
              type='checkbox'
              checked={level.once}
              onChange={e =>
                setLevel({ ...level, [e.target.id]: e.target.checked })}
            />
          </label>
        </div>
      </form>
    </div>
  );
}

export { LevelEdit };
