import React from 'react';
import { DropDownField } from '../tables/formFieldTypes';

function RewardForm (props) {
  const defaultDate = new Date(Date.now());
  const [rewardForm, setRewardForm] = React.useState(
    {
      name: '',
      level: props.levelList[0].name,
      dateFor: defaultDate.toISOString().slice(0, 10)
    }
  )

  const handleSubmit = async (e) => {
    e.preventDefault();
    props.handleNew(rewardForm);
  }

  return (
    <div>
      Reward Edit
      <form onSubmit={handleSubmit}>
        <div>
          <button
            type='submit'
            className='filter-check'
          >
            Save
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
              value={rewardForm.name}
              onChange={(e) =>
                setRewardForm({
                  ...rewardForm,
                  [e.target.id]: (e.target.value || '')
                })
              }
            />
          </label>
          <label htmlFor='level'>
            Poziom:
            <DropDownField
              key={'level'}
              optionList={props.levelList}
              entry={['level', rewardForm.level]}
              handleChange={(e) => {
                setRewardForm({
                  ...rewardForm,
                  [e.target.id]: e.target.value
                })
              }}
            />            
          </label>
          <label htmlFor='dateFor'>
            Data:
            <input
              className='data-cell'
              name='dateFor'
              id='dateFor'
              type='date'
              value={rewardForm.dateFor}
              onChange={(e) =>
                setRewardForm({
                  ...rewardForm,
                  [e.target.id]: e.target.value
                })
              }
            />
          </label>
        </div>
      </form>
    </div>
  )
}

export { RewardForm }
